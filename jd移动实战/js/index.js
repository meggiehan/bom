/**
 * Created by Administrator on 2016/12/5.
 */

window.onload=function(){
    search();
    banner();
    downTime();
}
/*ͷ����������*/
function search(){
    //��������ĺ���
    var searchBox=document.querySelector(".jd_header_box");
//����ֲ�ͼ�ĺ���
    var bannerBox=document.querySelector(".jd_banner");
//��ȡ�ֲ�ͼ�ĸ߶�
    var height=bannerBox.offsetHeight;
//���������¼�
    window.onscroll=function(){
//�õ���ǰ�����ľ��룬�ж��Ƿ�������ֲ�ͼ�ĸ߶ȣ�����������ֲ�ͼ�ĸ߶ȣ�������ɫ�ĸı䣬
// ���С�����ֲ�ͼ�ĸ߶ȣ����ݹ����ľ���͸߶ȵı�����������ɫ����ȡ�
        var top=document.body.scrollTop;
        var opacity=0;
        if(top>=height){
            opacity=0.85;
        }
        else{
            opacity=0.85*(top/height);
        }
        //����Ч�����ø����ӣ�����������͸���ȡ�
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }
}

/*�ֲ�ͼ*/
function banner() {
    /*
     * 1.�Զ����ֲ�
     * 2.������ͼƬ�ֲ����ı�  ��Ӧ�ϵ�ǰ��ͼƬ��λ��
     * 3.ͼƬ�����ܻ���
     * 4.��������ʱ�򲻳���һ���ľ����ʱ��  ������ȥ
     * 5.�������ľ��볬����һ���ľ����ʱ��  ͼƬ����Ӧ�Ĺ���  �����
     * һ���ľ���  ����1/3��ͼƬ�Ŀ��
     * */

    /*��һ��*/
    /*��Ҫ������dom*/
    /*�ֲ�ͼ�����*/
    var banner = document.querySelector('.jd_banner');
    /*ͼƬ�Ŀ��  ����˵  �ֲ�ͼ����ӵĿ��*/
    var width = banner.offsetWidth;
    /*ͼƬ����*/
    var imageBox = banner.querySelector('ul:first-child');
    /*�����*/
    var pointBox = banner.querySelector('ul:last-child');
    /*���еĵ�*/
    var points = pointBox.querySelectorAll('li');

    /*���÷���*/
    //��ӹ���
    var addTransition=function(){
        imageBox.style.webkitTransition="all .2s";
        imageBox.style.transition="all .2s";
    }
    //���ù���
    var setTranslateX=function(x){
        imageBox.style.webkitTransform="translateX("+x+"px)";
        imageBox.style.transform="translateX("+x+"px)";
    }
    //ɾ������
    var removeTransition=function(){
        imageBox.style.webkitTransition="none";
        imageBox.style.transition="none";
    }
    //�ڶ���
    //1.�Զ����ֲ�
    //��ǰĬ�ϵ�����
    var index=1;
    //���Ķ�ʱ��
    var timer=setInterval(function(){
        index++;
        //��ͼƬ�����Ĺ���translateX transition��ʵ�ֶ���
        //��imageBox���Ϲ���
        addTransition();
        //��imageBox���õ�ǰ��λ��
        setTranslateX(-index*width);
    },1000)
    //������
    //�޷�����ͻ���
    /*
     * ��������  ���Ƚ���   �жϵ�ǰ�� �ڼ���
     * ��������� 9  ��Ҫ˲�䶨λ��  ��һ��ͼƬ
     * ��������� 0  ��Ҫ˲�䶨λ��  �ڰ���ͼƬ
     * */
    /*ÿһ�ι��Ƚ������ᴥ�����  ���Ƚ���ʱ��*/
    itcast.TransitionEnd(imageBox,function(){
        if(index>=9){
            //˲�䶨λ
            index=1;
            //ȥ������
            removeTransition();
            //����λ��
            setTranslateX(-index*width);
        }
        else if(index<=0){
            //˲�䶨λ
            index=8;
            //ȥ������
            removeTransition();
            //���ö�λ
            setTranslateX(-index*width);
        }
        //���õ�ǰ�ĵ��Ӧ�ֲ�ͼ
        setPoint();
    })
    //���Ĳ�
    //������ͼƬ���ֲ����ı䣬��Ӧ�ϵ�ǰ��ͼƬ����Ӧλ�á�
    var setPoint=function(i){
        for(i=0;i<points.length;i++){
            //ȥ����ǰ����ʽ
            points[i].className="";
        }
        /*����ֵ 0-9 */
        /*����Ҫ�ж�index ��0 9��ʱ�� */
        /*���� �������õ��  ʱ���������ڶ���������ʱ������*/
        /*���ǵ�index�Ѿ����ù���*/
        /*û�б�Ҫ �����ù���index  1-8 */
        points[index-1].className="now";
    }
    //���岽
//    3.ͼƬ�ĺ����ܹ�����
//    ��ʼ��X����
    var startX=0;
//    �ƶ���X����
    var moveX=0;
//    �ƶ��ľ���
    var distanceX=0;
//    �ж��Ƿ��ƶ���
    var isMove=false;
    imageBox.addEventListener("touchstart",function(e){
        clearInterval(timer);
        startX= e.touches[0].clientX;
    })
    imageBox.addEventListener("touchmove",function(e){
        isMove=true;
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        /*�ڻ�����ʱ�򲻶ϵĸ�ͼƬ��������λ  ���ﵽ������Ч��*/
        /*��λ��λ��  ��ǰ��ͼƬ�Ķ�λ  ���� �ƶ��ľ���*/
        /*�������*/
        console.log(distanceX);
        removeTransition();
        /*���õ�ǰ�Ķ�λ*/
        setTranslateX(-index*width+distanceX);
    })
    //�ڹȸ��ģ���������һ������,����touchend��ʱ����ܻᶪʧ�¼�
    window.addEventListener("touchend",function(e){
        /*������*/
        /*
         * 4.��������ʱ�򲻳���һ���ľ����ʱ��  ������ȥ
         * 5.�������ľ��볬����һ���ľ����ʱ��  ͼƬ����Ӧ�Ĺ���  �����
         * һ���ľ���  ����1/3��ͼƬ�Ŀ��
         * */
        if(Math.abs(distanceX)>(width/3) && isMove){
            /*��ô�ж���һ�Ż�����һ��
             * ��ͨ��distanceX������ֵ���ж�
             * */
              if(distanceX>0){
                  index--;
              }
            else{
                  index++;
              }
            /*�����Ķ�λ��ȥ ��ǰ��index*/
            addTransition();
            setTranslateX(-index*width);
        }
        else{
            /*�����Ķ�λ��ȥ ��ʵ����������ȥ*/
            addTransition();
            setTranslateX(-index*width);
        }
        /*���ò���  ��ֹ�ڶ��ε�ʱ��Ӱ�����*/
       startX=0;
       moveX=0;
       distanceX=0;
       isMove=false;

        /*���϶�ʱ��*/
        clearInterval(timer);
         timer=setInterval(function(){
            index++;
             /*��ͼƬ�����Ĺ���  translateX  transition ��ʵ�ֶ���*/
             /*��imageBox���Ϲ���*/
            addTransition();
            setTranslateX(-index*width);
        },1000)
    })
}
//����ʱ
function downTime(){
    /*
     * 1.�õ���Ҫ����ʱ��ʱ��  ���ǹ̶�������  5 Сʱ 04 59 59
     * 2.ÿ��һ����  ����  ��ǰ��  ʱ��  ��ʽ
     * 3.��Ⱦ��ҳ�浱��
     * */
    //����ʱ��ʱ��
    var time=3*60*60;
//    ��ȡdom��Ԫ��
    var skTime=document.querySelector(".sk_time");
    /*���е�span*/
    var spans=skTime.querySelectorAll("span");
//    ���ö�ʱ��
    var timer=setInterval(function(){
        time--;
        if(time<0){
            clearInterval(timer);
            return false;
        }
        /*��ʽ��ʱ��  �õ�  ʱ  ��  ��*/
        var h=Math.floor(time/3600);
        var m=Math.floor((time%3600)/60);
        var s=time%60;

        /*��Ⱦ*/
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;

        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;

        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000)

}

