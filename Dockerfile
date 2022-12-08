# syntax=docker/dockerfile:1

FROM node:14.21.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm install --production

#CMD [ "npm", "run mock" ]
EXPOSE 3000
CMD npm run mock -D FOREGROUND
