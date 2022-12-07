################################################################################
# Emerald Dockerfile 
################################################################################

FROM ubuntu:14.04
MAINTAINER Jon Harding <jonathan.harding@hcl.com>

#Install NODEJS 14
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install curl
RUN curl -fsSL https://deb.nodesource.com/setup_14.x > setup_14.sh
RUN bash setup_14.sh
RUN DEBIAN_FRONTEND=noninteractive apt-get -y --force-yes install nodejs

RUN echo fs.inotify.max_user_watches=524288 > /etc/sysctl.conf 
RUN echo sysctl -p
RUN echo "@hclsoftware:registry=https://us-central1-npm.pkg.dev/hcldevops/hcldevops/" > ~/.npmrc
RUN echo "//us-central1-npm.pkg.dev/hcldevops/hcldevops/:always-auth=true" >> ~/.npmrc
RUN npm install @hclsoftware/hcl-commerce-react-store@latest
RUN npm --prefix node_modules/@hclsoftware/hcl-commerce-react-store install 
#ENV APACHE_PID_FILE /var/run/apache2/apache2.pid

EXPOSE 3000


#ADD . /var/www/html

#RUN chown -R www-data:www-data /var/www/html
#RUN chmod -R 755 /var/www/html

#CMD tail -F /var/log/apache2/*.log & /usr/sbin/apache2 -D FOREGROUND
CMD npm --prefix node_modules/@hclsoftware/hcl-commerce-react-store run mock -D FOREGROUND
