/**
 * Created by Administrator on 2016/12/9.
 */
window.onload=function(){
    deleteBox();
}

function deleteBox(){
    /*
     * 1.点击删除按钮的时候  动画弹出删除框
     * 2.点击删除按钮的时候  删除盒子需要做一个打开盖子的动画
     * 3.点击取消按钮的时候  关闭弹出框 删除按钮动画关闭盖子
     * */
    var win=document.querySelector(".jd_win");
    var box=win.querySelector(".jd_win_box");
    var deleteList=document.querySelectorAll(".deleteBox");
    var deleteBox=null;

    for(var i=0; i<deleteList.length;i++){
        deleteList[i].onclick=function(e){
            win.style.display="block";
            box.className="jd_win_box bounceInDown";

            deleteBox=this;
            var deleteUp=deleteBox.querySelector("span:first-child");

            //加过渡
            var addTransition=function(){
                deleteUp.style.webkitTransition="all 1s";
                deleteUp.style.transition="all 1s";
            }
        //    加旋转
            var addTransform=function(){
                deleteUp.style.webkitTransform="rotate(-20deg) translateY(2px)";
                deleteUp.style.transform="rotate(-20deg) translateY(2px)";
            }
        //    设置旋转的原点
            var addSetorigin=function(){
                deleteUp.style.webkitTransformOrigin="0 5px";
                deleteUp.style.transformOrigin="0 5px";
            }
            addTransition();
            addTransform();
            addSetorigin();
        }
    }

    document.querySelector(".cancel").onclick=function(){

        //移除位移
        var removeTransform=function(){
            deleteUp.style.webkitTransform="none";
            deleteUp.style.transform="none";
        }
           win.style.display="none";
        var deleteUp=deleteBox.querySelector("span:first-child");
        removeTransform();


    }

}