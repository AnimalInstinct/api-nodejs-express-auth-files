FROM php:7.4-cli
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

RUN docker-php-ext-install mysqli pdo pdo_mysql

CMD [ "php", "./index.php" ]