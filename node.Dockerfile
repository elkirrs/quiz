FROM node:lts-alpine

# Set working directory
WORKDIR /var/www/web

RUN apk --update add --no-cache nano \
    make zip curl unzip

EXPOSE 5173

CMD ["tail", "-f", "/dev/null"]