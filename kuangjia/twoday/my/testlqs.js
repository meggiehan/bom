/*
* @Author: Marte
* @Date:   2017-01-12 23:54:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-01-13 00:00:35
*/

var select =
    (function(){

        var push = [].push;
        //如果出现了错误就要重写
        try {
            var div = document.createElement('div');
            div.innerHTML='<p></p>';
            var arr = [];
            push.apply(arr,div.getElementsByTagName('p'));
        } catch (e) {
            push = {
                apply:function(arr1,arr2){
                    for(var i = 0; i < arr2.length; i++){
                        arr1[arr1.length] = arr2[i];
                    }
                }
            }
        }

        //正则表达式
        var rnative = /\{\s*\[native/,
            rtrim = /^\s+|\s+$/g;
            rbaseselector = /^(?:\#([\w-]+)|\.([\w-]+)|(\*)|(\w+))$/;

        //support 对象存放getElementsByClassName,trim,indedOf,qsa 低版本浏览器是否兼容的方法boolean值
        var support = {};
        support.getElementsByClassName = !rnative.test(document.getElementsByClassName + ' ');
        support.qsa =! rnative.test(document.querySelectorAll + ' ');
        support.trim =! rnative.test(String.prototype.trim + ' ');
        support.indexOf = ! rnative.test(Array.prototype.indexOf + ' ');

        //getByClass 兼容性封装
        function getByClass(className,node){
            node = node || document;
            var results = [],
                allElem;
            if(support.getElementsByClassName){
                //浏览器支持该方法
                push.apply(results,node.getElementsByClassName);
            } else {
                //自定义实现
                allElem = document.getElementsByTagName('*');
                for(var i = 0; i < allElem.length; i++){
                    if((' '+allElem[i].className+' ').indexOf(className+' ') > -1){
                        results.push(allElem[i]);
                    }
                }
            }
            return results;
        }

        // myTrim 兼容性封装 去出字符串两端空白
        var myTrim = function(str)
         {
             //浏览器方法定义检测
            if(support.trim){
                return str.trim();
            } else {
                //正则替换方法自定义实现
                return str.replace(rtrim,'');
            }
        }

        //indexOf 兼容性封装 查找元素在数组中的位置 匹配不到则返回-1
        var myIndexOf = function (array,search,startIndex){
            //初始化startIndex
            startIndex = startIndex || 0;
            //浏览器方法定义检测
            if(support.indexOf){
                return array.indexOf(search,startIndex);
            } else {
                //自定义实现
                for(var i = startIndex; i < array.length; i++){
                    //循环判断search是否与array中的第i项相等
                    if(array[i] === search){
                        return i ;
                    }
                }
                //没有匹配到 返回-1
                return -1;
            }
        }

        //unique 数组去重
        var unique = function(array){
            //新建空数组 用以存放第一次出现的数组元素
            var resArray = [];
            for(var i = 0; i < array.length; i++){
                //调用 myIndexOf() 筛选数组元素
                if(myIndexOf(resArray,array[i]) == -1){
                    resArray.push(array[i]);
                }
            }
            return resArray;
        }

        //basicSelect 封装 基本选择器查询 id,class,tag,*
        function basicSelect(selector,node){
            //初始化node 默认为document
            node = node || document;
            var m,
                temp,
                res = [];
                //正则查询捕获 以组的形式依次返回到一个数组中
            if( m = rbaseselector.exec(selector)){
                //第一组 表示 id
                if(m[1]&&( temp = document.getElementById(m[1]))){
                    res.push(temp);
                } else if(m[2]){ // class
                    push.apply(res,getByClass(m[2]),node);
                } else if(m[3]){ // *
                    push.apply(res,node.getElementsByTagName(m[3]));
                } else if(m[4]){ // tag

                    push.apply(res,node.getElementsByTagName(m[4]));
                }
            }
            return res;
        }

        //select2  封装 后代选择器  'div p .c'
        function select2(selector,results){
            //初始化results
            results = results || [];
            //将selector以空格分开
            var selectors = selector.split(' ');
            var arr = [],
            node = [document];
            //遍历selectors
            for(var i = 0; i < selectors.length; i++){
                for(var j = 0; j < node.length; j++ ){
                    //查询每一层对应的匹配元素 追加到数组中
                    //document->div, divs->p, ps->.c
                    //最后一层得到的数组即为我们目标匹配元素 追加返回即可
                   push.apply(arr,basicSelect(selectors[i],node[j]));
                }
                //查询得到的数组赋值给node供下一层匹配node下的元素使用
                node = arr;
                //清空arr
                arr = [];
            }
            //node中的目标元素追加返回
            push.apply(results,node);
            return results;
        }

        //select 入口函数
        function select(selector,results){
            //init results
            results = results || [];
            var m, temp, selectors, i, subslector;
            //判断输入的是否为字符串
            if(typeof selector != 'string') return results;
            //参数输入正常，对选择器做选择
            //如果浏览器支持qsa方法
            if(support.qsa){
                push.apply(results,document.querySelectorAll(selector));
            } else {
                //不支持 则自己实现
                //将selector以逗号隔开
                selectors = selector.split(',');
                //遍历selectors
                for(var i = 0; i < selectors.length; i++){
                    //去除两端空白
                    subslector = myTrim(selectors[i]);
                    //处理selectors  两种情况： 基本选择器 ， 后代选择器
                    //用正则 rbaseselector 即可判断
                    if(rbaseselector.test(subslector)){
                        //基本选择器 basicSelect 函数
                        push.apply(results,basicSelect(subslector));
                    } else {
                        //后代选择器 select2 函数
                        select2(subslector,results);
                    }
                }
            }
            //返回results
            return unique(results);
        }

        return select;

})()
