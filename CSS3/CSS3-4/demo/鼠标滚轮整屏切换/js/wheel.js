(function(){
    function addWheel(ele,fn){
        function fnWheel(e){
            e=e||window.event;
            var bOk=false;
            if(e.wheelDelta){
                bOk= e.wheelDelta<0?true:false;
            }else{
                bOk= e.detail>0?true:false;
            }
            fn&&fn.call(ele,bOk);
            e.preventDefault?e.preventDefault(): e.returnValue=false;
        }
        if(navigator.userAgent.toLowerCase().indexOf('firefox') !==-1){
            ele.addEventListener('DOMMouseScroll',fnWheel,false);
        }else{
            ele.onmousewheel=fnWheel;
        }
    }
    window.wheel=addWheel;
})();