<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 启动

```shell
pnpm i

pnpm start:dev
```

## 接口文档

http://localhost:1219/api-docs/#/

## 失败操作返回

```ts
return { message: 'xxx失败', code: HttpCode.ERR }
```

## 服务器命令

- 在终端中运行以下命令以列出当前正在运行的网络连接和端口

```shell
netstat -tuln
```

- 查找正在使用的端口

```shell
lsof -i -P -n | grep LISTEN
```
