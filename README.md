# my-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
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

打包时导出需修改action,可以搜索/api定位所有
注释掉http.js关于api的那句