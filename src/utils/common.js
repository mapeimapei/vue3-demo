/**
 * 通用js方法封装处理
 */


// export function base64Encode() {
//   var rv;
//   rv = encodeURIComponent("********");
//   rv = unescape(rv);
//   rv = window.btoa(rv);
//   return rv;
// }


/**
 * eg. '922f5530-90d5-42b2-a419-886d5e49b6e0'
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * eg. 'u4pd76ni1500'
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}


// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

/**
 * @param {string} text
 * @returns {string}
 */
function htmlDecode(text) {
  let temp = document.createElement("div")
  temp.innerHTML = text
  let output = temp.innerText || temp.textContent
  temp = null
  return output
}

export function formatData(obj) {
  if (typeof (obj) === "object") {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      for (let key of Object.keys(obj)) {
        if (typeof (obj[key]) === 'object') {
          this.formatData(obj[key])
        } else if (typeof (obj[key]) === 'string') {
          obj[key] = htmlDecode(obj[key])
        }
      }
    } else if (Object.prototype.toString.call(obj) === "[object Array]") {
      obj.forEach((item, index) => {
        if (typeof (item) === 'object') {
          this.formatData(item)
        } else if (typeof (obj[index]) === 'string') {
          obj[index] = htmlDecode(item)
        }
      })
    }
  }
  return obj
}


// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}


//二进制流下载
//type为下载文件的类型
export function blobDownloadFn(res, type) {
  var disp = res.request.getResponseHeader('Content-Disposition')
  var fileName = ""
  if (disp && disp.search('attachment') != -1) {
    var index = disp.indexOf("")
    var lastlndex = disp.lastlndexOf("")
    fileName = disp.substring(index + 1, lastlndex)
  }
  var eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.style.display = 'none'
  //字符内容转变成blob地址
  if (!!type) {
    var blob = new Blob([res.data], { type: "application/" + type })
  } else {
    var blob = new Blob([res.data])
  }
  eleLink.href = URLcreateObjectURL(blob)
  //触发点击
  document.body.appendChild(eleLink)
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    window.navigator.msSaveOrOpenBlob(blob, eleLink.download)
  } else {
    eleLink.click()
  }
  //然后移除
  document.body.removeChild(eleLink)
}



export const exportDefault = 'export default '



