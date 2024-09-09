FROM nginx:1.23.0-alpine

# -p 创建多个层级的目录 如果某个目录不存在就创建
RUN mkdir -p /etc/nginx/conf/ssl

# 本地配置文件替换远程
ADD ./nginx.conf /etc/nginx/nginx/conf

# 本地SSl证书替换远程
ADD ssl/backend/elitestudy.fun-backend.key /etc/nginx/conf/ssl/elitestudy.fun-backend.key
ADD ssl/backend/elitestudy.fun-backend.pem /etc/nginx/conf/ssl/elitestudy.fun-backend.pem

# 开放端口 http服务 
# 此处是开启一个nginx镜像 在基础nginx上增加了本地配置文件和ssl，nginx监听80端口 http 并把请求分发给相应路径下的前端资源？
EXPOSE 80