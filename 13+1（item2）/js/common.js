window.itcast={};
itcast.TransitionEnd=function(dom,callback){
   if(dom && typeof dom=="object"){
       dom.addEventListener=function(webkitTransitionEnd,function(){
       	 	callback && callback();
       })
       dom.addEventListener=function(transitionEnd,function(){
       	    callback && callback();
       })
   }
}