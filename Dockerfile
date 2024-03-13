# syntax=docker/dockerfile:1

FROM node:16.20.2
#ENV NODE_ENV=production
#ENV HUSKY_SKIP_INSTALL=1

WORKDIR /app

#RUN echo fs.inotify.max_user_watches=524288 > /etc/sysctl.conf 
#RUN echo sysctl -p

#COPY ["package.json", "package-lock.json*", "./"]

COPY . .
#RUN npm install --include=dev
#RUN npm run build:dev -ws --if-present

#CMD [ "npm", "run mock" ]
EXPOSE 3000
CMD npm --prefix=/app run mock -w=react-store -D FOREGROUND
