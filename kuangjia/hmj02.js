

(function(window,undefined){

    var arr=[],
    push=arr.push,
    slice=arr.slice;
    try{
        var div=document.createElement('div');
        div.innerHTML='<p>123</p>';
        var arr=[];
        push.apply(arr,div.getElementsByTagName('p'));
        //检测浏览器是否支持该方法。
    }
    //如果捕获到了异常不支持时，就自己实现该方法。
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
            selector:'',
            type:'hmj',
            init:function(html){
                  this.events={};
                 if(html==null ||html==''){
                    return;
                 }
                 if(hmj.isFunction(html)){
                    var oldFn=window.onload;
                    if(typeof oldFn==='function'){
                         window.onload=function(){
                           oldFn();
                           html();
                         }
                    }else{
                          window.onload=html;
                    }
                 }

                 if(hmj.isString(html)){
                    if(/^</.test(html)){
                         push.apply(this,parseHTML(html));
                    }else{
                         push.apply(this,hmj.select(html));
                         //将选择器字符串记录到selector属性中。
                         this.selector=html;
                    }
                 }
                 //字符串是没有.type的属性的，所以只有当传进来的html是对象时才能进入下面。
                 if(html && html.type==='hmj'){
                  //表示是一个hmj对象
                  //将html对象中的成员添加到this（指的是上面new init()对象）中去。
                   push.apply(this,html);
                   this.selector=html.selector;
                   this.events=html.events;
                 }
                 //用dom元素创建hmj对象。
                 if(html.nodeType){
                 this[0]=html;
                  //所以此时手动添加一个length属性为1，以便进行遍历。
                  this.length=1;
                 }
             },
             toArray:function(){
              return slice.call(this,0);
             },
             get:function(index){
             //这里要考虑索引是从0开始的，所以不能是!index
              if(index===undefined){
                return this.toArray();
             //如果为空，那么就返回一个数组，包含所有的值。
              }
              return this[index];
             //若为值，则返回相对应的内容。
             },
             eq:function(num){
              var dom;
              if(num>=0){
              //如果大于了0，那么返回相应的值。
                dom=this.get(num);
              }else{
               //否则，就是负数，那么倒着来查找。
                dom=this.get(this.length+num);
              }
              return this.constructor(dom);
              //return hmj(dom);
             },
             //该方法可以使用func函数来遍历hmj对象中的所有元素
             each:function(func){
              //调用静态方法each来遍历this对象中的所有元素。
              return hmj.each(this,func);
             },
             //map方法可以使用func函数遍历hmj对象中的所有元素并映射形成一个新的数组。
             map:function(func){
              return hmj.map(this,func);
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
      var rnative=/\{\s*\[native \w/;
      var rtrim=/^\s+|\s+$/g;
      var rbselector=/^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

      var support={};
      support.getElementsByClassName=!rnative.test(document.getElementsByClassName+'');
      support.qsa=!rnative.test(document.querySelectorAll+'');
      support.trim=!rnative.test(String.prototype.trim+'');
      support.indexOf=!rnative.test(Array.prototype.indexOf+'');
      // support.qsa=false;
      //所以这里是把返回的所有+''则表示这时候就是一个字符串了，同时可以进行测试是否支持该对象了。

    //所有的方法集合
        function getByClassName(className,node){
        //首先封装getElementByClassName,传入要遍历的类名和节点。
          node=node||document;
        //这里是如果传进来了node就用传进来的，否则就用document。
          var ele,res=[],i;
        //这时候判断浏览器是否支持该方法，支持直接返回，如果不支持进入else。
          if(support.getElementsByClassName){
            return node.getElementsByClassName(className);
          }
          else{
            //首先获取到所有的类名，存入到ele中。
            ele=node.getElementsByTagName('*');
            //开始遍历
            for(i=0;i<ele.length;i++){
            //判断当值不为-1时，说明已经匹配到了，这时候就把他追加到res数组中。
              if((' '+ele[i].className+' ').indexOf(' '+className+' ')>-1){
              res.push(ele[i]);
              }
            }
          }
          return res;//将获取到的类名返回。
        }


        function myTrim(str){
          if(support.trim){
        //首先判断系统是否支持该方法，不支持使用自己创建的方法
            return str.trim();
          }else{
            return str.replace(rtrim,'');
            //这里表示把两边所有的空格替换了
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
            //截取字符串，实现正则的分组。
            m=rbselector.exec(selector);
            if(m){
            //如果m匹配到了，那么进入下面的条件。
            //判断当为id时
              if(m[1]&&(res=document.getElementById(m[1]))){
                results.push(res);
            //判断当为类名时
              }else if(m[2]){
                  push.apply(results,getByClassName(m[2],node));
            //判断当为所有的时
              }else if(m[3]){
                  push.apply(results,node.getElementsByTagName(m[3]));
            //判断为标签选择器
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
            //循环的总的次数
                for(var i=0;i<node.length;i++){
            //每次要去basicSelect看每个元素的基本选择器。
                push.apply(arr,basicSelect(selectors[j],node[i]));
                 }
            node=arr;
            arr=[];
            }
            push.apply(results,node);
            //最后将找到的结果放到results中，并且返回出去。
            return results;
        }

        //将select函数放在最后
        function select(selector,results){
            results=results||[];
            var m,temp,selectors,subselector;
            if(typeof selector!='string') return results;
            //首先判断是不是字符串，如果不是，直接返回，不再执行下面。

            if(support.qsa){
            push.apply(results,document.querySelectorAll(selector));
            }else{
                 selectors=selector.split(',');
                for(var i=0;i<selectors.length;i++){
                //这里是调用mytrim方法，用来去除两边多余的空格
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
        //给构造函数添加静态方法
        //判断是否是字符串
        isString:function(data){
            return typeof data==='string';
        },
        //判断是否是函数
        isFunction:function(data){
            return typeof data==='function';
        },
        //判断是否是一个dom元素(例如:document.body等)
        isDOM:function(data){
            if(data.nodeType){
                return true;
            }
            return false;
        },
        //这里是把传进来的元素添加到指定的旧的元素之前。
        prependChild:function(parent,element){
          //这里是调用insertBefore方法将传进来的新元素，放到第一个节点的前面。
           parent.insertBefore(element,parent.firstChild);
        }
    });

//---------------------------------------------------------------------------------

//一些DOM操作的方法

//将字符串转换为DOM对象的函数。
  var parseHTML=
(function(){
    //首先我们需要一个容器，用来存储结果。
    var div=document.createElement('div');
     function parseHTML(html){
    //将字符串赋给容器的innerHTML。
             div.innerHTML=html;
             var res=[];
    //然后进行遍历，遍历其childNodes
             for(var i=0;i<div.childNodes.length;i++){
                res.push(div.childNodes[i]);
             }
    //最后将临时的div容器清空。
             div.innerHTML='';
             return res;
    //返回最后的元素数组。
        }
        return parseHTML;
})();
//---------------------------------------------------------------------------------

//静态方法实现each，map核心方法
hmj.extend({
  each:function(arr,func){
     if(arr instanceof Array || arr.length>=0){
            for(var i=0;i<arr.length;i++){
            //使用arr[i]来借调call方法实现，数组的遍历。
                func.call(arr[i],i,arr[i]);
            }
        }else{
            for( i in arr){
            //如果是对象的话，进入这层循环。
                func.call(arr[i],i,arr[i]);
            }
        }
        return arr;
  },
  map:function(arr,func){
      var res=[],temp,i;
        if(arr instanceof Array || arr.length>=0){
            for(i=0;i<arr.length;i++){
            //首先用一个临时的变量来存储结果。
                temp=func(arr[i],i);
            //如果不为空，那么就追加到数组中去。
                if(temp!=null){
                    res.push(temp);
                }

            }
        }else {
            //否则就是对象的情况。
            for(i in arr){
                temp=func(arr[i],i);
            //遍历完之后依旧是把不为空的值追加到新的数组中去。
                if(temp!=null){
                    res.push(temp);
                }
            }
        }
        //最后就把这个新的数组返回出去。
        return res;
  }
})

hmj.fn.extend({
appendTo:function(selector){
            //使用selector作为参数创建一个itcast对象iobj。
            var iobj=this.constructor(selector);
            //var iobj=hmj(selector);
            //创建一个没有参数或者元素的hmj对象
            var newobj=this.constructor();
            for(var i=0;i<this.length;i++){
              //使用j循环iobj的所有元素
                for(var j=0;j<iobj.length;j++){
              //使用this[i]节点克隆出来一份，将克隆的节点添加到iobj的第j个元素中去
                    var temp;
                    if(j==0){
                      //如果是j的第一次循环，就将本体添加到iobj[j]中。
                        temp=this[i];
                    }else{
                      //如果不是j的第一次循环，就将克隆体添加过去。
                        temp=this[i].cloneNode(true);
                    }
                    //将克隆体和本体都添加到newobj对象中。
                push.call(newobj,temp);
                //例如这里是将页面所有的div，都添加上p元素这个操作
                iobj[j].appendChild(temp);
                }
            }
            //返回包含了复制体和本体的newobj对象。
            return newobj;
},
appen:function(selector){
            //第一种写法：
            //this.constructor(selector).appendTo(this);
            var iobj=this.constructor(selector);
            for(var i=0;i<iobj.length;i++){
                for(var j=0;j<this.length;i++){
                    var temp;
                    if(j==0){
                        temp=iobj[i];
                    }else{
                        temp=iobj[i].cloneNode(true);
                    }
                    this[j].appendChild(temp);
                }
            }
            return this;
},
prependTo:function(selector){
            var iobj=this.constructor(selector);
            var newobj=this.constructor();
            for(var i=0;i<this.length;i++){
                for(var j=0;j<iobj.length;j++){
                    var temp;
                    if(j==0){
                        temp=this[i];
                    }else{
                        temp=this[i].cloneNode(true);
                    }
                push.call(newobj,temp);
                hmj.prependChild(iobj[j],temp);
                }
            }
            return newobj;
},
prepend:function(selector){
            //第一种写法：
            //this.constructor(selector).prependTo(this);
            var iobj=this.constructor(selector);
            for(var i=0;i<iobj.length;i++){
                for(var j=0;j<this.length;j++){
                    var temp;
                    if(j==0){
                //如果是j的第一次循环，就将本体添加到iobj[j]中。
                        temp=iobj[i];
                    }else{
                //如果不是j的第一次循环，就将克隆体添加过去。
                        temp=iobj[i].cloneNode(true);
                    }
                    hmj.prependChild(this[j],temp);
                 //将克隆体和本体都添加到newobj对象中。
                }
            }
            return this;
}
})

//事件处理模块:
hmj.fn.extend({
  on:function(type,func){
      var iobj=this;
      if(!iobj.events[type]){
        //首先判断在一次的情况下，进行初始化操作。
        iobj.events[type]=[];

        iobj.each(function(){
            var self=this;
          var f=function(e){
            for(var i=0;i<iobj.events[type].length;i++){
              // iobj.events[type][i]();
              iobj.events[type][i].call(self,e);
            }
          }
          //判断浏览器是否支持addEventListener
        if(this.addEventListener){
            this.addEventListener(type,f);
        }else{
           //不支持则使用低版本的attachEvent
            this.attachEvent('on'+type,f);
        }
        })
      }
      //如果之前已经有函数添加到数组里了，那么这时候就直接push添加到数组就可以了。
      iobj.events[type].push(func);

     return this;//由于链式编程问题，所以这里返回的是this。
  },
  onmouseover:function(func){
    this.on('onmouseover',func);
  },
  click:function(func){
    this.on('click',func);
  },
  off:function(type,func){
    //首先用一个arr数组把事件存储起来。
    var arr=this.events[type];
    //当删除某一个事件的时候，最好倒着遍历数组
   for(var i=arr.length-1;i>=0;i--){
    //如果说传进来的事件和数组中的一致，那么就调用splice方法来删除。
        if(arr[i]===func){
            arr.splice(i,1);
        }
     }
  },
   hover:function(func1,func2){
    return this.mouseover(func1).mouseout(func2);
  },
  toggle:function(){
    var i=0;
    var args=arguments;
    this.on('click',function(e){
      args[i % args.length].call(this,e);
      i++;
    });
    return this;
  }

})

//其他的事件:
hmj.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu" ).split(' '),function(i,v) {
        hmj.fn[v]=function(fn){
            this.on(v,fn);
            return this;
        }
})


        window.hmj=window.H=hmj;

})(window)