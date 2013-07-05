# Scroll.js

Scrolljs aims to make it easy to detect if an element can be scrolled, get the current scroll position and provide 
utility methods that are commonly needed.

## Examples


```javascript
var target = jebaird.scroll( document.getElementById( 'target' ) );

if( target.scrollableVert() ){
	alert('we can scroll up and down' )
}

```

in event handlers, using jquery bind events

```javascript
var $target $('#target');
var scroll = jebaird.scroll( $target[ 0 ] );


target.bind('scroll', function(){
	var vert = scroll.direction().vert
	if(  vert == -1 ){
		//scrolling up, so do something fancy
	}else if( vert == 1 ){
		//scrolling down, do something extra snazzy
	}

});

```



