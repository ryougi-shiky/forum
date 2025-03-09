# ---- Base Node ----
FROM node:16-alpine AS base
# 设置环境变量
ENV NODE_ENV=production
WORKDIR /usr/src/app
# 安装node模块
COPY package*.json ./
# 如果存在npm-shrinkwrap.json，则复制
COPY npm-shrinkwrap.json* ./

# ---- Dependencies ----
FROM base AS dependencies
# 安装编译所需的依赖，包括Python、make和g++
RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && npm install --production \
    # 移除编译依赖以减小镜像大小
    && apk del .gyp

# 拷贝生产依赖项
RUN cp -R node_modules prod_node_modules
# 安装所有依赖项
RUN npm install

# ---- Release ----
FROM base AS release
# 拷贝生产依赖项
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# 拷贝项目文件
COPY . .
# 改变所有权
RUN chown -R node /usr/src/app
# 切换用户
USER node
# 暴露端口
EXPOSE 5000
# 启动命令
CMD ["npm", "start"]
