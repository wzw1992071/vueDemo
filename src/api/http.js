// 引入饿了么UI组件库中的message和load
import {Loading, Message, MessageBox} from 'element-ui'
import Axios from 'axios'

var axios = Axios.create({
  // baseURL: '/api',//本地开发用，打包注释

  timeout: 30000,
  headers: {'X-Custom-Header': 'foobar'}
});




var loadinginstace
//添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  loadinginstace = Loading.service({ fullscreen: true })  
  return config;
},function(err){
  //Do something with request error

    loadinginstace.close();
    Message.error({
        message:"请求超时"
    })
  return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
  loadinginstace.close();
  // 对登陆超时进行处理
  if(res.data.code == 10106){
    MessageBox.alert('登陆超时', '提示',{
      confirmButtonText: '确定',
      callback: action => {
        window.location.href="/"
      }
    })
  }
  return res;
},function(err){
  //Do something with response error

    loadinginstace.close();
    Message.error({
        message:"请求失败"
    })
  return Promise.reject(error);
})

export default axios