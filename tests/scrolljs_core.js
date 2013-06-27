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
	equals( yes.scrollableHorz(), true, 'scroll vert');
	
	
	equals( no.scrollableVert(), false, 'scroll hoz');
	equals( no.scrollableHorz(), false, 'scroll hoz');
	
	equals( yes.scrollable(), true, 'both');
	
	//page count
	equals( yes.pageCountVert(), 3 );
	equals( yes.pageCountHorz(), 2 );
	
	
	equals( no.pageCountVert(), 1 );
	equals( no.pageCountHorz(), 1 );
	
	
});

test('changing scroll Top/Left', function(){
	
	var yes = this.yes,
		no = this.no;
	
	var viewPort = yes.viewPort();
	
	yes.pageDown();
	equals( yes.element.scrollTop, viewPort[ 1 ],'pagedown' );
	
	yes.pageRight();
	equals( yes.element.scrollLeft, viewPort[ 0 ],'pageRight' );
	
	
	stop();
	
	setTimeout(function(){
		start();
		yes.pageUp();
		equals( yes.element.scrollTop, 0,'pageUP' );
		
		yes.pageLeft();
		equals( yes.element.scrollLeft, 0,'pageLeft' );
	},1500);
	
	
	
});
	
})();
