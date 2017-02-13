
 var select=
(function(){
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

//---------------------------------------------------------------------------------

        function myTrim(str){
          if(support.trim){
            return str.trim();
          }else{
            return str.replace(rtrim,'');
          }
        }

//---------------------------------------------------------------------------------

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

//---------------------------------------------------------------------------------

        function unique(array){
            var i=0,resArray=[];
            for(; i<array.length;i++){
                if(myIndexOf(resArray,array[i])==-1){
                    resArray.push(array[i]);
                }
            }
            return resArray;
        }

//---------------------------------------------------------------------------------

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

//---------------------------------------------------------------------------------

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

//---------------------------------------------------------------------------------

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
