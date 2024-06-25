import { useSelector } from "react-redux";

const SERVER_URL = 'http://localhost:8080/';


export const useExportDialog = () => {
    const messages = useSelector((state) => state.messages.list);
    const avatars = useSelector((state) => state.avatars.list);
    const members = useSelector((state) => state.members.list);

    const exportDialog = async () => {
        const blob = new Blob([JSON.stringify({
            messages,
            avatars,
            members
        })], { type: "application/json" });

        const formData = new FormData();
        formData.set('data', blob)

        const response = await fetch(SERVER_URL + 'generate', {
            method: 'POST',
            body: formData
        });

        const result = await response.blob();

        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'build.zip');
        downloadLink.setAttribute('href', URL.createObjectURL(result));

        downloadLink.click();
        downloadLink.remove();
    }

    return {
        exportDialog
    };
}