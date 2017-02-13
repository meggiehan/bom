/**
 * Created by Administrator on 2016/12/5.
 */

window.onload=function(){
    search();
    banner();
    downTime();
}
/*头部搜索功能*/
function search(){
    //获得搜索的盒子
    var searchBox=document.querySelector(".jd_header_box");
//获得轮播图的盒子
    var bannerBox=document.querySelector(".jd_banner");
//获取轮播图的高度
    var height=bannerBox.offsetHeight;
//监听滚动事件
    window.onscroll=function(){
//得到当前滚动的距离，判断是否大于了轮播图的高度，如果大于了轮播图的高度，不做颜色的改变，
// 如果小于了轮播图的高度，根据滚动的距离和高度的比例来计算颜色的深度。
        var top=document.body.scrollTop;
        var opacity=0;
        if(top>=height){
            opacity=0.85;
        }
        else{
            opacity=0.85*(top/height);
        }
        //最后把效果设置给盒子，即盒子设置透明度。
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }
}

/*轮播图*/
function banner() {
    /*
     * 1.自动的轮播
     * 2.点随着图片轮播做改变  对应上当前的图片的位子
     * 3.图片盒子能滑动
     * 4.当滑动的时候不超过一定的距离的时候  吸附回去
     * 5.当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左或右
     * 一定的距离  就是1/3的图片的宽度
     * */

    /*第一步*/
    /*需要操作的dom*/
    /*轮播图大盒子*/
    var banner = document.querySelector('.jd_banner');
    /*图片的宽度  或者说  轮播图大盒子的宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    /*公用方法*/
    //添加过度
    var addTransition=function(){
        imageBox.style.webkitTransition="all .2s";
        imageBox.style.transition="all .2s";
    }
    //设置过渡
    var setTranslateX=function(x){
        imageBox.style.webkitTransform="translateX("+x+"px)";
        imageBox.style.transform="translateX("+x+"px)";
    }
    //删除过渡
    var removeTransition=function(){
        imageBox.style.webkitTransition="none";
        imageBox.style.transition="none";
    }
    //第二步
    //1.自动的轮播
    //当前默认的索引
    var index=1;
    //核心定时器
    var timer=setInterval(function(){
        index++;
        //让图片动画的滚动translateX transition来实现动画
        //给imageBox加上过渡
        addTransition();
        //给imageBox设置当前的位置
        setTranslateX(-index*width);
    },1000)
    //第三步
    //无缝滚动和滑动
    /*
     * 动画结束  过度结束   判断当前是 第几张
     * 如果索引是 9  需要瞬间定位到  第一张图片
     * 如果索引是 0  需要瞬间定位到  第八张图片
     * */
    /*每一次过度结束都会触发这个  过度结束时间*/
    itcast.TransitionEnd(imageBox,function(){
        if(index>=9){
            //瞬间定位
            index=1;
            //去除过渡
            removeTransition();
            //设置位置
            setTranslateX(-index*width);
        }
        else if(index<=0){
            //瞬间定位
            index=8;
            //去除过渡
            removeTransition();
            //设置定位
            setTranslateX(-index*width);
        }
        //设置当前的点对应轮播图
        setPoint();
    })
    //第四步
    //点随着图片的轮播做改变，对应上当前的图片的相应位置。
    var setPoint=function(i){
        for(i=0;i<points.length;i++){
            //去除当前的样式
            points[i].className="";
        }
        /*索引值 0-9 */
        /*又需要判断index 是0 9的时候 */
        /*但是 我们设置点的  时候我们是在动画结束的时候设置*/
        /*我们的index已经重置过了*/
        /*没有必要 被重置过的index  1-8 */
        points[index-1].className="now";
    }
    //第五步
//    3.图片的盒子能够滑动
//    开始的X坐标
    var startX=0;
//    移动的X坐标
    var moveX=0;
//    移动的距离
    var distanceX=0;
//    判断是否移动过
    var isMove=false;
    imageBox.addEventListener("touchstart",function(e){
        clearInterval(timer);
        startX= e.touches[0].clientX;
    })
    imageBox.addEventListener("touchmove",function(e){
        isMove=true;
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        /*在滑动的时候不断的给图片盒子做定位  来达到滑动的效果*/
        /*定位的位置  当前的图片的定位  加上 移动的距离*/
        /*清除过度*/
        console.log(distanceX);
        removeTransition();
        /*设置当前的定位*/
        setTranslateX(-index*width+distanceX);
    })
    //在谷歌的模拟器会出现一个问题,就是touchend的时候可能会丢失事件
    window.addEventListener("touchend",function(e){
        /*第六步*/
        /*
         * 4.当滑动的时候不超过一定的距离的时候  吸附回去
         * 5.当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左或右
         * 一定的距离  就是1/3的图片的宽度
         * */
        if(Math.abs(distanceX)>(width/3) && isMove){
            /*怎么判断上一张还是下一张
             * 是通过distanceX的正负值来判断
             * */
              if(distanceX>0){
                  index--;
              }
            else{
                  index++;
              }
            /*动画的定位回去 当前的index*/
            addTransition();
            setTranslateX(-index*width);
        }
        else{
            /*动画的定位回去 其实就是吸附回去*/
            addTransition();
            setTranslateX(-index*width);
        }
        /*重置参数  防止第二次的时候影响计算*/
       startX=0;
       moveX=0;
       distanceX=0;
       isMove=false;

        /*加上定时器*/
        clearInterval(timer);
         timer=setInterval(function(){
            index++;
             /*让图片动画的滚动  translateX  transition 来实现动画*/
             /*给imageBox加上过度*/
            addTransition();
            setTranslateX(-index*width);
        },1000)
    })
}
//倒计时
function downTime(){
    /*
     * 1.得到需要倒计时的时间  这是固定定死的  5 小时 04 59 59
     * 2.每隔一秒来  计算  当前的  时间  格式
     * 3.渲染在页面当中
     * */
    //倒计时的时间
    var time=3*60*60;
//    获取dom的元素
    var skTime=document.querySelector(".sk_time");
    /*所有的span*/
    var spans=skTime.querySelectorAll("span");
//    设置定时器
    var timer=setInterval(function(){
        time--;
        if(time<0){
            clearInterval(timer);
            return false;
        }
        /*格式化时间  得到  时  分  秒*/
        var h=Math.floor(time/3600);
        var m=Math.floor((time%3600)/60);
        var s=time%60;

        /*渲染*/
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;

        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;

        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000)

}

