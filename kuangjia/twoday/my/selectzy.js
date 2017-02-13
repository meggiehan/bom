var select=
(function(){

var push=[].push;
try{
var div=document.createElement('div');
    div.innerHTML='<p></p>';
    var arr=[];
    push.apply(arr,document.getElementsByTagName('p'));
}
catch(e){
    push={
        apply:function(arr1,arr2){
            for(var i=0;i<arr2.length;i++){
                arr1[arr1.length]=arr2[i];
            }
        }
    }
}

//这里是判断内置方法的返回值的正则表达式。
            //这里是判断基本选择器的正则表达式，以分组的形式。
            var rantive=/\{\s*\[native \w/;
            var rbselector=/^(?:\#([\w\-]+)|\.([\w\-]+|)|(\*)|(\w+))$/;
            var rtrim=/^\s+|\s+$/g;


            //首先判断浏览器是否支持该方法，任何一个内置方法的返回值都是function 函数名(){[native code]}
            //首先创建一个support对象，用来测试是否支持该方法，返回值为Boolean。
            var support={};

            support.qsa=!rantive.test(document.querySelectorAll+'');
            support.getElementsByClassName=!rantive.test(document.getElementsByClassName+'');
            support.trim=!rantive.test(String.prototype.trim+'');
            support.indexOf=!rantive.test(Array.prototype.indexOf+'');
            //所以这里是把返回的所有+''则表示这时候就是一个字符串了，同时可以进行测试是否支持该对象了。
            //----------------------------------------------------------------------------------
            function getClassName(className,node){
              //首先封装getElementByClassName,传入要遍历的类名和节点。
               node=node||document;
               //这里是如果传进来了node就用传进来的，否则就用document。
               var ele,i,res=[];
               //这时候判断浏览器是否支持该方法，支持直接返回，如果不支持进入else。
               if(support.getElementsByClassName){
                return node.getElementsByClassName(className);
               }else{
                //首先获取到所有的类名，存入到ele中。
                ele=node.getElementsByTagName('*');
                //开始遍历
                for(i=0;i<ele.length;i++){
                  //判断当值>-1时，说明已经匹配到了，这时候就把他追加到res数组中。
                    if((' '+ele[i].className+' ').indexOf(' '+className+' ')>-1){
                        res.push(ele[i]);
                    }
                 }
               }
                 return res;//将获取到的类名返回。
            }

            //----------------------------------------------------------------------------------

        function mytrim(str){
          if(support.trim){
            //首先判断系统是否支持该方法，不支持使用自己创建的方法
            return str.trim();
          }else{
            return str.replace(rtrim,'');
            //这里表示把两边所有的空格替换了
          }
      }
            //----------------------------------------------------------------------------------

        function myindexof(array,search,startindex){
          //首先我们自己实现indexof方法，传入数组，和要搜索的值，和开始搜索的索引号。
          startindex=startindex||0;
          //首先，如果我们传入了就使用我们传的startindex，否则初始化为0.
          if(support.indexOf){
            return array.indexOf(search,startindex);
            //判断是否支持该方法，如果支持，就直接返回数组的方法。
          }else{
            for(var i=startindex;i<array.length;i++){
              //否则，我们将判断搜索的和遍历的是否一致，返回他的索引，若存在了肯定会返回索引的。
               if(array[i]==search){
                return i;
               }
             }
             //如果没有找到，那么就直接返回-1，表示数组中没有这项，没有找到该值。
            return -1;
           }

        }
            //----------------------------------------------------------------------------------

        function unique(array){
          var i,resArray=[];
          for(i=0;i<array.length;i++){
            if(myindexof(resArray,array[i])==-1){
              //通过myindexof方法判断数组中是否已经有该值，==-1说明没有，那么我就追加进去。(去重)
              resArray.push(array[i]);
            }
          }
          return resArray;
        }

            //----------------------------------------------------------------------------------

            //正则表达式：判断这里的基本选择器。
         var rbselector=/^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

         function basicSelect(selector,node){
             node=node||document;
             var m,res,results=[];
             if(typeof selector!='string') return node;
             //首先判断传进来的字符串是否是字符串，如果不是，那么就返回node。
             m=rbselector.exec(selector);
             //然后截取字符串，实现正则的分组。
             if(m){
             //如果m匹配到了，那么进入下面的条件。
                if(m[1] && (res=document.getElementById(m[1]))){
             //这里是判断当为id时，并且不为空的时候
                    results.push(res);
                }else if(m[2]){
             //这里是判断为类名
                    push.apply(results,node.getElementsByClassName(m[2]));
                }else if(m[3]){
             //这里是判断所有的
                    push.apply(results,node.getElementsByTagName(m[3]));
                }else if(m[4]){
             //这里是判断标签选择器
                    push.apply(results,node.getElementsByTagName(m[4]));
                }
             }
             return results;
             //最后返回结果
         }


            //----------------------------------------------------------------------------------

            function select2(selector,results){
            results=results||[];
            var selectors=selector.split(' ');
            //首先用空格将后代选择器分隔开。
            var arr=[],node=[document];
            //创建一个中间变量，用来接收遍历到的结果，并且创建一个node数组，放入document。
           for(var i=0;i<selectors.length;i++){
            //循环总的次数
             for(var j=0;j<node.length;j++){
            //每次要去basicSelect看每个元素的基本选择器。
                arr.push.apply(arr,basicSelect(selectors[i],node[j]))
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

            //----------------------------------------------------------------------------------

        function select(selector,results){
            results=results||[];
            var m,tem,i,selectors,subselector;
            if(typeof selector!='string') return results;


            //首先将字符串通过逗号进行分割，得到一个数组。

            if(support.qsa){
                push.apply(results,document.querySelectorAll(selectors));

            }else{

            selectors=selector.split(',');

            for(i=0;i<selectors.length;i++){
              subselector=mytrim(selectors[i]);
              //这里调用mytrim方法，用来去除两边多余的空格。
             if(rbselector.test(selectors[i])){
                push.apply(results,basicSelect(subselector));
             }else{
                select2(subselector,results);
                }
              }
            }
            //这里是判断系统是否支持querySelectAll方法。

           return unique(results);
        }
        return select;
})()