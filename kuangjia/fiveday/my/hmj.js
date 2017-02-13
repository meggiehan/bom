

(function(window,undefined){

    var arr=[],
    push=arr.push,
    slice=arr.slice;
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
//原型只有一个，构造函数可以有多个，所以在这里要把this.events加到init方法上，这样每次new init()都可以去修改events属性，但是加到原型上，修改一个，则全部修改了，所以不可以加到原型上。
       hmj.fn=hmj.prototype={
            constructor:hmj,
            length:0,
            // this.events={},放到这里加到原型上就是错误的。
            init:function(html){
                this.events={};
                 if(html==null ||html==''){
                    return;//加上return则表示后面的不再，可以提高性能。
                 }
                 //hmj(function(){...})
                 if(hmj.isFunction(html)){
                  //使用oldFn变量保存window.onload中事件处理的函数。
                    var oldFn=window.onload;
                    //如果oldFn是一个函数，我们就应该去做事件追加
                    //if (hmj.isFunction(oldFn)){}
                    if(typeof oldFn==='function'){
                      //onload绑定一个匿名函数，在匿名函数中先调用旧的函数处理oldFn
                      //然后再调用新的函数处理html,以此完成事件的追加。
                         window.onload=function(){
                           oldFn();
                           html();
                         }
                    }else{
                          window.onload=html;
                    }
                 }

            //这里的判断，是属于工具性方法，我传一个参数进行判断，再传一个参数进行判断，所以可以把他写成静态方法。从而达到优化。
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
                 }
                 //用dom元素创建hmj对象。
                 if(html.nodeType){
                  //虽然将html元素添加到了this对象中的第0个元素中，但是this对象中不会有一个length属性记录元素的个数。
                  //这里的this[0]是一个对象，这里相当于一个键值对，相当于赋值，所以没有自带的length属性，而上面的push是自动添加length属性的。
                  this[0]=html;
                  //所以此时手动添加一个length属性为1，以便进行遍历。
                  this.length=1;
                 }
                 //还可以写成：
                 //if(hmj.isDOM(html)){
                 //this[0]=html;
                 //this.length=1;
                 //}
             },

             selector:'',
             type:'hmj',
             toArray:function(){
              // var res=[];
              // for(var i=0;i<this.length;i++){
              //    res.push(this[i]);
              // }
              // return res;
              // 这种我们自己写的循环的方式是没有js原生的循环写法效率高的。所以有下面这种方式：
              // this.slice(0);这里的this表示hmj对象,hmj对象是没有slice方法的，所有用this借调这个方法，参数为0，表示把所有的参数都给遍历一次并返回到新的数组。
              return slice.call(this,0);
             },
             //get是指如果为空，那么直接就返回一个数组，如果有索引，则就直接返回那个索引对应的值，如果超出范围，则为undefined。
             get:function(index){
              if(index===undefined){
                return this.toArray();
              }
              return this[index];
             },
             //调用eq方法返回包含了对应index下标元素的hmj对象。
             //这里是hmj调用的eq方法，所以这个this就是指hmj构造函数下的new init();
             eq:function(num){
              var dom;
              if(num>=0){
                dom=this.get(num);
              }else{
                dom=this.get(this.length+num);
              }
              // 这里 dom 要么是 undefiend 要么就是 dom 对象
              // if ( dom == null ) {
              //   // 一个 length 为 0 的 itcast 对象
              // } else {
              //   // 将 DOM 对象, 包装成 itcast 对象
              // }
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
//---------------------------------------------------------------------------------

//静态方法实现each，map核心方法
hmj.extend({
  each:function(arr,func){
     if(arr instanceof Array || arr.length>=0){
            for(var i=0;i<arr.length;i++){
                func.call(arr[i],i,arr[i]);
            }
        }else{
            for( i in arr){
                func.call(arr[i],i,arr[i]);
            }
        }
        return arr;
  },
  map:function(arr,func){
      var res=[],temp,i;
        if(arr instanceof Array || arr.length>=0){
            for(i=0;i<arr.length;i++){
                temp=func(arr[i],i);
                if(temp!=null){
                    res.push(temp);
                }

            }
        }else {
            for(i in arr){
                temp=func(arr[i],i);
                if(temp!=null){
                    res.push(temp);
                }
            }
        }
        return res;
  }
})


//---------------------------------------------------------------------------------
//添加appendTo方法
//DOM操作模块

hmj.fn.extend({
  //selector可能的情形：1，选择器字符串："div"  2.hmj对象  3.itcast对象   4.dom节点：document.body
appendTo:function(selector){
            //使用selector作为参数创建一个itcast对象iobj。
            var iobj=this.constructor(selector);
            //var iobj=hmj(selector);
            //创建一个没有参数或者元素的hmj对象
            var newobj=this.constructor();
            //var newiobj=hmj();
            //var newiobj=hmj.fn.constructor();
            //就是不能用var newiobj=hmj.constructor();这句,因为hmj是一个构造函数，constructor也是一个构造函数,那么这时候new出来的就是大写的Function(),所以会出错。
            for(var i=0;i<this.length;i++){
              //使用j循环iobj的所有元素
                for(var j=0;j<iobj.length;j++){
              //使用this[i]节点克隆出来一份，将克隆的节点添加到iobj的第j个元素中去
                    var temp;
                    if(j==0){
                      //如果不是j的第一次循环，就将本体添加到iobj[j]中。
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
            //this.constructor(selector).prependTo(this);
            var iobj=this.constructor(selector);
            for(var i=0;i<iobj.length;i++){
                for(var j=0;j<this.length;j++){
                    var temp;
                    if(j==0){
                        temp=iobj[i];
                    }else{
                        temp=iobj[i].cloneNode(true);
                    }
                    hmj.prependChild(this[j],temp);
                }
            }
            return this;
}
})
//事件处理模块:
// hmj.fn.extend({
//   click:function(func){
//     //这里的this是hmj对象，相当于itcast对象
//       this.each(function(){
//     //函数里面的this指的是遍历的dom元素。
//         this.onclick=func;
//       })
//       //最后的this也是hmj对象。
//       return this;//由于链式编程问题，所以这里返回的是this。
//   }
// })

//事件处理模块:
hmj.fn.extend({
  click:function(func){
      var iobj=this;
      if(!iobj.events['click']){
        iobj.events['click']=[];

        iobj.each(function(){
          this.onclick=function(){
            for(var i=0;i<iobj.events['click'].length;i++){
              iobj.events['click'][i]();
            }
          }
        })//之所以把这块放到了if里面，是因为外面的只有点击了相应的元素，才会执行一次这里，所以没有必要放到外面重负执行。

      }
      iobj.events['click'].push(func);

      return this;//由于链式编程问题，所以这里返回的是this。
  }
})


        window.hmj=window.H=hmj;

})(window)