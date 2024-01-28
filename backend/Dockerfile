FROM node:21-alpine AS base


FROM base AS builder
ENV FOO=/app
WORKDIR ${FOO}
COPY package*.json ${FOO}
RUN npm install
COPY . ${FOO}
RUN npm run gcp-build


FROM base

WORKDIR /usr/src/app

COPY package.json .
RUN npm install --only=production
RUN npx prisma generate

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]

FROM base as dev

ENV FOO=/app

WORKDIR ${FOO}

COPY package.json ${FOO}
RUN npm install

COPY . ${FOO}

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

