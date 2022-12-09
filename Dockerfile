# syntax=docker/dockerfile:1

FROM node:14.21.1
ENV NODE_ENV=production

WORKDIR /app

RUN echo fs.inotify.max_user_watches=524288 > /etc/sysctl.conf 
RUN echo sysctl -p

#COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm install --production

#CMD [ "npm", "run mock" ]
EXPOSE 3000
CMD npm --prefix=/app run mock -D FOREGROUND
