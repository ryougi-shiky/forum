FROM node:16-slim as Builder

WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
