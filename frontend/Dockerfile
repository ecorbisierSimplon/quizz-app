FROM node:21-alpine 

ENV FOO=/app
WORKDIR ${FOO}
COPY package.json ${FOO}
RUN npm install
COPY . ${FOO}
EXPOSE 8081
CMD ["npm", "run", "dev --host"]