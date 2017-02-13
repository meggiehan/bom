/**
 * Created by Administrator on 2016/11/16.
 */

var tpimg=document.getElementById("tpimg");
var wansi=document.getElementById("wansi");
var ul= document.getElementById("ul-a");
var lis=ul.children;
for(i=0;i<lis.length;i++){
    lis[i].style.backgroundImage="url(images/"+(i+1)+".jpg)";
}






$(function(){
//       for(i=0;i<lis.length;i++){
    $("#ul-a>li").mouseenter(function(){
        $(this).fadeTo(1000,0,function(){
            $(this).fadeTo(1000,1,function(){
                $(this).animate()
            })
        });
    })
})




$(document).ready(function(){
    $(".lastmore").click(function(){
        $(".sm").slideToggle(300);
        $(".xm").slideToggle(500);

        $(".sm").animate({right:585},"slow");
        $(".sm").animate({height:0},"slow");
        $(".sm").animate({width:2000},"slow");
        $(".sm").animate({right:0},"slow");
        $(".sm").animate({height:160},"slow");
        $(".sm").animate({width:280},"slow");
        $(".xm").animate({right:585},"slow");
        $(".xm").animate({height:0},"slow");
        $(".xm").animate({width:2000},"slow");
        $(".xm").animate({right:0},"slow");
        $(".xm").animate({height:160},"slow");
        $(".xm").animate({width:280},"slow");

        $(".ssm").slideToggle(300);
        $(".xxm").slideToggle(500);
        $(".ssm").animate({right:870},"slow");
        $(".ssm").animate({height:0},"slow");
        $(".ssm").animate({width:2000},"slow");
        $(".ssm").animate({right:295},"slow");
        $(".ssm").animate({height:160},"slow");
        $(".ssm").animate({width:280},"slow");
        $(".xxm").animate({right:870},"slow");
        $(".xxm").animate({height:0},"slow");
        $(".xxm").animate({width:2000},"slow");
        $(".xxm").animate({right:295},"slow");
        $(".xxm").animate({height:160},"slow");
        $(".xxm").animate({width:280},"slow");

        $(".sssm").slideToggle(300);
        $(".xxxm").slideToggle(500);
        $(".sssm").animate({left:0},"slow");
        $(".sssm").animate({height:0},"slow");
        $(".sssm").animate({width:0},"slow");
        $(".sssm").animate({left:585},"slow");
        $(".sssm").animate({height:160},"slow");
        $(".sssm").animate({width:280},"slow");
        $(".xxxm").animate({left:0},"slow");
        $(".xxxm").animate({height:0},"slow");
        $(".xxxm").animate({width:0},"slow");
        $(".xxxm").animate({left:585},"slow");
        $(".xxxm").animate({height:160},"slow");
        $(".xxxm").animate({width:280},"slow");

        $(".ssssm").slideToggle(300);
        $(".xxxxm").slideToggle(500);
        $(".ssssm").animate({left:295},"slow");
        $(".ssssm").animate({height:0},"slow");
        $(".ssssm").animate({width:0},"slow");
        $(".ssssm").animate({left:870},"slow");
        $(".ssssm").animate({height:160},"slow");
        $(".ssssm").animate({width:280},"slow");
        $(".xxxxm").animate({left:295},"slow");
        $(".xxxxm").animate({height:0},"slow");
        $(".xxxxm").animate({width:0},"slow");
        $(".xxxxm").animate({left:870},"slow");
        $(".xxxxm").animate({height:160},"slow");
        $(".xxxxm").animate({width:280},"slow");
    });
});


$(document).ready(function(){
    $("#ul-c li").mouseenter(function(){
        $(this).css("opacity",1).siblings("li").css("opacity",0.3);
    })
    $("#ul-c").mouseleave(function(){
        $(this).children("li").css("opacity",1);
    })
//               $("#ul-c li").click(function(){
////                   $(this).css("border","gray");
//                   $(this).css({
//                       "backgroundImage":"url(images/11.jpg)",
//                   });
//               })
})



