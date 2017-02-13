/**
 * Created by Administrator on 2016/10/31.
 */

/**
 * �����Եķ�װ
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    if (typeof element.innerText === "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}
/**
 * �����Ե�����
 * @param element
 * @param content
 */
function setInnerText(element,content) {
    if (typeof element.innerText === "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}
//��װ
/**
 * ��ȡ��һ���ֵ�Ԫ�صļ��ݷ���
 * @param element
 * @returns {*}
 */
function getpreviousElement(element) {
    if (element.previousElementSibling) {//���ҵ�
        return element.previousElementSibling;
    } else {
        var perv = element.previousSibling;//��һ���ֵܽڵ�
        //���next��������Ҫ�� �ͷ��� �������������Ҫ�� ��һֱ��
        while (perv && perv.nodeType !== 1) {//�� ���� ��������Ҫ��
            perv = perv.nextSibling;
        }
        return perv;
    }
}


//��װ
/**
 *  ��ȡ��һ���ֵ�Ԫ�صļ��ݷ���
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {//���ҵ�
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;//��һ���ֵܽڵ�
        //���next��������Ҫ�� �ͷ��� �������������Ҫ�� ��һֱ��
        while (next && next.nodeType !== 1) {//�� ���� ��������Ҫ��
            next = next.nextSibling;
        }
        return next;
    }
}
//��װ
/**
 * ȫѡ����ѡ���ͷ�ѡ
 * @param element
 * @param inputs
 * @param bool
 */
function fnchecked(element,inputs,bool){
    element.onclick=function(){
        for(var i=0;i<inputs.length;i++){
            if(typeof bool==="boolean"){
                inputs[i].checked=bool;
            }
            else{
                inputs[i].checked=!inputs[i].checked;
            }
        }
    }
}

//��װ
/**
 *  ��ȡ��ǰԪ�صĵ�һ����Ԫ��
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var el = element.firstChild;//��һ���ӽڵ�
        while (el && 1 !== el.nodeType) {
            el = el.nextSibling;//������
        }
        return el;
    }
}
//��װ
/**
 * ��ȡ��ǰԪ�ص����һ����Ԫ��
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var el = element.lastChild;
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;//��һ���ֵܽڵ�
        }
        return el;
    }
}
//��װ
/**
 * ����ȫ��ѡ���Լ�����ѡ�񣬸ı�Ԫ�ص�λ�á�
 * @param sour
 * @param dest
 * @param isMoveAll
 */
function move(sour,dest,isMoveAll){
    var options=sour.children;
    for(i=0;i<options.length;i++){
        var option=options[i];
        if(isMoveAll || option.selected){
            dest.appendChild(option);
            i--;
        }
    }

}

//��װ
/**
 * ͨ��id��ȡԪ�صĺ���
 * @param id
 * @returns {Element}
 */
function $(id) {//�β�            //ʵ��
    return document.getElementById(id);//������ｫid���߼���˫���ţ���ô�͵���д�̶��ˡ��Ͳ��ܽ��е����ˡ�
}
/**
 * ���ٱ������鲢�������
 */
arr.forEach(function(element,index,array){
    console.log(element);
})

/**
 * ��һ�������ڵ�ֵ��ĳ�ַָ����ָ���
 * @param arr
 * @param sep
 * @returns {*}
 */
function join(arr, sep) {//sep��ʾ�ָ�������ʽ����"-","/","|"�ȡ�
    var str = arr[0];
    for (var i = 1; i < arr.length; i++) {
        str = str + sep + arr[i];
    }
    return str;
}
/**
 * ��װ�����ַ�����Ĺ̶��ַ����ֵ�λ�á�
 * @type {number}
 */
var num = -1;
function findStr(str, x) {
    num = str.indexOf(x, num + 1);
    if (num !== -1) {
        console.log(num);
        findStr(str, x);
    }
}
findStr(str,x);

/**
 * ��װ��һ����ǩ�ж��������ʱ���滻ָ�������ķ���
 * @param element
 * @param oldStr
 * @param newStr
 */
function replaceClassName(element, oldStr, newStr) {
    //����������ַ������տո�ָ� ������ÿһ������ ���ж� ������û������
    var arr = element.className.split(" ");
    //console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === oldStr) {
            arr[i] = newStr;
        }
    }
    //console.log(arr);
    element.className = arr.join(" ");
}
//��װͨ��������ȡԪ�ض���ļ��ݷ�����
/**
 * ����һ������������ָ��������������������ʾ��
 * @param element
 * @param className
 * @returns {*}
 */
function getElementsByClassName(element, className) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        //�ҵ����еı�ǩ �ж��Ƿ���������� �оͷŵ�������
        var filterArr = [];
        var elements = element.getElementsByTagName("*");
        for (var i = 0; i < elements.length; i++) {
            var nameArr = elements[i].className.split(" ");
            for (var j = 0; j < nameArr.length; j++) {
                if (nameArr[j] === className) {
                    filterArr.push(elements[i]);
                    break;
                }
            }
        }
        return filterArr;
    }
}

//��װ
/**
 * addLoadEvent����ҳ��󶨼��غ�ִ���¼�
 * @param fn
 */
function addLoadEvent(fn){
    var oldLoad = window.onload;
    if(typeof(oldLoad) === "function"){
        oldLoad();
        fn();
    }else{
        window.onload = fn;
    }
}

//��װ
/**
 * �����ֲ�ͼ���Ҳ��ŵĺ�����װ��
 * @param obj
 * @param target
 */
function animateys(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = leader < target ? step : -step;
        if (Math.abs(target - leader) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 15);
}


/**
 * �� ������� �ƶ��� ָ��λ��,���������ķ�װ��
 * @param obj
 * @param target
 */
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style.left = leader + "px";
        if (leader === target) {
            clearInterval(obj.timer);
        }
    }, 15);
}

/**
 * ��װ�����С�����ı���¼�
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

/**
 * ��װ�Լ���scroll()�����¼�������Ĵ�С
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * ��װ����������С����һ���ֵ�����ҷ���ֵ��index��
 * @param arr
 */
function getMin(arr) {
    var min = {};
    min.index = 0;//��Сֵ������
    min.value = arr[min.index];//��Сֵ��ֵ
    //�������� һ��һ���Ƚ�
    for (var i = 0; i < arr.length; i++) {
        if (min.value > arr[i]) {
            min.value = arr[i];
            min.index = i;
        }
    }
    return min;
}