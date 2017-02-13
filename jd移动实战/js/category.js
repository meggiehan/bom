/**
 * Created by Administrator on 2016/12/8.
 */
window.onload=function(){
    leftSwipe();
    rightSwipe();
}
//��˵�
function leftSwipe(){
//    1.�˵���������
//    2.��������һ���ľ����ʱ���ܻ���  ��������
//    2.������������ʱ�� ��Ҫ�ж��Ƿ�λ�������� ����������ȥ ��λ��ȥ
//    2.����˵���ʱ��  �ı䵱ǰ����ʽ
//    2.����˵���ʱ��  ��λ����ǰ���Ǹ��˵������ ��������㶨λ����Ͳ�����λ

//    �Լ����建��ľ���

    //��ȡ������
    var parentBox=document.querySelector(".jd_category_left");
    var childBox=parentBox.querySelector("ul");
    var parentHeight=parentBox.offsetHeight;
    var chileHeight=childBox.offsetHeight;

    //translateY ��ʼ�Ķ�λ ��ʵ�������Ķ�λ
    var maxY=0;
    //translateY ������������Ķ�λ ��ʵ������С�Ķ�λ �������ĸ߶�-�������ĸ߶ȡ�
    var minY=parentHeight-chileHeight;
    //�Լ�����Ļ������
    var distance=100;
    //���Ļ�������
    var maxSwipe=maxY+100;
    //��С�Ļ�������
    var minSwipe=minY-100;

    //1.�ò˵���������
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var isMove=false;

    //��¼��ǰ�Ķ�λ ȫ�� �൱���ֲ�ͼ��index
    var cury=0;

    //���÷���
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
    //���¼�
    childBox.addEventListener("touchstart",function(e){
        startY= e.touches[0].clientY;
    })
    childBox.addEventListener("touchmove",function(e){
        isMove=true;
        moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        console.log(distanceY);
        removeTransition();
        //�ڶ��� 2.��������һ���ľ����ʱ���ܻ���  ��������
        /*��ǰҪ����λ��λ����Ҫ�ڻ���������*/
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
//��tap
    itcast.tap(childBox,function(e){
        //�ҵ��¼�����Դ  Ȼ���ҵ�������Ǹ�liԪ��
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
//�Ҳ�����
function rightSwipe(){
     itcast.iScroll({
         swipeDom:document.querySelector(".jd_category_right"),
         swipeType:"y",
         swipeDistance:100
     })
}