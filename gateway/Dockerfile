FROM --platform=linux/amd64 node:16-alpine     
WORKDIR /app
COPY package*.json ./
RUN npm install
# COPY . .
EXPOSE 4000
EXPOSE 9229
# ENTRYPOINT [ "nodemon","--inspect=0.0.0.0","./gatewayServer.js" ]
# CMD [ "npm", "start" ]
CMD ["npm","run", "start-debug"]