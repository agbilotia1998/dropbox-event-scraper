FROM mhart/alpine-node:16
MAINTAINER Ayush agb.ayushgupta@gmail.com

RUN mkdir -p /scraper
WORKDIR /scraper
COPY . ./

RUN npm install

CMD ["npm", "start"]
