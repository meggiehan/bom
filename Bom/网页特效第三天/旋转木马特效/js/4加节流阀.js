/**
 * Created by jf on 2016/7/28.
 */
window.onload = function () {
    var flag = true;//表示节流阀是打开的

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
    var arrLeft = document.getElementById("arrLeft");
    var arrRight = document.getElementById("arrRight");
    //alert("加载成功");
    //鼠标经过盒子 让箭头 渐渐地 显示出来
    wrap.onmouseover = function () {
        animate(arrow, {"opacity": 1});
    };
    //离开盒子渐渐隐藏
    wrap.onmouseout = function () {
        animate(arrow, {"opacity": 0});
    };

    function assign() {
        //让所有的li 按照配置单 渐渐地 各就各位
        for (var i = 0; i < lis.length; i++) {
            //
            animate(lis[i], config[i], function () {
                flag = true;//动画执行完成后 让falg为true 打开节流阀
            });
        }
    }
    assign();
    //3.点击箭头 实现旋转
    //点击右箭头 让配置单 把最前的放到最后
    arrRight.onclick = function () {
        if (flag) {//如果节流阀是打开的 才能执行动画
            flag = false;//只要执行了 就把节流阀先关闭
            //arr.push(arr.shift());
            config.push(config.shift());
            //然后还要让每一个li 根据新生成的配置单 重新从当前位置跑到新的位置
            assign();
        }
    };
    arrLeft.onclick = function () {
        //把最后的元素放到最前
        //arr.unshift(arr.pop());
        config.unshift(config.pop());
        assign();
    };

    //4.节流阀 点击箭头后就不能再点击了 当前动画执行完成后 才能再点击
    //节流阀是为了节约性能的，是希望不要一点击就执行，而是等动画加载完成之后才能继续执行，

};