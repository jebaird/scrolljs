(function(){
module("jebaird.scroll: core");


test("namespace", function(){

	ok(jebaird.scroll,'jebaird.scroll is accessable');
	
	ok(jebaird.scroll._props.vert,'has vert');
	ok(jebaird.scroll._props.horz,'has hoz');
	
	
});

test('core', function(){
	
	var yes = jebaird.scroll(document.getElementById('is-scrollable'));
	var no = jebaird.scroll(document.getElementById('not-scrollable'));
	
	equals( yes.isVert(), true, 'scroll vert');
	equals( yes.isHorz(), true, 'scroll vert');
	
	
	equals( no.isVert(), false, 'scroll hoz');
	equals( no.isHorz(), false, 'scroll hoz');
	
	equals( yes.scrollable(), true, 'both');
	
	//page count
	console.log(yes.pageCountHorz())
	equals( yes.pageCountVert(), 3 )
	equals( yes.pageCountHorz(), 2 )
	
	
	equals( no.pageCountVert(), 1 )
	equals( no.pageCountHorz(), 1 )
	
	
});
	
})();
