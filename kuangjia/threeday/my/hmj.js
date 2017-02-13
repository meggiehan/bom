

(function(window,undefined){

    var push=[].push;
    try{
        var div=document.createElement('div');
        div.innerHTML='<p>123</p>';
        var arr=[];
        push.apply(arr,div.getElementsByTagName('p'));
    }
    catch(e){
        push={
            apply:function(arr1,arr2){
                for(var i=0;i<arr2.length;i++){
                    arr1[arr1.length]=arr2[i];
                }
            }
        };
    }


        function hmj(html){
            return new hmj.fn.init(html);
        }

       hmj.fn=hmj.prototype={
            constructor:hmj,
            length:0,
            init:function(html){
                 if(html==null ||html==''){
                    return;
                 }
                 if(hmj.isFunction(html)){

                 }
            //这里的判断，是属于工具性方法，我传一个参数进行判断，再传一个参数进行判断，所以可以把他写成静态方法。从而达到优化。
                 if(hmj.isString(html)){
                    if(/^</.test(html)){
                         push.apply(this,parseHTML(html));
                    }else{
                         push.apply(this,hmj.select(html));
                    }
                 }
             }
        }
     hmj.fn.init.prototype=hmj.fn;

//添加可扩展的方法extend
hmj.extend=hmj.fn.extend=function(obj){
    //判断这里的k是不是obj自己创建提供的方法，检测的方法为obj.hasOwnProperty(k)。
    for(var k in obj){
        this[k]=obj[k];
    }
}

//选择器
var select=
(function(){
    //所有的正则表达式
      var rnative=/\{\s*\[native \w/;
      var rtrim=/^\s+|\s+$/g;
      var rbselector=/^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

    //能力检测部分
      var support={};
      support.getElementsByClassName=!rnative.test(document.getElementsByClassName+'');
      support.qsa=!rnative.test(document.querySelectorAll+'');
      support.trim=!rnative.test(String.prototype.trim+'');
      support.indexOf=!rnative.test(Array.prototype.indexOf+'');
      // support.qsa=false;

    //所有的方法集合
        function getByClassName(className,node){
          node=node||document;
          var ele,res=[],i;
          if(support.getElementsByClassName){
            return node.getElementsByClassName(className);
          }
          else{
            ele=node.getElementsByTagName('*');
            for(i=0;i<ele.length;i++){
              if((' '+ele[i].className+' ').indexOf(' '+className+' ')>-1){
              res.push(ele[i]);
              }
            }
          }
          return res;
        }


        function myTrim(str){
          if(support.trim){
            return str.trim();
          }else{
            return str.replace(rtrim,'');
          }
        }


        function myIndexOf(array,search,startIndex){
            startIndex=startIndex||0;
            if(support.indexOf){
                return array.indexOf(search,startIndex);
            }else{
                for(var i=startIndex;i<array.length;i++){
                    if(array[i]==search){
                        return i;
                    }
                }
                return -1;
            }
        }


        function unique(array){
            var i=0,resArray=[];
            for(; i<array.length;i++){
                if(myIndexOf(resArray,array[i])==-1){
                    resArray.push(array[i]);
                }
            }
            return resArray;
        }


        function basicSelect(selector,node){
           node = node || document;
            var m,results=[];
            m=rbselector.exec(selector);
            if(m){
              if(m[1]&&(res=document.getElementById(m[1]))){
                results.push(res);
              }else if(m[2]){
                  push.apply(results,getByClassName(m[2],node));
              }else if(m[3]){
                  push.apply(results,node.getElementsByTagName(m[3]));
              }else if(m[4]){
                  push.apply(results,node.getElementsByTagName(m[4]));
            }
          }
            return results;
        }

        function select2(selector,results){
            results=results||[];
            var selectors=selector.split(' ');

            var arr=[],node=[document];

            for(var j=0;j<selectors.length;j++){
                for(var i=0;i<node.length;i++){
                push.apply(arr,basicSelect(selectors[j],node[i]));
                 }
            node=arr;
            arr=[];
            }
            push.apply(results,node);
            return results;
        }

        //将select函数放在最后
        function select(selector,results){
            results=results||[];
            var m,temp,selectors,subselector;
            if(typeof selector!='string') return results;

            if(support.qsa){
            push.apply(results,document.querySelectorAll(selector));
            }else{
                 selectors=selector.split(',');
                for(var i=0;i<selectors.length;i++){
                    subselector=myTrim(selectors[i]);
                    if(rbselector.test(subselector)){
                        push.apply(results,basicSelect(subselector));
                    }else{
                        select2(subselector,results);
                    }
                }
            }
            return unique(results);
      }
      //最后返回一个接口出去，以便外面来调用
return select;
})();

     hmj.select=select;
//---------------------------------------------------------------------------------

//一些判断的方法
    hmj.extend({
        isString:function(data){
            return typeof data==='string';
        },
        isFunction:function(data){
            return typeof data==='function';
        },
        isDOM:function(data){
            if(data.nodeType){
                return true;
            }
            return false;
        }
    });

//---------------------------------------------------------------------------------

//一些DOM操作的方法

//将字符串转换为DOM对象的函数。
  var parseHTML=
(function(){
    var div=document.createElement('div');
     function parseHTML(html){
             div.innerHTML=html;
             var res=[];
             for(var i=0;i<div.childNodes.length;i++){
                res.push(div.childNodes[i]);
             }
             div.innerHTML='';
             return res;
        }
        return parseHTML;
})();
//添加appendTo方法
hmj.fn.extend({
    appendTo:function(dom){
        for(var i=0;i<this.length;i++){
            dom.appendChild(this[i]);
        }
    }
});
//---------------------------------------------------------------------------------


        window.hmj=window.H=hmj;

})(window)