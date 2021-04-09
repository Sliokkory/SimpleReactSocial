FROM node:14.16.0 

WORKDIR /code

COPY package.json /code/package.json
COPY index.js /code/index.js

RUN npm install

EXPOSE 3001 
CMD ["node", "index.js"]