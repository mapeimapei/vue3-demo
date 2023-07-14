/**
 * 防抖节流辅助函数
 * 参数说明：
 *     immediate  是否需要立即执行(true立即执行/false不立即执行),默认立即执行
 *     time  防抖时间(多少时间内生效(防抖模式(默认300ms)/节流模式(默认不锁定,需要手动解锁))
 *     key  必传
 * 使用方法：
 *    引入整个文件： import throttleDebounce  from "@/utils/throttle-debounce.js"
 *    调用相关的方法，比如要节流
 *      throttleDebounce.throttle({
            success:()=>{
                里面写你的方法
            }
        })
 */
module.exports = {
  keyList: {},
  throttle(e = {}) {
    e.immediate = (e.immediate === undefined ? true : e.immediate);
    if (e.immediate && !this.keyList[e.key]) {
      e.success && e.success();
    }
    clearTimeout(this.keyList[e.key])
    this.keyList[e.key] = setTimeout(() => {
      e.success && e.success();
      this.releaseKey(e.key)
    }, e.time || 300)
  },
  debounce(e = {}) {
    e.immediate = (e.immediate === undefined ? true : e.immediate);
    if (!this.keyList[e.key]) {
      if (e.immediate) {
        this.lockKey(e.key);
        e.success && e.success();
      } else {
        this.lockKey(e.key);
      }
      if (e.time) {
        setTimeout(() => {
          if (!e.immediate) {
            e.success && e.success();
          }
          this.releaseKey(e.key)
        }, e.time)
      }
    } else {
      e.fail && e.fail()
    }
  },
  releaseKey(key) {
    delete this.keyList[key]
  },
  lockKey(key) {
    this.keyList[key] = true
  }
}