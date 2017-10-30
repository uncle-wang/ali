FROM hub.c.163.com/nce2/nodejs:6.11.2

# Create app directory
RUN mkdir -p /workspace/ali
WORKDIR /workspace/ali

# Bundle app source
COPY . /workspace/ali
RUN npm install
RUN npm install -g forever

EXPOSE 6932
EXPOSE 3031

CMD ["npm", "start"]