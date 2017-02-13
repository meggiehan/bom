/*
* @Author: Marte
* @Date:   2017-01-12 11:14:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-01-12 11:19:37
*/

var select=
(function(){
 var support={};
        var rnative=/\{\s*\[native \w/;

        support.getElementsByClassName=rnative.test(document.getElementsByClassName+'');
        support.qsa=rnative.test(document.querySelectorAll+'');


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

        var rbselector=/^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

        function select(selector,results){
            results=results||[];
            var m,temp;
            if(typeof selector!='string') return results;

            m=rbselector.exec(selector);

            if(support.qsa){
              results.push.apply(results,document.querySelectorAll(selector));
              return results;
            }

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
            return results;
        }
return select;
})();