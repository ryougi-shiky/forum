# 使用 Go 官方镜像作为构建环境
FROM golang:1.21 as builder

# 设置工作目录
WORKDIR /app

# 复制 go.mod 和 go.sum 文件并下载依赖信息
COPY go.mod go.sum ./
RUN go mod download

# 复制源代码
COPY . .

# 构建应用程序
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o gin-server ./cmd/

# 使用 alpine 镜像作为基础来减小镜像大小
FROM alpine:latest  
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# 从构建者镜像中复制构建的应用程序
COPY --from=builder /app/gin-server .

# 运行 gin 应用程序
CMD ["./gin-server"]
