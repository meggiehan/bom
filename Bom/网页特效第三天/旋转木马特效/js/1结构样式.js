/**
 * Created by jf on 2016/7/28.
 */
window.onload = function () {
    //找人
    var wrap = document.getElementById("wrap");
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
};