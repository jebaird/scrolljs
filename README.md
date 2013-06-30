# Scroll.js

scroll.js normalizes the dom scroll api for human consumption. It also contains helper methods that are useful when building anything based off the scroll api such as scroll bars.

## Examples

very simple

```javascript
var scroll = jebaird.scroll( document.getElementById( 'target' ) );

if( scroll.scrollableVert() ){
	alert('we can scroll up and down' )
}

```

in event handlers, using jquery bind events

```javascript
var target $('#target');
var scroll = jebaird.scroll( target[ 0 ] );


target.bind('scroll', function(){
	var vert = scroll.direction().vert
	if(  vert == -1 ){
		//scrolling up, so do something fancy
	}else if( vert == 1 ){
		//scrolling down, do something extra snazzy
	}

});

```



