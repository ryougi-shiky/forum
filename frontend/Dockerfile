FROM node:16-slim as Builder
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
RUN npm run build

# ======================================
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

# 可选：自定义 nginx 配置（如果你有）
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]