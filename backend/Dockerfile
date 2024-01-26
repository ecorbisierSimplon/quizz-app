FROM node:21-alpine AS base


FROM base AS builder
WORKDIR /app_backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run gcp-build


FROM base as dev
WORKDIR /app_backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

