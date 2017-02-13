/**
 * Created by xiao lei on 2016/6/23.
 */

var utils = (function () {
    var flag = 'getComputedStyle' in window;

    function rnd(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var tmp = n;
            n = m;
            m = tmp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    function listToArray(arg) {
        if (flag) {
            return Array.prototype.slice.call(arg)
        }
        var ary = [];
        for (var i = 0; i < arg.length; i++) {
            ary[ary.length] = arg[i];
        }
        return ary;
    }

    function jsonParse(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    function win(attr, value) {
        if (typeof value === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    }

    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    function getByClass(curEle, strClass) {
        curEle = curEle || document;
        if (flag) {
            return this.listToArray(curEle.getElementsByClassName(strClass))
        }
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        var nodeList = curEle.getElementsByTagName('*');
        var ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var bOk = true;
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                //var reg=new RegExp('(^| +)'+curClass+'( +|$)')
                var reg = new RegExp('\\b' + curClass + '\\b');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }

    function hasClass(curEle, cName) {
        cName = cName.replace(/(^ +)|( +$)/g, '');
        var reg = new RegExp('\\b' + cName + '\\b');
        return reg.test(curEle.className)
    }

    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass;
            }
        }
    }

    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            //var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)');
            var reg = new RegExp('\\b' + aryClass[i] + '\\b');
            if (reg.test(curEle.className)) {
                curEle.className = curEle.className.replace(reg, ' ').replace(/\s+/g, ' ').replace(/(^ +)|( +$)/g, '');
            }
        }
    }

    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle.style.styleFloat = value;
            curEle.style.cssFloat = value;
            return;
        }
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
        if (reg.test(attr)) {
            value = parseFloat(value) + 'px';
        }
        curEle.style[attr] = value;
    }

    function getCss(curEle, attr) {
        var val, reg;
        if (flag) {
            val = getComputedStyle(curEle, false)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity[=:](\d+)\)$/;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }

        }
        reg = /^([+-])?\d+(\.\d+)?(pt|px|rem|em)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setGroupCss(curEle, options) {
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr]);
        }
    }

    function css(curEle) {
        var arg2 = arguments[1];
        if (typeof arg2 === 'string') {
            var arg3 = arguments[2];
            if (typeof arg3 === 'undefined') {
                return this.getCss(curEle, arg2)
            } else {
                this.setCss(curEle, arg2, arg3)
            }
        }
        if (arg2.toString() === '[object Object]') {
            this.setGroupCss(curEle, arg2);
        }
    }

    function getChildren(curEle, tag) {//tag:ul
        var ary = [],
            nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeType === 1) {
                if (typeof tag !== 'undefined') {
                    if (nodeList[i].tagName.toLowerCase() === tag) {
                        ary[ary.length] = nodeList[i];
                        break;
                    }
                } else {
                    ary[ary.length] = nodeList[i];
                }
            }
        }
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    function nextAll(curEle) {
        var nex = this.next(curEle);
        var ary = [];
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        if (pre) ary.push(pre);
        if (nex) ary.push(nex);
        return ary;
    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    function firstChild(curEle) {
        return this.getChildren(curEle)[0];
    }

    function lastChild(curEle) {
        var aChs = this.getChildren(curEle);
        return aChs[aChs.length - 1]
    }

    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    function appendChild(parent, newEle) {
        parent.appendChild(newEle);
    }

    function prependChild(parent, newEle) {
        var first = this.firChild(parent);
        if (first) {
            parent.insertBefore(newEle, first);
        } else {
            parent.appendChild(newEle);
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
        } else {
            oldEle.parentNode.appendChild(newEle);
        }

    }

    return {
        //rnd:兼容版的求一定范围的随机数 n,m
        rnd: rnd,
        //listToArray：类数组转数组
        listToArray: listToArray,
        //jsonParse:把JSON格式的字符串转成JSON格式的数据(对象)
        jsonParse: jsonParse,
        //win:浏览器盒子模型的兼容性处理；
        win: win,
        //offset:当前元素距离body的位置 {left:l,top:t}
        offset: offset,
        //getByClass：在一定的范围内，通过className来获取元素
        getByClass: getByClass,
        //hasClass:验证这个元素上是否有某个class名；
        hasClass: hasClass,
        //addClass:如果元素身上没有这个class名，我们才会添加
        addClass: addClass,
        //removeClass:如果元素身上有这个class名，才能删除
        removeClass: removeClass,
        //getCss:获取经过浏览器计算过的样式（面试：如何获取非行间样式）
        getCss: getCss,
        //setCss:设置样式 透明度 单位 float
        setCss: setCss,
        setGroupCss: setGroupCss,
        //css:取值赋值合体的函数：getCss,setCss,setGroupCss三合一
        css: css,
        //getChildren:获取当前元素下的所有子元素
        getChildren: getChildren,
        //prev:上一个哥哥元素节点
        prev: prev,
        //prevAll:获取当前元素的所有哥哥元素节点
        prevAll: prevAll,
        //next:下一个弟弟元素节点
        next: next,
        //nextAll:找所有的弟弟元素几点
        nextAll: nextAll,
        //sibling:获取相邻元素
        sibling: sibling,
        //siblings:获取当前元素的所有兄弟节点：所有的哥哥元素节点+所有的弟弟元素节点
        siblings: siblings,
        //firstChild:当前元素的第一个子元素
        firstChild: firstChild,
        //lastChild:获取当前元素下的最后一个子元素；
        lastChild: lastChild,
        //index：获取当前元素的索引
        index: index,
        appendChild: appendChild,
        //prependChild:把新元素插入到当前容得最开始
        prependChild: prependChild,
        insertBefore: insertBefore,
        //把新元素插入到指定元素的弟弟元素的前面；
        insertAfter: insertAfter
    }
})();











