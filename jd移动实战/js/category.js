/**
 * Created by Administrator on 2016/12/8.
 */
window.onload=function(){
    leftSwipe();
    rightSwipe();
}
//左菜单
function leftSwipe(){
//    1.菜单滑动起来
//    2.当滑动到一定的距离的时候不能滑动  滑动区间
//    2.当触摸结束的时候 需要判断是否定位在区间内 否则吸附回去 定位回去
//    2.点击菜单的时候  改变当前的样式
//    2.点击菜单的时候  定位到当前的那个菜单到最顶部 如果不满足定位区间就不做定位

//    自己定义缓冲的距离

    //获取父容器
    var parentBox=document.querySelector(".jd_category_left");
    var childBox=parentBox.querySelector("ul");
    var parentHeight=parentBox.offsetHeight;
    var chileHeight=childBox.offsetHeight;

    //translateY 初始的定位 其实就是最大的定位
    var maxY=0;
    //translateY 滑动到最下面的定位 其实就是最小的定位 父容器的高度-子容器的高度。
    var minY=parentHeight-chileHeight;
    //自己定义的缓冲距离
    var distance=100;
    //最大的滑动距离
    var maxSwipe=maxY+100;
    //最小的滑动距离
    var minSwipe=minY-100;

    //1.让菜单滑动起来
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var isMove=false;

    //记录当前的定位 全局 相当于轮播图的index
    var cury=0;

    //公用方法
    var addTransition=function(){
        childBox.style.webkitTransition="all .2s";
        childBox.style.transition="all .2s";
    }
    var removeTransition=function(){
        childBox.style.webkitTransition="none";
        childBox.style.transition="none";
    }
    var setTranslateY=function(y){
        childBox.style.webkitTransform="translateY("+y+"px)";
        childBox.style.transform="translateY("+y+"px)";
    }
    //绑定事件
    childBox.addEventListener("touchstart",function(e){
        startY= e.touches[0].clientY;
    })
    childBox.addEventListener("touchmove",function(e){
        isMove=true;
        moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        console.log(distanceY);
        removeTransition();
        //第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间
        /*当前要做定位的位子需要在滑动区间内*/
        if((cury+distanceY)<maxSwipe && (cury+distanceY)>minSwipe){
            setTranslateY(cury+distanceY);
        }
    })
    window.addEventListener("touchend",function(e){
        if((cury+distanceY)>maxY){
            cury=maxY;
            addTransition();
            setTranslateY(cury);
        }
        else if((cury+distanceY)<minY){
            cury=minY;
            addTransition();
            setTranslateY(cury);
        }
        else{
            cury=cury+distanceY;
        }
    })
//绑定tap
    itcast.tap(childBox,function(e){
        //找到事件触发源  然后找到点击的那个li元素
        //console.log(e.target.parentNode);
        var lis=childBox.querySelectorAll("li");
        var li= e.target.parentNode;
        for(var i=0;i<lis.length;i++){
            lis[i].className=" ";
            lis[i].index=i;
        }
            li.className="now";
        var translateY=-li.index*50;
        if(translateY>minY){
            cury=translateY;
            addTransition();
            setTranslateY(cury);
        }
        else {
            cury=minY;
            addTransition();
            setTranslateY(cury);
        }
    })
}
//右侧内容
function rightSwipe(){
     itcast.iScroll({
         swipeDom:document.querySelector(".jd_category_right"),
         swipeType:"y",
         swipeDistance:100
     })
}