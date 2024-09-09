FROM node:16-alpine
#复制文件
RUN mkdir /app 
ADD ./ /app 
WORKDIR /app
# 安装
RUN npm set registry https://registry.npmmirror.com 
RUN yarn config set registry https://registry.yarnpkg.com/
RUN yarn cache clean
RUN yarn install
RUN npm i pm2 -g
# 启动
EXPOSE 8888
CMD ["pm2-runtime","start","ecosystem.config.js"]