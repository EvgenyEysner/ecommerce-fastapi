FROM node:16.17.0

RUN apt-get update && apt-get -y upgrade

# Create destination directory
WORKDIR /frontend
COPY package.json yarn.lock* /frontend/

RUN yarn --no-progress && rm -rf /tmp/*

COPY . /frontend/

RUN yarn build
EXPOSE 3000

CMD [ "yarn", "start" ]
