if ( (function(r){return (function(){try{new Ajax.Request(r,{});}catch(e){}})();})("/uuid") ) {
	var xT = function ( v, m, id ) {
		switch ( v ) {
			case 1:
				return '<li id="' + id + '" style="display: none;"><div class="group row" style="padding: 1em 20px 0;"><p id="subtitle"><strong>' + m + '</strong></p></div></li>';
			case 2:
				return '<li id="' + id + '" style="display: none;"><div class="group row"><div class="col-3"><pre><code><span style="color: #e3d796;">$</span> ' + m + '</code></pre></div></div></li>';
			case 3:
				if ( typeof m != "object" ) return this( 2, m ); return '<li id="' + id + '" style="display: none;"><div class="group row"><div class="col-1"><p><p id="subtitle"><strong>' + m[0] + '</strong></p></p></div><div class="col-2"><pre><code><span style="color: #e3d796;">$</span> ' + m[1] + '</code></pre></div></div></li>';
			default: return false;
		}
	};
	window.x = [], window.b = true;
	var A = function (x, id) {
		if ( $("p").innerHTML = ( x + $("p").innerHTML ) )
			return setTimeout( function () { return Effect.toggle( $(id), 'slide', { Duration: .375 }) }, 100 )/*.show()*/;
		else    return console.log(void 0);
	};
	var subscription = client.subscribe('/strg', function(message) {
		var ss; if ( message.type == "msg" )
			return A(xT(1, message.text, ss = Math.random()*Math.random()*1000000+""), ss);
		if ( message.type == "crt" )
			return A(xT(2, message.text, ss = Math.random()*Math.random()*1000000+""), ss);
		if ( message.type == "trc" )
			return A(xT(3, message.text, ss = Math.random()*Math.random()*1000000+""), ss);
		return console.log(message);
	});
}