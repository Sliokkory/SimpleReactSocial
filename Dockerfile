FROM node:14.16.0 

WORKDIR /code 

COPY ["package.json", "package-lock.json", "./"] 

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]