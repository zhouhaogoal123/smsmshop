/*判断是否为空*/
export function isEmpty(str) {
  if (str === '' || str === null || str === undefined) {
    return true;
  }
  return false;
}

/*用于销量或者之类的*/
export function filterNumber(num) {
  let numArr = num.toString().split('');
  if (numArr.length === 1) { //个
    return num;
  } else if (numArr.length === 2) { //十 45 返回：40+
    let num = parseInt(numArr[0] + '0') + '+';
    return num;
  } else if (numArr.length === 3) { //百 583 返回：580+
    let num = parseInt(numArr[0] + numArr[1] + '0') + '+';
    return num;
  } else if (numArr.length === 4) { //千 4892 返回：4800+
    let num = parseInt(numArr[0] + numArr[1] + '00') + '+';
    return num;
  } else if (numArr.length === 5) { //万 48927 返回：4.8万+
    let num = numArr[0] + '.' + numArr[1] + '万+';
    return num;
  } else if (numArr.length === 6) { //十万 489272 返回：48万+
    let num = numArr[0] + numArr[1] + '万+';
    return num;
  } else if (numArr.length === 7) { //百万 489272 返回：148万+
    let num = numArr[0] + numArr[1] + numArr[2] + '万+';
    return num;
  }
}

/*时间戳转为时间*/
export function filterTime(time) {
  const date = new Date(time * 1000)
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let hour = date.getHours().toString().padStart(2, '0');
  let minute = date.getMinutes().toString().padStart(2, '0');
  let second = date.getSeconds().toString().padStart(2, '0');
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

// 本地文件如何转成 base64
export function uploadImgToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () { // 图片转base64完成后返回reader对象
      resolve(reader)
    }
    reader.onerror = reject
  })
}

// 图片上传到oss
export const ossopt = {
  region: "oss-cn-beijing",
  accessKeyId: "LTAI5tSErhS8bmSvcMSxuFqz",
  accessKeySecret: "Z4q7K2zC0luWXw5DJuxIhXmNCHNtMX",
  stsToken: "",
  bucket: "ggwj",
}


//设置cookie    
function setCookie(name, value, seconds) {
  seconds = seconds || 0; //seconds有值就直接赋值，没有为0    
  var expires = "";
  if (seconds != 0) { //设置cookie生存时间    
    var date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值    
}

export function setInfo(key, value) {
  localStorage.setItem(key, value);
  setCookie(key, value) //存储localStorage的同时，也存储一个cookie来监听
}

//取得cookie
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';'); //把cookie分割成组    
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]; //取得字符串    
    while (c.charAt(0) == ' ') { //判断一下字符串有没有前导空格    
      c = c.substring(1, c.length); //有的话，从第二位开始取    
    }
    if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name    
      return unescape(c.substring(nameEQ.length, c.length)); //解码并截取我们要值    
    }
  }
  return false;
}
// 如果没有登录信息，清空localStorage信息
// if (!getCookie('Token')) {
//   localStorage.clear();
// }