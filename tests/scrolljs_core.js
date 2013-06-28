(function(){
module("jebaird.scroll: ", {
	setup: function(){
		this.yes = jebaird.scroll(document.getElementById('is-scrollable'));
		this.no = jebaird.scroll(document.getElementById('not-scrollable'));
	}
});


test("namespace", function(){

	ok(jebaird.scroll,'jebaird.scroll is accessable');
	
	ok(jebaird.scroll._props.vert,'has vert');
	ok(jebaird.scroll._props.horz,'has hoz');
	
	
});

test('core', function(){
	
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
	
	
	
});

test('px ratio', function(){
	var yes = this.yes,
		no = this.no,
		//scrollbar is just a elm to compare the px ratio with
		scrollbar = document.getElementById('scrollbar');
		
	ok( yes.pixelRatioVert( scrollbar ) )
	
	ok( yes.pixelRatioHoz( scrollbar ) )
		
});

test('viewport',function(){
	var viewPort = this.yes.viewPort();
	
	equals( viewPort.vert, this.yes.element.offsetWidth )
	equals( viewPort.hoz, this.yes.element.offsetHeight )
})


	
})();
