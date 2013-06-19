/*
 * scroll utills
 * 
 * useful methods for doing scrollable stuff in JavaScript
 * 
 * Jesse Baird <jebaird.com>
 * 
 * elem view port
 * isScrollable
 * page - scrolltop / left return into
 * isvisiable in view port
 * 
 * pixel ratio, usful for creating custom scrollbars
 * 
 * 
 * create object for tracking direction of scroll
 * 
 * 
 * namespace 
 * 
 * scrollz
 * 
 * use offsetWidth becuase it includes padding and border
 * 
 */
(function(){
	
//var $ = window.jQuery || window.jebaird || ( window.jebaird = {} ),
	
var scrollPrototype = {
	
	
	
	init: function( element ){
		console.dir( ScrollUtill )
		this.element = element;
	},
	
	
	//is element scrollable
	isVert: function(){
		var element = this.element;
		//true if can scroll
		return ( element.scrollHeight > element.offsetHeight );
	},
	isHorz: function(){
		var element = this.element;
		return ( element.scrollWidth > element.offsetWidth );
	},
	/*
	 * can the element scroll?
	 */
	scrollable: function( ){
        return ( this.isVert() || this.isHorz() ) ? true : false;
	},
	/*
	 * return the number of view ports that fit it
	 */
	
	pageCountVert: function(){
		return Math.ceil( this._getScrollDimension() / this.viewPort()[ 1 ] ) ;
	},	
	
	pageCountHorz: function(){
		//figure out how many "pages" are in the scrollable and devide that by 100 to get the height perenctage
       	return Math.ceil(  this.element.scrollHeight / this.viewPort()[ 0 ] ) ;
	},
	
	/*
	 * page up and down just return the scrollLeft / top of the next page
	 */
	pageUp: function(){
		return -this.viewPort()[ 1 ];
	},
	pageDown: function(){
		return this.viewPort()[ 1 ];
	},
	
	pageRight: function(){
		return this.viewPort()[ 0 ];
	},
	pageLeft: function(){
		return -this.viewPort()[ 0 ];
	},
        
    pixelRatioVert: function( compareElement ){
    	return this._pixelRatio( compareElement, 1 );
    },
    pixelRatioHorz: function( compareElement ){
    	return this._pixelRatio( compareElement, 0 );
    },    
	/*
	 * need horz and viert
	 * 
	 * compare the number of pix of element to the scrollable pix
	 * 
	 */
	_pixelRatio: function ( scrollbar, orentation ){
		var element = this.element,
			viewPort = this.viewPort();
		if( orentation == 1){
          		return (
          				( element.scrollHeight - viewPort[ 1 ] )
          				/
          				( viewPort[ 1 ] - scrollbar.clientHeight )
          		);
          	}else{
          		return (
          				( element.scrollWidth - viewPort[ 0 ] )
          				/
          				( viewPort[ 0 ] - scrollbar.clientWidth )
          		);
          	}
	},
	/*
	 * return an arry of the offsetWidth / height
	 */
	viewPort: function(){
		var element = this.element;
		return [ 
			element.offsetWidth,
			element.offsetHeight
		];
	},
	
	scrollVert: function( offset ){
		if( offset === undefined ){
			///return
		}
		
		//set
		
		/*
				 		 * firefox does scroll the body with target being body but chome does
				 		 */
 		if( appendTarget.tagName == 'BODY' ) {
			window.scroll( window.scrollX + scrollLeft, window.scrollY );
		} else {
			appendTarget.scrollLeft = scrollLeft;
		}
	},
	scrollHorz: function( offset ){
		if( offset === undefined ){
			///return
		}
		
		//set
	},
	
	_scrollPosition: function( orentation, offset ){
		/*
		 * 	//get the scrollbar position
        _getScrollPosition: function(){
        	var element = this.element[ 0 ];
        	return ( this._isVert() ) ? element.scrollTop : element.scrollLeft;
        },
        
		 */
	}
};


scrollUtill = function( element ){
	function F(){};
	F.prototype = scrollPrototype;
	
	var f = new F();
	f.init( element );
	return f;
}

scrollUtill._props = {
	'vert': {
		//height // width of the target element
		offset: 'offsetHeight',
		//where we are scrolling
		pos: 'scrollTop',
		//scroll content
		length: 'scrollHeight'
	},
	'horz': {
		offset: 'offsetWidth',
		pos: 'scrollLeft',
		length: 'scrollWidth'
		
	}
};
	
})();
