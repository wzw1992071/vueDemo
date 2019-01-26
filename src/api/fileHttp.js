// 引入饿了么UI组件库中的message和load
import {Loading, Message, MessageBox} from 'element-ui'
import Axios from 'axios'

var fileAxios = Axios.create({
    timeout: 30000,
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });


  fileAxios.interceptors.response.use(res=>{
    console.log(res)
  },err=>{
    console.log(err)
  })
  export default fileAxios