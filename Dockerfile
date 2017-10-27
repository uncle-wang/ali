FROM hub.c.163.com/nce2/nodejs:0.12.2

# Create app directory
RUN mkdir -p /workspace/ali
WORKDIR /workspace/ali

# Bundle app source
COPY . /workspace/ali
RUN npm install
RUN npm install -g forever

EXPOSE 6932
CMD [ "npm", "start" ]