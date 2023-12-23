FROM mysql:5.6
# 将 SQL 文件复制到容器中的 /docker-entrypoint-initdb.d 目录
# MySQL 容器在启动时会自动执行 /docker-entrypoint-initdb.d 目录下的 SQL 文件和脚本
COPY sql/init-db.sql /docker-entrypoint-initdb.d/
