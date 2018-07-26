// 引入饿了么UI组件库中的message和load
import {Loading, Message, MessageBox} from 'element-ui'
import Axios from 'axios'

let BaseUrl = ""
if(process.env.NODE_ENV=='development'){
  BaseUrl = "/api"
}else if((process.env.NODE_ENV=='production')){
  BaseUrl = ""
}

console.log(BaseUrl)
var axios = Axios.create({
  baseURL: BaseUrl,
  timeout: 30000,
  headers: {
  }
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
  if(res.data.code > 0){
    console.log(`请求失败:${res.data.message}`)
  }

  return res;
},function(err){
  //Do something with response error
    console.log(err)
    loadinginstace.close();
    Message.error({
        message:"请求失败"
    })
  return Promise.reject(error);
})

export default axios