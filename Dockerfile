FROM node:latest

WORKDIR '/app'

COPY package.json ./
RUN npm install

COPY . .
RUN rm app/api/menu.js
RUN cp app/api/menuProd.js app/api/menu.js
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=0 /app/build /usr/share/nginx/html
COPY --from=0 /app/public/images /usr/share/nginx/html/images
COPY --from=0 /app/public/favicons /usr/share/nginx/html/favicons
