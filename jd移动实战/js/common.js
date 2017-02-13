/**
 * Created by Administrator on 2016/12/6.
 */
window.itcast={};
itcast.TransitionEnd=function(dom,callback){
    if(dom && typeof dom=="object"){
        dom.addEventListener("webkitTransitionEnd",function(){
            callback && callback();
        })
        dom.addEventListener("transitionEnd",function(){
            callback && callback();
        })
    }
}
//封装tap
itcast.tap=function(dom,callback){
    //要求：没有触发touchmove事件
    //并且响应速度比click快
    if(dom && typeof dom=="object"){
        var isMove=false;
        var startTime=0;
        dom.addEventListener("touchstart",function(e){
            //console.log('touchstart');
            //console.time('tap');/*记录tap这个参数现在的时间*/
            startTime=Date.now();
        })
        dom.addEventListener("touchmove",function(e){
            //console.log('touchmove');
            isMove=true;
        })
        dom.addEventListener("touchend",function(e){
            //console.log('touchend');
            //console.timeEnd('tap')/*打印tap这个参数距离上一次记录的时候的时间*/
            /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
            if(!isMove && (Date.now()-startTime)<150){
                callback && callback(e);
            }
            /*重置 参数*/
            isMove=false;
            startTime=0;
        })
    }
}