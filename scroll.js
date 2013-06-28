/**
 * scroll.js
 * @author Jesse Baird <jebaird.com>
 *
 * scroll.js is a set of methods that normalizes the dom scroll api. 
 *
 * create object for tracking direction of scroll
 *
 */
(function() {
	
	var jebaird = window.jebaird || ( window.jebaird = {} );
	
	var clone = (function() {
			return function( obj ) {
				Clone.prototype = obj;
				return new Clone()
			};
			function Clone(){}
		}()); 
	var scroll = (function() {

		var scroll = function( element ) {
			return new scroll.prototype.init( element );
		};
		/*@static */
		scroll._props = {
			//vertical
			'vert': {
				/*
				 * default to offsetHeight / width over client height because it include padding and border
				 * seems to be the more common case
				 */
				offset: 'offsetHeight',
				//where we are scrolling
				scroll: 'scrollTop',
				//the dimensions of the scroll content
				dim: 'scrollHeight'
			},
			//horizontal
			'hoz': {
				offset: 'offsetWidth',
				scroll: 'scrollLeft',
				dim: 'scrollWidth'
			}
		};

		scroll.prototype = {
			/*
			 * @param
			 */
			init: function( element ) {
				if( !element ){
					throw new Error('jebarid.scroll element can\'t be null')
				}
				this.element = element;
				//props for this instance
				this._props = clone( scroll._props );
			},
			
			//is element scrollable
			scrollableVert: function() {
				return this._scrollable( 'vert' );
			},
			scrollableHoz: function() {
				return this._scrollable( 'hoz' );
			},
			/*
			 * can the element scroll?
			 */
			scrollable: function() {
				return ( this.scrollableVert() || this.scrollableHoz() ) ? true : false;
			},
			
			_scrollable: function( orentation ){
				var element = this.element,
					props = this._props[ orentation ];
				return element[ props.dim ] > element[ props.offset ];
			},
			/*
			 * return the number of view ports that fit it
			 */
			pageCountVert: function() {
				return this._pageCount( 'vert' );
			},
			//if we cant scroll this will return 1
			pageCountHoz: function() {
				
				return this._pageCount( 'hoz' );
			},
			
			_pageCount: function( orentation ){
				var dim = this._props[ orentation ].dim;
				return Math.ceil( this.element[ dim ] / this.viewPort()[ orentation ] );
			},
			/*
			 * paging dont change the scroll postion of the element
			 * call scrollVert, to chagne
			 */
			pageUp: function() {
				this.scrollVert( -this.viewPort()[ 'vert' ] );
			},
			pageDown: function() {
				this.scrollVert( this.viewPort()[ 'vert' ] );
			},

			pageRight: function() {
				this._scroll( this.viewPort()[ 'hoz' ], 'hoz' );
			},
			pageLeft: function() {
				this._scroll( -this.viewPort()[ 'hoz' ], 'hoz' );
			},
			
			scrollVert: function( offset ) {
				return this._scroll( offset, 'vert' );
			},
			scrollHoz: function( offset ) {
				return this._scroll( offset, 'hoz' );
			},
			_scroll: function( offset, orentation ){
				
				var element = this.element,
					props = this._props[ orentation ],
					scroll = {
						vert: 'scrollX',
						hoz: 'scrollY'
					};
				
				if( offset === undefined ) {
					///return
					return element[ props.scroll ];
				}

					element[ props.scroll ] += offset;
				
			},

			pixelRatioVert: function( compareElement ) {
				return this._pixelRatio( compareElement, 'vert' );
			},
			pixelRatioHoz: function( compareElement ) {
				return this._pixelRatio( compareElement, 'hoz' );
			},
			/*
			 * need hor and viert
			 *
			 * compare the number of pix of element to the scrollable pix
			 * //figure out how many "pages" are in the scrollable and devide that by 100 to get the height perenctage
			 *
			 */
			_pixelRatio: function( compareElement, orentation ) {
				var element = this.element, 
					viewPort = this.viewPort()[ orentation ],
					props = this._props[ orentation ];
					
					
				return (
					( element[ props.dim ] / viewPort ) / ( viewPort - compareElement[ props.offset ] )
				);
			
			},
			/*
			 * return an arry of the offsetWidth / height
			 */
			viewPort: function() {
				var element = this.element,
					prop = this._props;
				return {
					vert: element[ prop.vert.offset ],
					hoz: element[ prop.hoz.offset ],
				};
			}
			

		}

		scroll.prototype.init.prototype = scroll.prototype;

		return ( jebaird.scroll = scroll );

	})();

})();