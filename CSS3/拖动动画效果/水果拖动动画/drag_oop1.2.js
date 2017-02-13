/**
 * Created by lenovo on 2016/7/24.
 */
function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){
    if(!this['aEvent'+type]){
        this['aEvent'+type]=[];
    }
    var ary=this['aEvent'+type];
    for (var i=0;i<ary.length;i++){
        if(ary[i]==fn){
            return;
        }
    }
    ary.push(fn);
    return this;
};
EventEmitter.prototype.run=function(type){
    var ary=this['aEvent'+type];
    if(ary&&ary.length){
        for (var i=0;i<ary.length;i++){
            if (typeof ary[i]==='function'){
                ary[i].apply(this,[].slice.call(arguments,1));
            }else {
                ary.splice(i,1);
                i--;
            }
        }
    }
};
EventEmitter.prototype.off=function(type,fn){
    var ary=this['aEvent'+type];
    if(ary&&ary.length){
        for (var i=0;i<ary.length;i++){
            if (ary[i]==fn){
                ary[i]=null;
                return;
            }
        }
    }
};
function Drag(curEle){
    this.curEle=curEle;
    this.x=null;
    this.y=null;
    this.mx=null;
    this.my=null;
    this.DOWN=processThis(this.down,this);
    this.MOVE=processThis(this.move,this);
    this.UP=processThis(this.up,this);
    on(this.curEle,'mousedown',this.DOWN);
}
Drag.prototype=new EventEmitter;
Drag.prototype.down=function(e){
    this.x=this.curEle.offsetLeft;
    this.y=this.curEle.offsetTop;
    this.mx= e.pageX;
    this.my= e.pageY;
    if (this.curEle.setCapture){
        this.curEle.setCapture();
        on(this.curEle,'mousemove',this.MOVE);
        on(this.curEle,'mouseup',this.UP);
    }else {
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    e.preventDefault();
    this.run('dragstart',e)
};
Drag.prototype.move=function(e){
    this.curEle.style.left=this.x+(e.pageX-this.mx)+'px';
    this.curEle.style.top=this.y+(e.pageY-this.my)+'px';
    this.run('dragging',e)
};
Drag.prototype.up=function(e){
    if (this.curEle.releaseCapture){
        this.curEle.releaseCapture();
        off(this.curEle,'mousemove',this.MOVE);
        off(this.curEle,'mouseup',this.UP);
    }else {
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    this.run('dragend',e)
};
Drag.prototype.range=function(oRange){
    this.oRange=oRange;
    this.on('dragging',this.addRange)
};
Drag.prototype.addRange=function(e){
    var oRange=this.oRange;
    var l=oRange.l,rr=oRange.r,t=oRange.t,b=oRange.b;
    var currentL=this.x+(e.pageX-this.mx);
    var currentT=this.y+(e.pageY-this.my);
    with(this.curEle.style){
        if(currentL<=l){
            left=l+'px';
        }else if(currentL>=rr){
            left=rr+'px';
        }else {
            left=currentL+'px';
        }
        if(currentT<=t){
            top=t+'px'
        }else if(currentT>=b){
            top=b+'px'
        }else {
            top=currentT+'px'
        }
    }
};
Drag.prototype.qunimei=function(){
    this.on('dragstart',this.addBorder);
    this.on('dragend',this.removeBorder)
};
Drag.prototype.addBorder=function(){
    this.curEle.style.border='2px dashed yellow'
};
Drag.prototype.removeBorder=function(){
    this.curEle.style.border='none'
};
