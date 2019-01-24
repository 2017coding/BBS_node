## Build Setup

``` bash
# 安装依赖
npm install

# 运行项目
npm run dev

# 使用热更新打开node服务，主要用于调试
npm run hot

# 更新接口后使用此命令重新生成api相关文档
npm run apidoc

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