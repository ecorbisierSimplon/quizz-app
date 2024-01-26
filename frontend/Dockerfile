FROM node:21-alpine

WORKDIR /app_frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev --host"]