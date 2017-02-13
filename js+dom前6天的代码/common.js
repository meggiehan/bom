/**
 * Created by Administrator on 2016/10/31.
 */

/**
 * 兼容性的封装
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    if (typeof element.innerText === "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}
/**
 * 兼容性的设置
 * @param element
 * @param content
 */
function setInnerText(element,content) {
    if (typeof element.innerText === "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}
//封装
/**
 * 获取上一个兄弟元素的兼容方法
 * @param element
 * @returns {*}
 */
function getpreviousElement(element) {
    if (element.previousElementSibling) {//能找到
        return element.previousElementSibling;
    } else {
        var perv = element.previousSibling;//上一个兄弟节点
        //如果next是我们想要的 就返回 如果不是我们想要的 就一直找
        while (perv && perv.nodeType !== 1) {//有 并且 不是我们要的
            perv = perv.nextSibling;
        }
        return perv;
    }
}


//封装
/**
 *  获取下一个兄弟元素的兼容方法
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {//能找到
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;//下一个兄弟节点
        //如果next是我们想要的 就返回 如果不是我们先要的 就一直找
        while (next && next.nodeType !== 1) {//有 并且 不是我们要的
            next = next.nextSibling;
        }
        return next;
    }
}
//封装
/**
 * 全选，不选，和反选
 * @param element
 * @param inputs
 * @param bool
 */
function fnchecked(element,inputs,bool){
    element.onclick=function(){
        for(var i=0;i<inputs.length;i++){
            if(typeof bool==="boolean"){
                inputs[i].checked=bool;
            }
            else{
                inputs[i].checked=!inputs[i].checked;
            }
        }
    }
}

//封装
/**
 *  获取当前元素的第一个子元素
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var el = element.firstChild;//第一个子节点
        while (el && 1 !== el.nodeType) {
            el = el.nextSibling;//往后找
        }
        return el;
    }
}
//封装
/**
 * 获取当前元素的最后一个子元素
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var el = element.lastChild;
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;//上一个兄弟节点
        }
        return el;
    }
}
//封装
/**
 * 左右全部选择以及部分选择，改变元素的位置。
 * @param sour
 * @param dest
 * @param isMoveAll
 */
function move(sour,dest,isMoveAll){
    var options=sour.children;
    for(i=0;i<options.length;i++){
        var option=options[i];
        if(isMoveAll || option.selected){
            dest.appendChild(option);
            i--;
        }
    }

}

//封装
/**
 * 通过id获取元素的函数
 * @param id
 * @returns {Element}
 */
function $(id) {//形参            //实参
    return document.getElementById(id);//如果这里将id两边加了双引号，那么就等于写固定了。就不能进行调用了。
}
/**
 * 快速遍历数组并且输出。
 */
arr.forEach(function(element,index,array){
    console.log(element);
})

/**
 * 将一个数组内的值用某种分隔符分隔开
 * @param arr
 * @param sep
 * @returns {*}
 */
function join(arr, sep) {//sep表示分隔符的样式，如"-","/","|"等。
    var str = arr[0];
    for (var i = 1; i < arr.length; i++) {
        str = str + sep + arr[i];
    }
    return str;
}
/**
 * 封装查找字符串里的固定字符出现的位置。
 * @type {number}
 */
var num = -1;
function findStr(str, x) {
    num = str.indexOf(x, num + 1);
    if (num !== -1) {
        console.log(num);
        findStr(str, x);
    }
}
findStr(str,x);

/**
 * 封装当一个标签有多个类名的时候替换指定类名的方法
 * @param element
 * @param oldStr
 * @param newStr
 */
function replaceClassName(element, oldStr, newStr) {
    //把类名这个字符串按照空格分割 把里面每一个类名 做判断 这样就没问题了
    var arr = element.className.split(" ");
    //console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === oldStr) {
            arr[i] = newStr;
        }
    }
    //console.log(arr);
    element.className = arr.join(" ");
}
//封装通过类名获取元素对象的兼容方法。
/**
 * 查找一个父盒子下面指定类名的所有类名并显示。
 * @param element
 * @param className
 * @returns {*}
 */
function getElementsByClassName(element, className) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        //找到所有的标签 判断是否有这个类名 有就放到数组里
        var filterArr = [];
        var elements = element.getElementsByTagName("*");
        for (var i = 0; i < elements.length; i++) {
            var nameArr = elements[i].className.split(" ");
            for (var j = 0; j < nameArr.length; j++) {
                if (nameArr[j] === className) {
                    filterArr.push(elements[i]);
                    break;
                }
            }
        }
        return filterArr;
    }
}

//封装
/**
 * addLoadEvent来给页面绑定加载后执行事件
 * @param fn
 */
function addLoadEvent(fn){
    var oldLoad = window.onload;
    if(typeof(oldLoad) === "function"){
        oldLoad();
        fn();
    }else{
        window.onload = fn;
    }
}

//封装
/**
 * 动画轮播图左右播放的函数封装。
 * @param obj
 * @param target
 */
function animateys(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = leader < target ? step : -step;
        if (Math.abs(target - leader) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 15);
}


/**
 * 让 任意对象 移动到 指定位置,缓动动画的封装。
 * @param obj
 * @param target
 */
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style.left = leader + "px";
        if (leader === target) {
            clearInterval(obj.timer);
        }
    }, 15);
}

/**
 * 封装窗体大小发生改变的事件
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

/**
 * 封装自己的scroll()滚动事件发生后的大小
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * 封装求数组中最小的那一项的值，并且返回值的index。
 * @param arr
 */
function getMin(arr) {
    var min = {};
    min.index = 0;//最小值的索引
    min.value = arr[min.index];//最小值的值
    //遍历数组 一个一个比较
    for (var i = 0; i < arr.length; i++) {
        if (min.value > arr[i]) {
            min.value = arr[i];
            min.index = i;
        }
    }
    return min;
}