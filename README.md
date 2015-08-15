# 手机调试用的log服务

> 因为手机端不能用console看debug信息
> 提供了两种方式：一种是通过浏览器访问接口查看log信息，一种是直接查看服务上的文件。

启动服务：node server.js
linux 下后台启动服务：nohup nodejs server.js &

get 请求：
http://localhost:3000/console_log?user=fengshq&info=test2 

查看存储在服务上的文件
http://localhost:3000/console_log/get/fengshq
