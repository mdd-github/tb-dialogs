import { exec } from 'node:child_process';
import { resolve } from 'node:path';
import jszip from 'jszip';
import { createWriteStream, rmSync, copyFileSync, existsSync, readdirSync, readFileSync, lstatSync } from 'node:fs';

export const zipDialog = (dataFilePath) =>
    new Promise(async (res) => {
        try {
            if (existsSync(resolve(process.env.CHAT_APP_DIR, 'src/assets/data/data.json'))) {
                rmSync(resolve(process.env.CHAT_APP_DIR, 'src/assets/data/data.json'));
            }
            copyFileSync(resolve(dataFilePath), resolve(process.env.CHAT_APP_DIR, 'src/assets/data/data.json'));
            exec(`npm run build --prefix ${resolve(process.env.CHAT_APP_DIR)}`, () => {
                const buildDir = resolve(process.env.CHAT_APP_DIR, 'build');
                const zip = new jszip();
                const zipBuildFolder = zip.folder('build');

                readdirSync(buildDir, { withFileTypes: true, recursive: true })
                    .forEach(file => {
                        if (lstatSync(file.path + '/' + file.name).isFile()) {
                            const fileName = file.path.replace(buildDir, '') + '/' + file.name;
                            zipBuildFolder.file(
                                fileName,
                                readFileSync(file.path + '/' + file.name)
                            );
                        }
                    });

                zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
                    .pipe(createWriteStream(resolve(dataFilePath + '.zip')))
                    .on('finish', () => res(true))
            });
        } catch (e) {
            console.error(e);
            res(false);
        }
    });