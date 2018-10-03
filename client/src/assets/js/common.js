/**
 * 函数节流
 *
 * @param   fn       要节流的函数
 * @param   interval 间隔时间
 * @return  function 处理后的节流函数
 */
export function throttle(fn, interval) {
    let __self = fn, //保存需要被延迟执行的函数的引用
        timer,　//　定时器
        firstTime = true; //　是否第一次调用

    return function () {
        let args = arguments,
            __me = this;

        // 如果是第一次调用,不需延迟执行
        if(firstTime) {
            __self.apply(__me, args);
            return firstTime = false;
        }

        // 如果定时器还在,说明前一次延迟执行还没有完成
        if (timer) {
            return false;
        }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500);
    }
}


/**
 * 函数防抖
 *
 * @param   idle     防抖的时间
 * @param   action   要防抖的函数
 * @return  function 处理后的防抖函数
 */
export function debounce(idle, action) {
    let last;
    return function(){
        let ctx = this, args = arguments;
        clearTimeout(last);
        last = setTimeout(function(){
            action.apply(ctx, args)
        }, idle || 500)
    }
}