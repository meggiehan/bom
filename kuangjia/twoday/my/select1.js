/*
* @Author: Marte
* @Date:   2017-01-12 12:05:10
* @Last Modified by:   Marte
* @Last Modified time: 2017-01-12 14:53:12
*/

 var select=
(function(){
    //所有的正则表达式
      var support={};
      var rnative=/\{\s*\[native \w/;
      var rtrim=/^\s+|\s+$/g;
      var rbselector=/^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

    //能力检测部分
      support.getElementsByClassName=rnative.test(document.getElementsByClassName+'');
      support.qsa=rnative.test(document.querySelectorAll+'');
      support.trim=rnative.test(String.prototype.trim+'');
      support.indexOf=rnative.test(Array.prototype.indexOf+'');

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
            return str.trim;
          }else{
            return str.replace(rtrim,'');
          }
        }

//---------------------------------------------------------------------------------

        function myIndexOf(array,search,startIndex){
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
            var i=0,resArray;
            for(; i<array.length;i++){
                if(myIndexOf(resArray,array[i])==-1){
                    resArray.push(array[i]);
                }
            }
            return resArray;
        }

        //将select函数放在最后
        function select(selector,results){
            results=results||[];
            var m,temp,selectors,subselector;
            if(typeof selector!='string') return results;

            selectors=selector.split(',');

            if(support.qsa){
              results.push.apply(results,document.querySelectorAll(selectors));
              return results;
            }

            for(var i=0;i<selectors.length;i++){

            subselector=myTrim(selectors[i]);

            m=rbselector.exec(selectors[i]);
            if(m){
              if(m[1]&&(temp=document.getElementById(m[1]))){
                results.push(temp);
              }else if(m[2]){
                  results.push.apply(results,getByClassName(m[2]));
              }else if(m[3]){
                  results.push.apply(results,document.getElementsByTagName(m[3]));
              }else if(m[4]){
                  results.push.apply(results,document.getElementsByTagName(m[4]));
            }
          }

        }
            return unique(results);
      }
      //最后返回一个接口出去，以便外面来调用
return select;
})();