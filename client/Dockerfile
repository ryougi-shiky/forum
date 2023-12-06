# 使用多阶段构建
FROM node:16-alpine as builder

WORKDIR /usr/src/app

# Install curl
RUN apk add --no-cache curl

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装生产依赖
RUN npm install --only=production

# 复制生产代码
COPY . .

# 可以在这里运行构建脚本，例如：npm run build

# 运行阶段
FROM node:16-alpine

WORKDIR /usr/src/app

# 从构建阶段复制 node_modules 目录和生产代码
COPY --from=builder /usr/src/app .

# 暴露端口
EXPOSE 3000

RUN chown -R node /usr/src/app

# 使用非 root 用户运行
USER node

# 启动应用
CMD ["npm", "start"]
