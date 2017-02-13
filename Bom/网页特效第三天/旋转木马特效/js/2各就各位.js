/**
 * Created by jf on 2016/7/28.
 */
window.onload = function () {

    var config = [
        {
            "width": 400,
            "top": 20,
            "left": 50,
            "opacity": 0.2,
            "zIndex": 2
        },//0
        {
            "width": 600,
            "top": 70,
            "left": 0,
            "opacity": 0.8,
            "zIndex": 3
        },//1
        {
            "width": 800,
            "top": 100,
            "left": 200,
            "opacity": 1,
            "zIndex": 4
        },//2
        {
            width: 600,
            top: 70,
            left: 600,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            "width": 400,
            "top": 20,
            "left": 750,
            "opacity": 0.2,
            "zIndex": 2
        }//4
    ];//其实就是一个配置单 规定了每张图片的大小位置层级透明度
    //找人
    var wrap = document.getElementById("wrap");
    var slide = document.getElementById("slide");
    var ul = slide.children[0];
    var lis = ul.children;

    var arrow = document.getElementById("arrow");
    //alert("加载成功");
    //鼠标经过盒子 让箭头 渐渐地 显示出来
    wrap.onmouseover = function () {
        animate(arrow, {"opacity": 1});
    };
    //离开盒子渐渐隐藏
    wrap.onmouseout = function () {
        animate(arrow, {"opacity": 0});
    };

    //让所有的li 按照配置单 渐渐地 各就各位
    for (var i = 0; i < lis.length; i++) {
        //
        animate(lis[i], config[i]);
    }

};