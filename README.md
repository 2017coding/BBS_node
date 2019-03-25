## Build Setup

``` bash
# 安装依赖
npm install

# 运行项目
npm run dev

# 运行node服务
npm run dev

# 使用热更新打开node服务，方便边开发边调试 (调试时用Debug)
npm run hot

# 更新接口后使用此命令重新生成api相关文档
npm run apidoc

# 使用forever 实现在服务器上关闭控制台时node服务正常访问
npm run start # 启用node服务
npm run stop  # 关闭node服务

# 项目基本结构
├── config                     // 配置相关
├── controller                 // 控制器
├── model                      // model
├── mysql                      // mysql配置文件
├── node_modules               // 项目依赖
├── public                     // 静态资源库
├── routes                     // 路由
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── app.js                     // 入口 加载配置 初始化
├── index.js                   // 启动文件
└── package.json               // package.json
```

# 返回的数据格式
```
 {
   success: true,        // 响应状态
   code: 20000,         // 状态码
   content: {},        // 数据
   message: '操作成功' // 提示
 }
```
# 返回码和相关提示定义
1 为账号错误
2 为认证错误
3 为参数错误
4 为数据不存在
5 为系统错误
0 为成功

|状态码|定义|
|:----|:---|
|20101|当前被登出|
|20201|身份认证失败|
|20202|无操作权限|
|20301|参数错误|
|20401|数据不存在|
|20501|服务器内部错误|
|20000|操作成功|
|20001|操作失败|
