# Scroll.js

normalizes the dom scroll api for human consumption. it also adds helper methods that are useful when building anything based off the scroll api such as scroll bars

## Exsamples

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
	if( scroll.direction().vert == -1 ){
		//scrolling up, so do something fancy
	}
})

```



