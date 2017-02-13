

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
      //原型只有一个，构造函数可以有多个，所以在这里要把this.events加到init方法上，这样每次new init()都可以去修改events属性，但是加到原型上，修改一个，则全部修改了，所以不可以加到原型上。
       hmj.fn=hmj.prototype={
            constructor:hmj,//构造器指向hmj
            length:0,//这里是一个标识符，让所有由hmj构造的方法都拥有这个标识，让别人一看就会以为是数组或者是伪数组，这里的length是不会变得。并且必须要有，否则会报错。
            selector:'',//原型中的selector属性是用来区分使用选择器字符串创建的hmj对象和其他的hmj对象。并且selector属性会保存创建hmj对象的选择器字符串。
            type:'hmj',//type属性是用来区分hmj对象和其他对象用的。
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
                      //先把旧的方法执行一遍，然后在执行新传进来的方法。
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
                   this.events=html.events;
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
             //这里要考虑索引是从0开始的，所以不能是!index
              if(index===undefined){
                return this.toArray();
             //如果为空，那么就返回一个数组，包含所有的值。
              }
              return this[index];
             //若为值，则返回相对应的内容。
             },
             //调用eq方法返回包含了对应index下标元素的hmj对象。
             //这里是hmj调用的eq方法，所以这个this就是指hmj构造函数下的new init();
             eq:function(num){
              var dom;
              if(num>=0){
              //如果大于了0，那么返回相应的值。
                dom=this.get(num);
              }else{
               //否则，就是负数，那么倒着来查找。
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
    //这里是判断内置方法的返回值的正则表达式。
    //这里是判断基本选择器的正则表达式，以分组的形式。
      var rnative=/\{\s*\[native \w/;
      var rtrim=/^\s+|\s+$/g;
      var rbselector=/^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

    //首先判断浏览器是否支持该方法，任何一个内置方法的返回值都是function 函数名(){[native code]}
    //首先创建一个support对象，用来测试是否支持该方法，返回值为Boolean。
    //能力检测部分
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
        //首先我们自己实现indexof方法，传入数组，和要搜索的值，和开始搜索的索引号。
            startIndex=startIndex||0;
        //首先，如果我们传入了就使用我们传入的startindex，否则初始化为0.
            if(support.indexOf){
                return array.indexOf(search,startIndex);
        //判断是否支持该方法，如果支持，就直接返回数组的方法。
            }else{
                for(var i=startIndex;i<array.length;i++){
        //否则，我们将判断搜索的和遍历的是否一致，返回他的索引，若存在了肯定会返回索引的。
                    if(array[i]==search){
                        return i;
                    }
                }
        //如果没有找到，那么就直接返回-1，表示数组中没有这项，没有找到该值。
                return -1;
            }
        }


        function unique(array){
            var i=0,resArray=[];
            for(; i<array.length;i++){
                if(myIndexOf(resArray,array[i])==-1){
                    //通过myindexof方法判断数组中是否已经有该值，==-1说明没有，那么我就追加进去。(去重)
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
            //首先将传进来的字符串用空格分隔开来。
            var arr=[],node=[document];
            //初始化一个数组，用来当做中间变量，接收遍历到的结果，并且创建一个node数组，放入document。
            for(var j=0;j<selectors.length;j++){
            //循环的总的次数
                for(var i=0;i<node.length;i++){
            //每次要去basicSelect看每个元素的基本选择器。
                push.apply(arr,basicSelect(selectors[j],node[i]));
                 }
            node=arr;
            //最后将arr遍历的结果赋值给node数组。
            arr=[];
            //同时把arr清空，以便下次再次存储查询的结果。
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
//arr.length>=0为什么要有这句，因为下面获取div的是一个伪数组，那么在遍历的时候，就会把他当成一个对象来使用，进入下面，然后遍历到最后的时候，会把length属性也当做对象进行遍历，那么这时候的this表示的是number，number是没有style方法的，所以找到的是空，那么最后就会报错。这里如果加上这句，则表示伪数组。
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
                //如果是j的第一次循环，就将本体添加到iobj[j]中。
                        temp=iobj[i];
                    }else{
                //如果不是j的第一次循环，就将克隆体添加过去。
                        temp=iobj[i].cloneNode(true);
                    }
                 //将克隆体和本体都添加到newobj对象中。
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
                //如果是j的第一次循环，就将本体添加到iobj[j]中。
                        temp=this[i];
                    }else{
                //如果不是j的第一次循环，就将克隆体添加过去。
                        temp=this[i].cloneNode(true);
                    }
                 //将克隆体和本体都添加到newobj对象中。
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
  on:function(type,func){
      var iobj=this;
      if(!iobj.events[type]){
        //首先判断在一次的情况下，进行初始化操作。
        iobj.events[type]=[];

        iobj.each(function(){
            var self=this;
          var f=function(e){
            // 为啥不能在下面用this，因为函数里的this表示的是每一个dom元素，而此时加的判断条件是外面的hmj对象的长度，所以要在外面加上一句that=this，或者可以直接使用对象.events['click'].length,即iobj.events['click'].length
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
  }

})

//其他的事件:
//这里在使用加号进行连接的时候，会存在运算符的优先级问题，比如.的优先级高于+号，所以必须加上一个()来提高优先级。再来使用split()方法来进行分割。
hmj.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu" ).split(' '),function(i,v) {
        hmj.fn[v]=function(fn){
            this.on(v,fn);
            return this;
        }
})
//另外一种写法:
//var eventname=this;
//hmj.fn[eventname]=function(fn){
//      var iobj=this;
//      iobj.on(eventname,fn);
//}


        window.hmj=window.H=hmj;

})(window)