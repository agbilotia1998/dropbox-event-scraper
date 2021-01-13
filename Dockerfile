FROM mhart/alpine-node:12
MAINTAINER Ayush agb.ayushgupta@gmail.com

RUN mkdir -p /scraper
WORKDIR /scraper
COPY . ./

RUN npm install

CMD ["npm", "start"]
