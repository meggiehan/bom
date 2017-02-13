(function ( window, undefined ) {



function parseHTML ( html ) {
	var div = document.createElement( 'div' );
	div.innerHTML = html;
	var res = [];
	for ( var i = 0; i < div.childNodes.length; i++ ) {
		res.push( div.childNodes[ i ] );
	}
	return res;
}



function itcast ( html ) {

	return new itcast.fn.init( html );

}

itcast.fn = itcast.prototype = {

	constructor: itcast,

	length: 0,

	init: function ( html ) {
		[].push.apply( this, parseHTML( html ) );
	},

	appendTo: function ( dom ) {
		for ( var i = 0; i < this.length; i++ ) {
			dom.appendChild( this[ i ] );
		}

	}
}

itcast.fn.init.prototype = itcast.fn;







window.itcast = window.I = itcast;



})( window )



















