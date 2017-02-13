/**
 * Created by Administrator on 2016/12/11.
 */
window.onload=function(){
    banner();
    initTabs();
    $('[data-toggle="tooltip"]').tooltip()
}

var myData;
function banner(){
    $(function(){
        var getData=function(callback){
            if(myData){
                callback && callback(myData);
                return false;
            }
            $.ajax({
                url:"js/index.json",
                data:{},
                type:"get",
                dataType:"json",
                success:function(data){
                    myData=data;
                    callback && callback(myData);
                }
            })
        }

        var renderHtml=function(){
            getData(function(data){
                var width=$(window).width();
                var isMobile=false;
                if(width<768){
                    isMobile=true;
                }
                var templatepoint= _.template($("#template_point").html());
                var templateimg= _.template($("#template_item").html());

                var pointHtml=templatepoint({model:data});
                var imgData={
                    list:data,
                    isMobile:isMobile
                }
                var imgHtml=templateimg({model:imgData});

                //console.log(pointHtml);
                //console.log(imgHtml);

                $(".carousel-indicators").html(pointHtml);
                $(".carousel-inner").html(imgHtml);
            })
        }
        //renderHtml();
        $(window).on('resize',function(){
            renderHtml();
        }).trigger('resize');

        var startX=0;
        var moveX=0;
        var distanceX=0;
        var isMove=false;

        $(".wjs_banner").on("touchstart",function(e){
            startX= e.originalEvent.touches[0].clientX;
        })
        $(".wjs_banner").on("touchmove",function(e){
            moveX= e.originalEvent.touches[0].clientX;
            distanceX=moveX-startX;
            isMove=true;
            console.log(distanceX);
        })
        $(".wjs_banner").on("touchend",function(e){
           if(Math.abs(distanceX)>50 && isMove){
               if(distanceX<0){
                   $(".carousel").carousel("next");
               }
               else{
                   $(".carousel").carousel("prev");
               }
           }
        })
    })
}
function initTabs(){
       var ul=$(".wjs_product .nav-tabs");
       var lis=ul.find("li");
       var width=0;

    $.each(lis,function(i,o){
        width+=$(o).innerWidth();
    })
    ul.width(width);
    itcast.iScroll({
        swipeDom:$(".wjs_product_tabsParent").get(0),
        swipeType:"x",
        swipeDistance:50
    })
}