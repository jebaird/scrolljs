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
		//TODO: IMPLAMENT THIS
		scroll._props = {
			'vert': {
				//height // width of the target element
				offset: 'offsetHeight',
				//where we are scrolling
				scroll: 'scrollTop',
				//scroll content
				dim: 'scrollHeight'
			},
			//hoz
			'hoz': {
				offset: 'offsetWidth',
				scroll: 'scrollLeft',
				dim: 'scrollWidth'
			}
		};

		scroll.prototype = {

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

				/*
				 * firefox does scroll the body with target being body but chrome does
				 */
				if( element.tagName == 'BODY' ) {
					window.scroll( window[ scroll[ orentation ] ] + offset, scroll[ orentation ]  );
				} else {
					element[ props.scroll ] += offset;
				}
				
			},

			pixelRatioVert: function( compareElement ) {
				return this._pixelRatio( compareElement, 'vert' );
			},
			pixelRatioHoz: function( compareElement ) {
				return this._pixelRatio( compareElement, 'hoz' );
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
			
			}

		}

		scroll.prototype.init.prototype = scroll.prototype;

		return ( jebaird.scroll = scroll );

	})();

})();