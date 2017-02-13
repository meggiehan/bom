function on(ele, type, fn) {
    if(/^self/.test(type)){
        if(!ele['aSelf'+type]){
            ele['aSelf'+type]=[];
        }
        var b=ele['aSelf'+type];
        for (var k=0;k< b.length;k++){
            if(b[k]===fn){
                return;
            }
        }
        b.push(fn);
    }else if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else {
        if (!ele['aEvent' + type]) {
            ele['aEvent' + type] = [];
            ele.attachEvent('on' + type, function () {
                run.call(ele)
            })
        }
        var a = ele['aEvent' + type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                return;
            }
        }
        a.push(fn);
    }
}
function run() {
    var e = window.event;
    var type = e.type;
    var a = this['aEvent' + type];
    if (a && a.length) {
        if (!e.target) {
            e.target = e.srcElement;
            e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
            e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
            e.stopPropagation = function () {
                e.cancelBubble = true;
            };
            e.preventDefault = function () {
                e.returnValue = false;
            }

        }
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == 'function') {
                a[i].call(this, e);
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }
}
function selfRun(selfType,e){
    var a=this['aSelf'+selfType];
    if(a){
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == 'function') {
                a[i].call(this, e);
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }
}
function off(ele, type, fn) {
    if(/^self/.test()){
        var a=ele['aSelf'+type];
        if(a){
            for (var i = 0; i < a.length; i++) {
                if (a[i] == type) {
                    a[i] = null;
                    return;
                }
            }
        }
    }else if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
    } else {
        var a = ele['aEvent' + type];
        if (a && a.length) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] == fn) {
                    a[i] = null;
                    return;
                }
            }
        }
    }
}

function processThis(fn,obj){
    return function(e){fn.call(obj,e)}
}
