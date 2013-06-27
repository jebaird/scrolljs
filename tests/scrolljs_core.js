
(function(){
module("jebaird.scroll: core");

test("namespace", function(){

	ok(jebaird.scroll,'jebaird.scroll is accessable');
	
	ok(jebaird.scroll._props.vert,'has vert');
	ok(jebaird.scroll._props.horz,'has hoz');
	
	
});

test('vertical', function(){
	
	var s = jebaird.scroll(document.getElementById('target'));
	
	
});
	
})();
