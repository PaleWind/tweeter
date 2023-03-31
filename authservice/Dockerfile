FROM --platform=linux/amd64 node:16-alpine     
# FROM node:16-alpine     
WORKDIR /app
COPY package*.json ./
RUN npm install
# COPY . .
EXPOSE 4000
EXPOSE 9229

# ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "./authServer.js" ]
CMD ["npm","run", "start-debug"]
# CMD [ "npm", "start" ]
# CMD [ "node", "server.js" ]