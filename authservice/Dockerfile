FROM --platform=linux/amd64 node:16-alpine     
WORKDIR /app
COPY package*.json ./
RUN npm install

# # uninstall the current bcrypt modules
# RUN npm uninstall bcrypt

# # install the bcrypt modules for the machine
# RUN npm install bcrypt

COPY . .
EXPOSE 4000

CMD [ "npm", "start" ]
# CMD [ "node", "server.js" ]