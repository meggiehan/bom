/**
 * Created by Administrator on 2016/12/9.
 */
window.onload=function(){
    deleteBox();
}

function deleteBox(){
    /*
     * 1.���ɾ����ť��ʱ��  ��������ɾ����
     * 2.���ɾ����ť��ʱ��  ɾ��������Ҫ��һ���򿪸��ӵĶ���
     * 3.���ȡ����ť��ʱ��  �رյ����� ɾ����ť�����رո���
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

            //�ӹ���
            var addTransition=function(){
                deleteUp.style.webkitTransition="all 1s";
                deleteUp.style.transition="all 1s";
            }
        //    ����ת
            var addTransform=function(){
                deleteUp.style.webkitTransform="rotate(-20deg) translateY(2px)";
                deleteUp.style.transform="rotate(-20deg) translateY(2px)";
            }
        //    ������ת��ԭ��
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

        //�Ƴ�λ��
        var removeTransform=function(){
            deleteUp.style.webkitTransform="none";
            deleteUp.style.transform="none";
        }
           win.style.display="none";
        var deleteUp=deleteBox.querySelector("span:first-child");
        removeTransform();


    }

}