/*ҳ��������*/
window.onload = function(){
    deleteBox();
}
/*����Ч��*/
function deleteBox(){
    /*
    * 1.���ɾ����ť��ʱ��  ��������ɾ����
    * 2.���ɾ����ť��ʱ��  ɾ��������Ҫ��һ���򿪸��ӵĶ���
    * 3.���ȡ����ť��ʱ��  �رյ����� ɾ����ť�����رո���
    * */

    /*��ȡ������*/
    var win = document.querySelector('.jd_win');
    /*����*/
    var box = win.querySelector('.jd_win_box');
    /*���е�ɾ����ť*/
    var deleteList = document.querySelectorAll('.delete_box');

    var deleteBox = null;

    /*�󶨵���¼�*/
    for(var i  = 0 ; i < deleteList.length ; i ++){
        deleteList[i].onclick = function(e){
            /*1.���ɾ����ť��ʱ��  ��������ɾ����*/
            /*��ʾ������*/
            win.style.display = "block";
            /*�Ҷ���*/
            box.className = "jd_win_box bounceInDown";

            /*���Ƕ���*/
            deleteBox = this;
            /*�ҵ�����*/
            var deleteUp = deleteBox.querySelector('span:first-child');
            console.log(deleteUp);
            /*�ӹ���*/
            deleteUp.style.webkitTransition = "all 1s";
            deleteUp.style.transition = "all 1s";
            /*����ת*/
            deleteUp.style.webkitTransform = "rotate(-30deg) translateY(2px)";
            deleteUp.style.transform = "rotate(-30deg) translateY(2px)";
            /*������תԭ��*/
            deleteUp.style.webkitTransformOrigin = "0 5px";
            deleteUp.style.transformOrigin = "0 5px";
        }
    }

    /*��ȡ���¼�*/
    document.querySelector('.cancel').onclick = function(){
        /*3.���ȡ����ť��ʱ��  �رյ����� ɾ����ť�����رո���*/
        /*���ص�����*/
        win.style.display = "none";
        /*ɾ����ť�����رո���*/
       
        var deleteUp = deleteBox.querySelector('span:first-child');
        deleteUp.style.webkitTransform = "none";
        deleteUp.style.transform = "none";
        
    }
}