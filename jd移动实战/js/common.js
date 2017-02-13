/**
 * Created by Administrator on 2016/12/6.
 */
window.itcast={};
itcast.TransitionEnd=function(dom,callback){
    if(dom && typeof dom=="object"){
        dom.addEventListener("webkitTransitionEnd",function(){
            callback && callback();
        })
        dom.addEventListener("transitionEnd",function(){
            callback && callback();
        })
    }
}
//��װtap
itcast.tap=function(dom,callback){
    //Ҫ��û�д���touchmove�¼�
    //������Ӧ�ٶȱ�click��
    if(dom && typeof dom=="object"){
        var isMove=false;
        var startTime=0;
        dom.addEventListener("touchstart",function(e){
            //console.log('touchstart');
            //console.time('tap');/*��¼tap����������ڵ�ʱ��*/
            startTime=Date.now();
        })
        dom.addEventListener("touchmove",function(e){
            //console.log('touchmove');
            isMove=true;
        })
        dom.addEventListener("touchend",function(e){
            //console.log('touchend');
            //console.timeEnd('tap')/*��ӡtap�������������һ�μ�¼��ʱ���ʱ��*/
            /*�ж�  �Ƿ�����tap ��Ҫ��  һ��Ҫ��tap����Ӧʱ��150*/
            if(!isMove && (Date.now()-startTime)<150){
                callback && callback(e);
            }
            /*���� ����*/
            isMove=false;
            startTime=0;
        })
    }
}