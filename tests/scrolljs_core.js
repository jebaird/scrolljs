(function(){
module("jebaird.scroll: ", {
	setup: function(){
		this.yes = jebaird.scroll(document.getElementById('is-scrollable'));
		this.no = jebaird.scroll(document.getElementById('not-scrollable'));
	}
});


test("namespace", function(){
	expect( 3 );
	ok(jebaird.scroll,'jebaird.scroll is accessable');
	
	ok(jebaird.scroll._props.vert,'has vert');
	ok(jebaird.scroll._props.hoz,'has hoz');
	
	
});

test('core', function(){
	expect( 9 );
	var yes = this.yes,
		no = this.no;
	
	
	equals( yes.scrollableVert(), true, 'scroll vert');
	equals( yes.scrollableHoz(), true, 'scroll vert');
	
	
	equals( no.scrollableVert(), false, 'scroll hoz');
	equals( no.scrollableHoz(), false, 'scroll hoz');
	
	equals( yes.scrollable(), true, 'both');
	
	//page count
	equals( yes.pageCountVert(), 3 );
	equals( yes.pageCountHoz(), 2 );
	
	
	equals( no.pageCountVert(), 1 );
	equals( no.pageCountHoz(), 1 );
	
	
});

test('changing scroll Top/Left', function(){
	expect( 7 );
	//todo: test on window
	var yes = this.yes,
		no = this.no;
	
	var viewPort = yes.viewPort();
	
	yes.pageDown();
	equals( yes.element.scrollTop, viewPort.vert, 'pagedown' );
	
	yes.pageRight();
	equals( yes.element.scrollLeft, viewPort.hoz, 'pageRight' );
	
	
	stop();
	
	setTimeout(function(){
		start();
		yes.pageUp();
		equals( yes.element.scrollTop, 0,'pageUP' );
		
		yes.pageLeft();
		equals( yes.element.scrollLeft, 0,'pageLeft' );
	},1500);
	
	

	var sbody = jebaird.scroll( document.body );
	
	document.body.style.width = '100px';
	sbody.scrollVert( 400 );
	equals( document.body.scrollTop, 400 )
	equals( sbody.scrollVert(), 400 );
	
	stop();
	setTimeout( function(){
		start();
		
		sbody.scrollVert( -400 );
		equals( document.body.scrollTop, 0 );
		document.body.style.width = 'auto';
		
	}, 2000)
	
	
	
	
});

test('px ratio', function(){
	expect( 2 );
	var yes = this.yes,
		no = this.no,
		//scrollbar is just a elm to compare the px ratio with
		scrollbar = document.getElementById('scrollbar');
		
	ok( yes.pixelRatioVert( scrollbar ) )
	
	ok( yes.pixelRatioHoz( scrollbar ) )
		
});

test('viewport',function(){
	expect( 2 );
	var viewPort = this.yes.viewPort();
	
	equals( viewPort.vert, this.yes.element.offsetWidth )
	equals( viewPort.hoz, this.yes.element.offsetHeight )
});


	
})();
