/*ҳ��������*/
window.onload = function(){
    search();
    banner();
    downTime();
}
/*ͷ����������*/
function search(){
    /*
    * 1.�ڹ�����Ļ��ʱ�����˵������Ļ��ʱ��  ������ɫ��Ҫ�任
    * 2.�ڹ����򻬶���һ���ľ����ʱ��  ��ɫ�������ı�
    * ��ɫ�任�ĳ̶�  ��  һ�����벻�ı�  ���Ǻ͹����ľ����й�ϵ
    * */
    /*��ȡ��������*/
    var searchBox = document.querySelector('.jd_header_box');
    /*��ȡ�ֲ�ͼ����*/
    var bannerBox = document.querySelector('.jd_banner');
    /*��ȡ�߶�*/
    var height = bannerBox.offsetHeight;
    /*���������¼�*/
    window.onscroll = function(){
        /*Ŀ���� ���ϵĹ۲쵱ǰ�����ľ����Ƿ񳬹����ֲ�ͼ�ľ���*/
        /*��ǰ�����ľ���*/
        var top = document.body.scrollTop;

        var opacity = 0;
        /*�����ǰ�����ľ������  �ֲ�ͼ�ĸ߶ȵ�ʱ�� ������ɫ�ĸı�*/
        if(top > height){
            opacity = 0.85;
        }
        /*��������ľ���С��  �ֲ�ͼ�ĸ߶ȵ�ʱ��  ���ݹ����ľ���͸߶ȵı���������ɫ�����*/
        else{
            opacity = 0.85 * (top/height);
        }

        /*����  �������ӵ�͸����*/
        searchBox.style.background = "rgba(201,21,35,"+opacity+")";
    }
}

/*�ֲ�ͼ*/
function banner(){
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
    /*��ӹ���*/
    var addTransition = function(){
        imageBox.style.webkitTransition = "all .2s";/*����*/
        imageBox.style.transition = "all .2s";
    }
    /*ɾ������*/
    var removeTransition = function(){
        imageBox.style.webkitTransition = "none";/*����*/
        imageBox.style.transition = "mone";
    }
    /*���ö�λ*/
    var setTranslateX = function(x){
        imageBox.style.webkitTransform = "translateX("+x+"px)";
        imageBox.style.transform = "translateX("+x+"px)";
    }

    /*�ڶ���*/
    /*1.�Զ����ֲ�*/
    /*��ǰĬ�ϵ�����*/
    var index = 1;
    /*���Ķ�ʱ��*/
    var timer = setInterval(function(){
        index ++ ;
        /*��ͼƬ�����Ĺ���  translateX  transition ��ʵ�ֶ���*/
        /*��imageBox���Ϲ���*/
        addTransition();
        /*��imageBox���õ�ǰ��λ�� */
        setTranslateX(-index*width);
    },3000);

    /*������*/
    /*�޷�Ĺ����ͻ���*/
    /*
    * ��������  ���Ƚ���   �жϵ�ǰ�� �ڼ���
    * ��������� 9  ��Ҫ˲�䶨λ��  ��һ��ͼƬ
    * ��������� 0  ��Ҫ˲�䶨λ��  �ڰ���ͼƬ
    * */
    /*ÿһ�ι��Ƚ������ᴥ�����  ���Ƚ���ʱ��*/
    itcast.transitionEnd(imageBox,function(){
        if(index >= 9){
            index = 1;
            /*˲�䶨λ*/
            /*ȥ������*/
            removeTransition();
            /*����λ*/
            setTranslateX(-index*width);
        }else if(index <= 0){
            index = 8;
            /*˲�䶨λ*/
            /*ȥ������*/
            removeTransition();
            /*����λ*/
            setTranslateX(-index*width);
        }
        /*���õ�ǰ�ĵ�*/
        setPoint();
    });

    /*���Ĳ�*/
    /*2.������ͼƬ�ֲ����ı�  ��Ӧ�ϵ�ǰ��ͼƬ��λ��*/
    var setPoint = function(i){
        /*ȥ����ǰ��ʽ*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
        }
        /*����ֵ 0-9 */
        /*����Ҫ�ж�index ��0 9��ʱ�� */
        /*���� �������õ��  ʱ���������ڶ���������ʱ������*/
        /*���ǵ�index�Ѿ����ù���*/
        /*û�б�Ҫ �����ù���index  1-8 */
        points[index-1].className = "now";
    }

    /*���岽*/
    /*3.ͼƬ�����ܻ���*/
    /*��ʼ��x����*/
    var startX = 0;
    /*�ƶ���ʱ���X������*/
    var moveX = 0;
    /*�ƶ�����*/
    var distanceX = 0;
    /*�ж��Ƿ񻬶���*/
    var isMove = false;
    /*���¼�*/
    imageBox.addEventListener('touchstart',function(e){
        /*�����ʱ��*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        console.log(distanceX);
        /*�ڻ�����ʱ�򲻶ϵĸ�ͼƬ��������λ  ���ﵽ������Ч��*/
        /*��λ��λ��  ��ǰ��ͼƬ�Ķ�λ  ���� �ƶ��ľ���*/
        /*�������*/
        removeTransition();
        /*���õ�ǰ�Ķ�λ*/
        setTranslateX(-index*width+distanceX);
    });
    //�ڹȸ��ģ���������  һ���������  touchend��ʱ����ܻᶪʧ�¼�
    window.addEventListener('touchend',function(e){
        /*������*/
        /*
         * 4.��������ʱ�򲻳���һ���ľ����ʱ��  ������ȥ
         * 5.�������ľ��볬����һ���ľ����ʱ��  ͼƬ����Ӧ�Ĺ���  �����
         * һ���ľ���  ����1/3��ͼƬ�Ŀ��
        * */
        if(Math.abs(distanceX) > (width/3) && isMove){
            /*��ô�ж���һ�Ż�����һ��
            * ��ͨ��distanceX��ֵ���ж�
            * */
            if(distanceX>0){
                index --;
            }else{
                index ++;
            }
            /*�����Ķ�λ��ȥ ��ǰ��index*/
            addTransition();
            setTranslateX(-index*width);
        }else{
            /*�����Ķ�λ��ȥ ��ʵ����������ȥ*/
            addTransition();
            setTranslateX(-index*width);
        }

        /*���ò���  ��ֹ�ڶ��ε�ʱ��Ӱ�����*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*���϶�ʱ��*/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++ ;
            /*��ͼƬ�����Ĺ���  translateX  transition ��ʵ�ֶ���*/
            /*��imageBox���Ϲ���*/
            addTransition();
            /*��imageBox���õ�ǰ��λ�� */
            setTranslateX(-index*width);
        },3000);
    });
}

/*����ʱ*/
function downTime(){
    /*
    * 1.�õ���Ҫ����ʱ��ʱ��  ���ǹ̶�������  5 Сʱ 04 59 59
    * 2.ÿ��һ����  ����  ��ǰ��  ʱ��  ��ʽ
    * 3.��Ⱦ��ҳ�浱��
    * */

    /*����ʱ��ʱ��*/
    var time = 3 * 60 * 60;

    /*��ȡdomԪ��*/
    var skTime = document.querySelector('.sk_time');
    /*���е�span*/
    var spans = skTime.querySelectorAll('span');

    /*��ʱ��*/
    var timer = setInterval(function(){
        time -- ;
        if(time<0){
            clearInterval(timer);
            return false;
        }
        /*��ʽ��ʱ��  �õ�  ʱ  ��  ��*/
        var h = Math.floor(time/3600);
        var m = Math.floor((time%3600)/60);
        var s = time%60;
        /*��Ⱦ*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    },1000);

}