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
( function() {
	
	var jebaird = window.jebaird || ( window.jebaird = {} );

	var scroll = (function() {

		var scroll = function( element ) {
			return new scroll.prototype.init( element );
		};

		scroll._props = {
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

		scroll.prototype = {

			init: function( element ) {
				if( !element ){
					throw new Error('jebarid.scroll element can\'t be null')
				}
				this.element = element;
			},

			//is element scrollable
			scrollableVert: function() {
				var element = this.element;
				//true if can scroll
				return ( element.scrollHeight > element.offsetHeight );
			},
			scrollableHorz: function() {
				var element = this.element;
				return ( element.scrollWidth > element.offsetWidth );
			},
			/*
			 * can the element scroll?
			 */
			scrollable: function() {
				return ( this.scrollableVert() || this.scrollableHorz() ) ? true : false;
			},
			/*
			 * return the number of view ports that fit it
			 */

			pageCountVert: function() {
				return Math.ceil( this.element.scrollHeight / this.viewPort()[ 1 ] );
			},
			//if we cant scroll this will return 1
			pageCountHorz: function() {
				//figure out how many "pages" are in the scrollable and devide that by 100 to get the height perenctage
				return Math.ceil( this.element.scrollWidth / this.viewPort()[ 0 ] );
			},

			/*
			 * paging dont change the scroll postion of the element
			 * call scrollVert, to chagne
			 */
			pageUp: function() {
				this.element.scrollTop+=-this.viewPort()[ 1 ];
			},
			pageDown: function() {
				this.element.scrollTop+=this.viewPort()[ 1 ];
			},

			pageRight: function() {
				this.element.scrollLeft += this.viewPort()[ 0 ];
			},
			pageLeft: function() {
				this.element.scrollLeft += -this.viewPort()[ 0 ]
			},
			
			scrollVert: function( offset ) {
				var element = this.element;
				
				if( offset === undefined ) {
					///return
					return element.scrollLeft;
				}

				/*
				 * firefox does scroll the body with target being body but chrome does
				 */
				if( element.tagName == 'BODY' ) {
					window.scroll( window.scrollY + offset, window.scrollY );
				} else {
					element.scrollTop += offset;
				}
			},
			scrollHorz: function( offset ) {
				var element = this.element;
				
				if( offset === undefined ) {
					///return
					return element.scrollLeft;
				}

				/*
				 * firefox does scroll the body with target being body but chrome does
				 */
				if( element.tagName == 'BODY' ) {
					window.scroll( window.scrollX + offset, window.scrollX );
				} else {
					element.scrollLeft += offset;
				}
			},

			pixelRatioVert: function( compareElement ) {
				return this._pixelRatio( compareElement, 1 );
			},
			pixelRatioHorz: function( compareElement ) {
				return this._pixelRatio( compareElement, 0 );
			},
			/*
			 * need horz and viert
			 *
			 * compare the number of pix of element to the scrollable pix
			 *
			 */
			_pixelRatio: function( scrollbar, orentation ) {
				var element = this.element, 
					viewPort = this.viewPort();
					
				if( orentation == 1 ) {
					return ( ( element.scrollHeight - viewPort[ 1 ] ) / ( viewPort[ 1 ] - scrollbar.clientHeight )
					);
				} else {
					return ( ( element.scrollWidth - viewPort[ 0 ] ) / ( viewPort[ 0 ] - scrollbar.clientWidth )
					);
				}
			},
			/*
			 * return an arry of the offsetWidth / height
			 */
			viewPort: function() {
				var element = this.element;
				return [ element.offsetWidth, element.offsetHeight ];
			},

			_scrollPosition: function( orentation, offset ) {
				/*
				 * 	//get the scrollbar position
				 _getscrollPosition: function(){
				 var element = this.element[ 0 ];
				 return ( this._isVert() ) ? element.scrollTop : element.scrollLeft;
				 },

				 */
			}
		}

		scroll.prototype.init.prototype = scroll.prototype;

		return ( jebaird.scroll = scroll );

	})();

})();
