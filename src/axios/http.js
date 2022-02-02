import axios from 'axios';
import router from "@/router/index.js"; //引入vue-router达到跳转的效果
// import NProgress from 'nprogress' //导入进度条插件
// import 'nprogress/nprogress.css' //导入进度条样式
import {
  Message
} from 'element-ui'; //按需导入elementui消息提示。用于展示错误给用户。


// 创建axios子实例，设置baseURL来拼接地址前缀
const instance = axios.create({
  // baseURL: "/api"
  baseURL: "http://ceshi.hi-sm.com/api",
  timeout: 30000, // 请求超时。一个请求超过此时间，归为请求不通
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // NProgress.start() //开启进度条
  // let token = localStorage.getItem("token");
  // config.headers['Authorization'] = 'Bearer ' + JSON.parse(token); //统一添加请求头
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})


// 添加响应拦截器
// 因为是异步的。所以有成功函数，与失败函数。同样有Promise.reject把错误往下抛出
instance.interceptors.response.use(function (res) {
  // 以下都是请求地址正常请求。对返回错误的进行处理。
  // NProgress.done() //关闭进度条

  // 不是200，说明有错误，打印错误。在请求拦截器里面做操作，懒得每次在vue判断状态返回码了
  // console.log("拦截器，所有返回信息", res, res.status)
  // if (res.status != 200) {
  //   if (res.data.code && res.data.code != 200) {
  //     return Message.error(res.data.message);
  //   }
  // }
  // if (res.data.code == 400) {
    // return Message.error(res.data.message)
  // }
  // 401 代表token 失效，需要重新登录（方案一：使用refresh_token请求接口刷新token。方案二：前端定时请求刷新token的接口）
  if (res.data.code == 401) {
    console.log("地址可以请求，token失效401")
    localStorage.removeItem('token');
    localStorage.removeItem('user_iscompany');
    localStorage.removeItem('user_info');
    localStorage.removeItem('balance');
    if ((router.history.current.path).startsWith("/company") || localStorage.getItem("user_iscompany") == "true") {
      router.push("/company/login")
    } else {
      router.push("/login");
    }
  }
  // 402 代表接口无权限 失效
  if (res.data.code == 402) {
    if ((router.history.current.path).startsWith("/company") || localStorage.getItem("user_iscompany") == "true") {
      router.push("/company/login")
    } else {
      router.push("/login");
    }
    return;
    // return Message.error(res.data.message);
  }
  // 405 代表请求方式错误
  // if (res.data.code == 405) {
    // return Message.error("get、post请求方式出错");
  // }
  // 429 代表请求太频繁
  if (res.data.code == 429) {
    return Message.error("您请求太频繁了，请休息一会");
  }

  //没有错误，正常返回结果
  return res;

  // 如果地址无法请求，那么执行以下err函数
}, function (err) {
  console.dir("地址无法请求", err);

  // 找不到错误、就是网络问题导致发送请求失败
  if (err.response === null || err.response === "" || err.response === undefined) {
    // Message.error("网络异常，请检查！"); //请求超时也算
  }

  // 存在状态码（有网，地址无法请求，那么都有状态码返回）
  if (err.response.status) {
    switch (err.response.status) {
      case 404:
        // Message.error('err_carse:can not find url 404');
        break;
      case 500:
        // Message.error('err_carse:server bad 500');
        break;
        // case 401:
        // // token 失效
        //     if(err.response.statusText == 'Unauthorized'){
        //         if(err.response.data.message == undefined){
        //         Message.error(err.response.data);
        //         }else{
        //         Message.error(err.response.data.message);
        //         window.location.href='/#/admin/login';
        //         }
        //     }else{
        //         Message.error(err.response.statusText+",Code："+err.response.status+"！");
        //     }
        //     break;

      default:
        // Message.error('err_carse:other code error' + err.response.status);
        break;
    }
  } else {
    // Message.error("未知错误,错误信息：" + err.response.statusText + "！");
  }

  // reject将错误整体往下抛。后续可以通过catch拿到这里的错误。请求失败没到达后台接口。
  return Promise.reject(err);
});

// get方法发起请求。主要是这里统一处理异步。免得请求每次加async await和错误处理了
export function get(url, params) {
  return new Promise((resolve, reject) => {
    instance({
        method: "get",
        url: url,
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        // reject(err.response.status) //报错会有：Uncaught (in promise) 理由：catch处理错误，reject向下传递错误，所以抓不到他。
        console.log("请求失败：状态码", err.response.status)
      })
  });
}

// put方法发起请求。主要是这里统一处理异步。免得请求每次加async await和错误处理了
export function put(url, params) {
  return new Promise((resolve, reject) => {
    instance({
        method: "put",
        url: url,
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        // reject(err.response.status) //报错会有：Uncaught (in promise) 理由：catch处理错误，reject向下传递错误，所以抓不到他。
        console.log("请求失败：状态码", err.response.status)
      })
  });
}

// deletes方法发起请求。主要是这里统一处理异步。免得请求每次加async await和错误处理了
export function deletes(url, params) {
  return new Promise((resolve, reject) => {
    instance({
        method: "delete",
        url: url,
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        // reject(err.response.status) //报错会有：Uncaught (in promise) 理由：catch处理错误，reject向下传递错误，所以抓不到他。
        console.log("请求失败：状态码", err.response.status)
      })
  });
}

// post方法发起请求。主要是这里统一处理异步。免得请求每次加async await和错误处理了
export function post(url, params) {
  return new Promise((resolve, reject) => {
    instance({
        method: "post",
        url: url,
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        // reject(err.response.status) //报错会有：Uncaught (in promise) 理由：catch处理错误，reject向下传递错误，所以抓不到他。
        console.log("请求失败：状态码", err.response.status)
      })
  });
}

// post格式formdata提交。包括图片以及数据的上传
export function postformdata(url, formdata, params) {
  return new Promise((resolve, reject) => {
    instance({
        method: "post",
        url: url,
        data: formdata,
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        // reject(err.response.status) //报错会有：Uncaught (in promise) 理由：catch处理错误，reject向下传递错误，所以抓不到他。
        console.log("请求失败：状态码", err.response.status)
      })
  });
}

// 统一说明：params跟data效果一样。
// 只是请求格式不一样，一个是对象方式发送参数，一个是json字符串方式发送字符串。
// axios.post/get/put等方式有bug，可能会报500错误
// 所以推荐使用 axios({
//   method: "post",
//   url: url,
//   params: params
// })