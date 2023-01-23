FROM node:16 

WORKDIR /app

COPY . /app

ENV VITE_API_URL=/api

RUN npm install

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "serve"]