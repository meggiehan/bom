(function(window,undefined){
	
	var arr=[],
	    push = arr.push;
	    slice = arr.slice;

	try{
		var div = document.createElement("div");
		var test = [];
		div.innerHTML = "<p></p>";
		var p = div.getElementsByTagName("p");
		push.apply(test,p);
	}catch(e){
		push = {
			apply:function(arr1,arr2){
				for(var i =0;i<arr2.length;i++){
					arr1[arr1.length] = arr2[i];
				}
			}
		}
	}

	//框架的入口函数，客户想要使用框架的功能，可以使用该函数创建框架对象
	//例：  var obj =  itcast("<div>123</div>");
	//例：  var obj =  itcast("div p .c");
	function itcast(html){
		return new itcast.fn.init(html);
	}
	//给itcast.prototype设置一个别名itcast.fn
	itcast.fn = itcast.prototype = {
		constructor:itcast,
		length:0,
		selector:"",//记录选择器字符串
		type:"itcast",//所有的itcast对象都会有这个属性，这个属性用来区分itcast和其他对象
		init:function(html){
			//如果html是null或者空字符串。返回一个什么数据都没有的伪数组
			if(html==null || html=='')
			{
				return;
			}
			//如果html参数是一个函数类型的数据
			if( typeof html === 'function'){

			}
			//如果html参数是一个字符串类型的数据
			if( itcast.isString( html )  ){
				//如果是字符串类型，要分两种情况：A.html标签字符串，B.选择器字符串
				if(/^</.test(html) )
				{
					push.apply(this,parseHTML(html));
				}
				else
				{	//使用itcast的select引擎查询选择器字符串对应的元素
					//并将元素添加到this对象中去。
					push.apply(this,itcast.select(html));
					//将选择器字符串记录到selector属性中
					this.selector = html;
				}
			}

			//var o1 = itcast("div");    var o2 = itcast(o1);
			if( html.type === "itcast" )
			{	//将html对象中的成员添加到this中去
				push.apply(this , html);
				//将html对象的selector属性赋值给this对象
				this.selector = html.selector;
			}

			//用dom元素创建itcast对象
			if( itcast.isDom( html ) )
			{
				//虽然将html元素添加到了this对象中的第0个元素中，但是
				//this对象中不会有一个length属性记录元素的个数
				this[0] = html;
				//所以我们需要自己添加一个length属性记录元素的个数
				this.length = 1;
			}
			
		}
	}
	//让init构造函数的原型和itcast的原型一致,此时itcast的原型有什么,init的原型也会有什么。
	//那么itcast原型中的内容  init构造出来的对象就会继承
	itcast.fn.init.prototype = itcast.fn;

	//给itcast函数添加extend（混入）  ，给itcast.fn（原型）添加extend
	itcast.extend = itcast.fn.extend = function(obj){
		for(var k in obj){
			this[k] = obj[k];
		}
	}


	

//select引擎代码
var select = 
(function(){

	var support = {};
	var rnative = /\{\s*\[native/;
	var rtrim = /^\s+|\s+$/g;
	//只能匹配基本选择器的四种情况，其他的选择器匹配不了
	//                          1           2         3     4
	var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;


	support.qsa = rnative.test(document.querySelectorAll+"");
	support.getElementsByClassName  = rnative.test(document.getElementsByClassName +"");
	support.trim = rnative.test(String.prototype.trim +"");
	support.indexOf = rnative.test(Array.prototype.indexOf +"");

	


	//兼容的myTrim方法
	function myTrim( str )
	{
		if(support.trim){
			return str.trim();
		}
		else
		{	
			//把str字符串中符合正则表达式的内容替换成空字符串
			//即把str字符串中打头的空格和结尾的空格都替换为空字符串
			return str.replace( rtrim , '' );
		}
	}

	//兼容的indexOf方法
	function myIndexOf(array,search,startIndex)
	{
		startIndex = startIndex || 0;
		//如果系统支持indexOf方法就使用系统的indexOf方法进行搜素
		if(support.indexOf){
			return array.indexOf(search,startIndex);
		}
		//如果系统 不支持，就使用自己编写的代码进行元素搜索
		else
		{	//从startIndex下标开始搜索元素
			for(var i=startIndex;i<array.length;i++)
			{	//如果第i个元素和要搜索的元素一致
				if(array[i] === search)	
				{	//返回i下标
					return i;
				}
			}
			//否则返回-1，表示没有找到。
			return -1;
		}
	}

	//元素去重 
	function unique(array){
		var i,resArray=[];
		//循环array数组中的所有元素
		for(i=0;i<array.length;i++)
		{	//判断array数组中的第i个元素是否在新数组resArray中存在
			if( myIndexOf(resArray,array[i]) == -1)
			{	//如果不存在，就将第i个元素添加到新数组中去
				resArray.push(array[i]);
			} 
		}
		//返回新数组作为unique函数的结果。
		return resArray;
	}

	//兼容的getElementsByClassName处理方法
	function getByClassName ( className, node ) {
	      node = node || document;
	      var allElem, res = [], i;


	      if ( support.getElementsByClassName ) {
	        return node.getElementsByClassName( className );
	      } else {
	        allElem = node.getElementsByTagName( '*' );
	        for ( i = 0; i < allElem.length; i++ ) {
	          if ( allElem[ i ].className === className ) {
	            res.push( allElem[ i ] );
	          }
	        }
	        return res;
	      }
	 }
	//通过basicSelect函数可以查找基本选择器要查找的元素
	//1.selector:  "div",  node:document
	function basicSelect(selector,node){
		 var results = [],temp;
		 node = node || document;
		 //                          1           2         3     4
		var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;
		 //["div",undefined,undefined,undefined,"div"];
		 m = rbaseselector.exec( selector );
		  
		  if ( m ) {
		    // 捕获到数据了
		    if ( m[ 1 ] && ( temp = document.getElementById( m[ 1 ] ) ) ) {
		      results.push( temp );
		    } else if ( m[ 2 ] ) {
		      push.apply( results, getByClassName( m[ 2 ],node ) );
		    } else if ( m[ 3 ] ) {
		      push.apply( results, node.getElementsByTagName( m[ 3 ] ) ); // selector
		    } else if ( m[ 4 ] ) {
		      push.apply( results, node.getElementsByTagName( m[ 4 ] ) ); // selector
		    }
		  }

		  return unique(results);
	}

	//通过selector参数查找后代选择器元素，并返回结果数组
	//selector:"div p .c",  
	function select2(selector,results){
		results = results || [];
		//selector:"div p .c"
		var selectors = selector.split(" ");//["div","p",".c"];

		var arr = [],node = [document];
		//循环遍历所有的selectors元素
		for(var j=0;j<selectors.length;j++)//selectors[j] == ".c"
		{	//循环遍历node数组中的元素
			for(var i=0;i<node.length;i++){
				//通过getElementsByTagName获取到selectors[j]对应的元素
				//arr.push.apply(arr,node[i].getElementsByTagName(selectors[j])); 
				push.apply(arr,basicSelect(selectors[j],node[i])); 
			}
			//arr=页面中所有的div
			node = arr;
			arr = [] ;
		}

		return push.apply(results,node);

	}

	//select("div    ,  p   ,li");
	//基本选择器：select("div") ，select("#dv")，select(".cc"),select("*")
	//逗号选择器：select("div,.cc,#dv")
	//后代选择器：select("div p,span");
	//selector:"div p .c,div"
	function select(selector,results)
	{
		var i;
		results = results || [];
		//判断selector是不是一个字符串
		if(typeof selector != "string")
		{
			return results;
		}

		//判断系统是否支持querySelectorAll，如果支持，就直接使用它获取元素
		if(support.qsa){
			push.apply(results, document.querySelectorAll(selector) );
			return results;
		}
		else
		{	//selector:"div p .c,div"
			//只能匹配基本选择器的四种情况，其他的选择器匹配不了
			//                          1           2         3     4
			var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;
			//select("div p,span");   ,分隔成数组
			var selectors = selector.split(",");//["div p .c","div"];
			//循环遍历selectors数组中的所有元素
			for(i=0 ; i<selectors.length ; i++)
			{
				//定义一个subSelector变量保存去除了前后空格的selectors[i]
				var subSelector = myTrim(selectors[i]);
				//判断subSelector是基本选择器还是后代选择器
				if( rbaseselector.test(subSelector) )
				{
					push.apply(results,basicSelect(subSelector,document));
				}
				else
				{
					select2(subSelector,results);
				}
			}
		}

		//返回去除了重复的数组结果。
		return unique(results);
	}




	return select;
})();
//将select引擎设置为itcast的成员select
itcast.select = select;

//静态方法：添加到构造函数上，通过构造函数名来使用的方法
//实例方法：添加到原型，实例对象上的方法，通过实例对象调用的方法
//下面是一些工具方法
// itcast.isString = function(data){
// 	return typeof data === 'string';
// }
itcast.extend({
	isString : function(data){
		return typeof data === 'string';
	},
	isDom:function(data){
		if( data.nodeType )
			return true;

		return false;
	},
	prependChild: function ( parent, element ) {
	    parent.insertBefore( element, parent.firstChild );
	}
})


//静态方法实现each，map核心方法
itcast.extend({
	each:function(arr,func){
		var i;
		// 在 ES5 中还引入了 Array.isArray 的方法专门来判断数组
		if ( arr instanceof Array || arr.length >= 0) {
			for ( i = 0; i < arr.length; i++ ) {
				func.call( arr[ i ], i, arr[ i ] );
			}
		} else {
			for ( i in arr ) {
				func.call( arr[ i ], i, arr[ i ] );
			}
		}
		return arr;
	},
	map:function(arr,func){
		var i, res = [], tmp;
		if ( arr instanceof Array || arr.length >= 0 ) {
			for ( i = 0; i < arr.length; i++ ) {
				tmp = func( arr[ i ], i );
				if ( tmp != null ) {
					res.push( tmp );
				}
			}
		} else {
			for ( i in arr ){
				tmp = func( arr[ i ], i );
				if ( tmp != null ) {
					res.push( tmp );
				}
			}
		}
		return res;
	}
})

//下面是dom操作方法。
// itcast.fn.appendTo = function(dom){
// 	for(var i =0;i<this.length;i++){
// 		dom.appendChild(this[i]);
// 	}
// }、



//itcast对象的核心方法
itcast.fn.extend({
	//调用toArray方法返回dom元素数组
	// parseHTML : parseHTML,
	toArray:function(){
		// var res = [];
		// for(var i =0;i<this.length;i++){
		// 	res.push(this[i]);
		// }
		// return res;

		//this.slice(0);
		return slice.call(this,0);
	},
	//调用get方法返回第index个元素
	get:function(index){
		//如果index没有传递，那么返回整个元素数组
		if(index === undefined){
			return this.toArray();
		}

		return this[index];
	},
	//调用eq方法返回包含了对应index下标元素的itcast对象
	eq:function(index){
		var dom;
		//如果下标是正数，返回对应的元素
		if(index >= 0)
		{
			dom = this.get(index);
		}
		//下标是负数，返回倒数第几个元素
		else
		{
			dom = this.get( this.length + index );
		}
		//返回一个以dom元素做参数创建的itcast对象
		return itcast(dom);
	},
	//该方法可以使用func函数遍历itcast对象中的所有元素
	each:function(func){
		//调用静态方法each来遍历this对象中的所有元素
		return itcast.each(this,func);
	},
	//map方法可以使用func函数遍历itcast对象中的所有元素并映射形成一个新的数组
	map:function(func){
		return itcast.map(this,func);
	}
})

//DOM操作模块
function parseHTML ( html ) {
	var div = document.createElement( 'div' );
	div.innerHTML = html;
	var res = [];
	for ( var i = 0; i < div.childNodes.length; i++ ) {
		res.push( div.childNodes[ i ] );
	}
	return res;
}

itcast.fn.extend({
	//dom可能的情形：A.选择器字符串："div"   B.itcast对象   C.dom节点：document.body
	appendTo : function(dom){
		//使用dom作为参数创建一个itcast对象iObj
		var iObj = itcast( dom );
		// var iObj = this.constructor(dom);
		//创建一个没有元素的itcast对象
		var newObj = itcast();
		//将this对象中存储的所有dom元素添加iObj中的第j个元素里去。
		for(var i=0;i<this.length;i++)
		{	//使用j循环iObj的所有元素
			for(var j=0;j<iObj.length;j++)
			{	//将this[i]节点克隆出来一份，将克隆的节点添加到iObj的第j个元素中去
				var temp;
				if(j==0)
				{	//如果是j的第一次循环，就将本体添加到iObj[j]中
					temp = this[i];
				}
				else
				{	//如果不是j的第一次循环，就将克隆体添加过去。
					temp = this[i].cloneNode(true);
				}
				//将克隆体和本体都添加到newObj对象中
				push.call( newObj,temp );
				iObj[j].appendChild( temp );
			}
		}
		//返回包含了复制体和本体的newObj对象
		return newObj;
	},
	append:function(dom){
		itcast(dom).appendTo(this);
		return this;
	},
	prependTo: function ( selector ) {
    var iObj = this.constructor( selector );
    var newObj = this.constructor();
    for ( var i = 0; i < this.length; i++ ) {
      for ( var j = 0; j < iObj.length; j++ ) {
        var temp = 
            i == this.length - 1 && j == iObj.length - 1 
              ? this[ i ] 
              : this[ i ].cloneNode( true );

        push.call( newObj, temp );
        // iObj[ j ].appendChild( temp );
        itcast.prependChild( iObj[ j ], temp );
      }
    }
    return newObj;
  },
  prepend: function ( selector ) {
    this.constructor( selector ).prependTo( this );
    return this;
  }
})


	//对外公开一个可以访问itcast函数的接口
	window.itcast = window.I = itcast;
})(window);



// var j1 = $("div p .c");

// var j2 = $("<div></div>");

// var j3 = $(j1);

//链式编程
// $("div").css("width","200px").height("100px").click(function(){


// })


