# Use the official CentOS 7 base image
FROM centos:7

# Set environment variables
ENV NODE_VERSION 18

# Install required dependencies
RUN yum -y update && \
    yum -y install epel-release && \
    yum -y install wget && \
    wget https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz && \
    tar -xJvf node-v$NODE_VERSION-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-v$NODE_VERSION-linux-x64.tar.xz && \
    yum -y clean all

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]