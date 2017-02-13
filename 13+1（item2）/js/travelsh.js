/**
 * Created by Administrator on 2016/12/13.
 */
window.onload=function(){
    banner();
}

//ÂÖ²¥Í¼
function banner(){
    var banner=document.querySelector('.banner');
    var width=banner.offsetWidth;
    var imageBox=banner.querySelector('ul:first-child');
    var pointBox=banner.querySelector('ul:last-child');
    var points=pointBox.querySelectorAll('li');

    //Ìí¼Ó¹ý¶É
    addTransition=function(){
        imageBox.style.webkitTransition="all .2s";
        imageBox.style.transition="all .2s";
    }
    //É¾³ý¹ý¶É
    removeTransition=function(){
        imageBox.style.webkitTransition="none";
        imageBox.style.transition="none";
    }
    //ÉèÖÃÎ»ÖÃ
   addTransform=function(x){
       imageBox.style.webkitTransform="translateX("+x+"px)";
       imageBox.style.transform="translateX("+x+"px)";
   }
    var index=1;
    var timer=setInterval(function(){
          index++;
        addTransition();
        addTransform(-index*width);
    },1000)

    imageBox.addEventListener("webkitTransitionEnd",function(){
        if(index>=6){
            index=1;
            removeTransition();
            addTransform(-index*width);
        }
        else if(index<=0){
            index=5;
            removeTransition();
            addTransform(-index*width);
        }
        setPoint();
    })
    var setPoint=function(i){
        for(i=0;i<points.length;i++){
            points[i].className=' ';
        }
        points[index-1].className='now';
    }

    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;

    imageBox.addEventListener("touchstart",function(e){
        clearInterval(timer);
        startX=e.touches[0].clientX;
    })
    imageBox.addEventListener("touchmove",function(e){
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        isMove=true;
        removeTransition();
        addTransform(-index*width+distanceX);
    })
    window.addEventListener("touchend",function(e){
        if(Math.abs(distanceX)>(width/3) && isMove){
            if(distanceX>0){
                index--;
            }
            else{
                index++;
            }
            addTransition();
            addTransform(-index*width);
        }
        addTransition();
        addTransform(-index*width);
    })

    startX=0;
    moveX=0;
    distanceX=0;
    isMove=false;

    clearInterval(timer);
    timer=setInterval(function(){
            index++;
            addTransition();
            addTransform(-index*width);
    },1000)
}