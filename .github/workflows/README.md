# GitHub Actions 工作流程

本目录包含项目使用的 GitHub Actions 工作流程配置。

## Docker Compose Build 工作流

文件: `docker-build.yml`

该工作流程会在每次创建、更新或重新打开针对 `main` 分支的 Pull Request 时自动运行。

### 功能和步骤

1. **检出代码**: 将 PR 的代码拉取到工作流运行环境中
2. **设置 Docker Buildx**: 配置 Docker 构建环境
3. **缓存 Docker 层**: 使用缓存加速后续构建
4. **构建服务**: 使用 `docker-compose build` 构建项目中定义的所有服务
5. **验证镜像**: 列出构建的 Docker 镜像，确认构建成功
6. **验证配置**: 检查 Docker Compose 配置的有效性
7. **测试启动**: 尝试启动服务并验证服务状态
8. **报告结果**: 显示构建的最终状态

### 环境变量

工作流中设置了以下环境变量：

- `REACT_APP_BACKEND_URL`: 前端服务连接后端的 URL
- `REACT_APP_SOCKET_URL`: Socket 服务的 URL
- `REACT_APP_SOCKET_SERVER_PORT`: Socket 服务器端口
- `REACT_APP_OPEN_WEATHER_RAPID_API_KEY`: 天气 API 密钥（从 GitHub Secrets 中获取）

### 添加 GitHub Secrets

为了安全地使用 API 密钥，您需要在仓库设置中添加以下 Secret：

1. 前往仓库页面
2. 点击 "Settings" > "Secrets and variables" > "Actions"
3. 点击 "New repository secret"
4. 添加 `OPEN_WEATHER_API_KEY` 和其他需要的密钥

### 自定义配置

如需修改工作流程，请编辑 `.github/workflows/docker-build.yml` 文件。

- 修改触发条件: 更改 `on` 部分
- 添加或修改环境变量: 更新 `env` 部分
- 调整构建步骤: 修改或添加 `steps` 中的项目 