FROM node:18.19.1-alpine3.19 as EditorBuilder

WORKDIR /src/editor
COPY editor/package.json editor/package-lock.json ./
RUN npm i
COPY editor/. .
RUN npm run build

FROM nginx:1.23-alpine as Executor
RUN rm -f /usr/share/nginx/html/index.html
COPY --from=EditorBuilder /src/editor/build/ /usr/share/nginx/html/


FROM node:18.19.1-alpine3.19 as ServerBuilder

WORKDIR /src/chat
COPY chat/package.json chat/package-lock.json ./
RUN npm i
COPY chat/. .

WORKDIR /src/server
COPY server/package.json server/package-lock.json ./
RUN npm i
COPY server/. .

CMD npm run dev