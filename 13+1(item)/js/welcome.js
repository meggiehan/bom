window.onload=function(){
	banner();
}
function banner() {
	var banner=document.querySelector(".banner");
	var width=banner.offsetWidth;
	var iamgeBox=banner.querySelector("ul:nth-child(1)");
	var pointBox=banner.querySelector("ul:nth-child(2)");
	var points=pointBox.querySelectorAll("li");
	// var size=document.querySelector("html");
 //    var s=parseInt(size.style.fontSize);
	// 公用方法
	// 添加过渡
	var addTransition=function(){
		iamgeBox.style.webkitTransition="all .2s";
		iamgeBox.style.transition="all .2s";
	}
	// 删除过渡
	var removeTransition=function(){
		iamgeBox.style.webkitTransition="none";
		iamgeBox.style.transition="none";
	}
	// 设置过渡
	var setTransform=function(x){
		iamgeBox.style.webkitTransform="translateX("+x+"px)";
		iamgeBox.style.transform="translateX("+x+"px)";
	}
	var index=1;
	var timer=setInterval(function(){
        index++;
        addTransition();
        setTransform(-index*(width));
	},1500);

	iamgeBox.addEventListener("webkitTransitionEnd",function(){
		if(index>=4){
			index=1;
			removeTransition();
			setTransform(-index*(width));
		}
		else if(index<=0){
			index=3;
			addTransition();
			setTransform(-index*(width));
		}
		setpoint();
	})
    var setpoint=function(i){
    	for(i=0;i<points.length;i++){
    		points[i].className="";
    	}
    		points[index-1].className="now";
    }

// touch触摸事件
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;
   
   iamgeBox.addEventListener("touchstart",function(e){
   	  clearInterval(timer);
   	  startX=e.touches[0].clientX;
   })
   iamgeBox.addEventListener("touchmove",function(e){
   	  isMove=true;
   	  moveX=e.touches[0].clientX;
   	  distanceX=moveX-startX;
   	  console.log(distanceX);
   	  removeTransition();
   	  setTransform((-index*(width))+distanceX);
   })
   iamgeBox.addEventListener("touchend",function(e){
   
      if(Math.abs(distanceX)>(width/3) && isMove){
           if(distanceX>0){
           	index--;
           }
           else{
           	index++;
           }
            addTransition();
            setTransform(-index*width);
      }
      else{
      	addTransition();
      	setTransform(-index*(width));
      }
      startX=0;
      moveX=0;
      distanceX=0;
      isMove=false;

      clearInterval(timer);
      timer=setInterval(function(){
        index++;
        addTransition();
        setTransform(-index*(width));
      },1500)
   })
}