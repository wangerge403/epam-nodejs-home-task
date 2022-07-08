FROM node:16

WORKDIR /code

ADD . /code

RUN npm install

# 暴露3000端口
EXPOSE 3000

# 启动
CMD node index.js