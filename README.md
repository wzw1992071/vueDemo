# my-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8082
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

代理设置：
在/config/index.js  中dev下面proxyTable下的target 改为代理地址
在/src/views/index.vue  mounted里模拟登陆获取token

目录结构

src/api  请求相关封装
assets   静态资源及第三方js
router   路由
utils    常用工具类
views/compunent/nav 侧边栏的配置