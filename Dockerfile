FROM nginx:1.17.1-alpine
COPY /aviventas /usr/share/nginx/html
RUN chown nginx:nginx /usr/share/nginx/html/* -R
