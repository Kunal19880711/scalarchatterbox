# Dockerfile
FROM node:20-alpine

# Set work directory
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copying
COPY --chown=node:node . .

# Set user node
USER node

# Build
RUN npm --prefix client install && npm --prefix server install && npm --prefix client run build

EXPOSE 8000

CMD ["npm", "--prefix", "server", "start"]