FROM httpd:latest
COPY ./*.html /usr/local/apache2/htdocs/
COPY ./*.js /usr/local/apache2/htdocs/
COPY ./*.css  /usr/local/apache2/htdocs/