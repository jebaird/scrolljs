/**
 * scroll.js
 * normalizes the dom scroll api for human consumption
 * @author Jesse Baird <jebaird.com>
 *
 * licensed under MIT https://github.com/jebaird/scrolljs/license.txt
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
			 * @param {object} element a dom element to create the instnace
			 */
			init: function( element ) {
				if( !element ){
					throw new Error('jebarid.scroll element can\'t be null')
				}
				this.element = element;
				//props for this instance
				this._props = clone( scroll._props );
			},
			
			/*
			 * can the element be scrolled vertical?
			 * @return {boolean}
			 */
			scrollableVert: function() {
				return this._scrollable( 'vert' );
			},
			/*
			 * can the element be scrolled horizontal?
			 * @return {boolean}
			 */
			scrollableHoz: function() {
				return this._scrollable( 'hoz' );
			},
			/*
			 * can the element be scrolled vertically or horizontally?
			 * @return { boolean }
			 */
			scrollable: function() {
				return ( this.scrollableVert() || this.scrollableHoz() ) ? true : false;
			},
			/*
			 * @private
			 * @param { string } orientation vert or hoz
			 * @return { boolean }
			 */
			_scrollable: function( orientation ){
				var element = this.element,
					props = this._props[ orientation ];
				return element[ props.dim ] > element[ props.offset ];
			},
			/*
			 * returns the number of vertical pages
			 * @return {int}
			 */
			pageCountVert: function() {
				return this._pageCount( 'vert' );
			},
			/* 
			 * returns the number of pages horizontally
			 * @return {int}
			 */
			pageCountHoz: function() {
				
				return this._pageCount( 'hoz' );
			},
			/*
			 * returns the number of "pages" that is element has
			 * pages are the number of viewports the element has to its props.scroll
			 * say you have an element that has a height of 100px and a scrollHeight of 300 
			 * this method would return 3
			 * 
			 * if the element isnt scrollable it returns 1
			 * 
			 * @param {string} orientation vert / hoz
			 * @return {int}
			 * 
			 */
			_pageCount: function( orientation ){
				var dim = this._props[ orientation ].dim;
				return Math.ceil( this.element[ dim ] / this.viewPort()[ orientation ] );
			},
			/*
			 * returns the current vertical page
			 * @return {int}
			 */
			pageCurrentVert: function(){
				return this._pageCurrent( 'vert' );
			},
			/*
			 * returns the current horizontal page
			 * @return {int}
			 */
			pageCurrentHoz: function(){
				return this._pageCurrent( 'horz' );
			},
			/*
			 * returns the current page that the scroll content is on
			 * 
			 * @param {string} orientation vert / hoz
			 * @return {int}
			 * 
			 */
			_pageCurrent: function( orientation ){
				var element = this.element,
					dim = this._props[ orientation ].dim,
					scroll = this._props[ orientation ].scroll;
					
				return  Math.ceil( this.element[ scroll ]  / this.viewPort()[ orientation ] ) + 1;
			},
			/*
			 * move the scroll position up one viewport
			 *
			 */
			pageUp: function() {
				this.scrollVert( -this.viewPort()[ 'vert' ] );
			},
			/*
			 * move the scroll position down one viewport
			 *
			 */
			pageDown: function() {
				this.scrollVert( this.viewPort()[ 'vert' ] );
			},
			/*
			 * move the scroll position right one viewport
			 *
			 */
			pageRight: function() {
				this._scroll( this.viewPort()[ 'hoz' ], 'hoz' );
			},
			/*
			 * move the scroll position left one viewport
			 *
			 */
			pageLeft: function() {
				this._scroll( -this.viewPort()[ 'hoz' ], 'hoz' );
			},
			/*
			 * @param {int} offset the number of px to add to the scroll position
			 * @return {mixed} if offset is undefined returns the scroll Position
			 */
			scrollVert: function( offset ) {
				return this._scroll( offset, 'vert' );
			},
			/*
			 * @param {int} offset the number of px to add to the scroll position
			 * @return {mixed} if offset is undefined returns the scroll Position
			 */
			scrollHoz: function( offset ) {
				return this._scroll( offset, 'hoz' );
			},
			/*
			 * @param {int} offset the number of px to add to the scroll position
			 * @param {string} orientation vert / hoz
			 * @return {mixed} if offset is undefined returns the scroll Position
			 */
			_scroll: function( offset, orientation ){
				
				var element = this.element,
					props = this._props[ orientation ]
				
				if( offset === undefined ) {
					///return
					return element[ props.scroll ];
				}

					element[ props.scroll ] += offset;
				
			},
			/*
			 * @param {object} compareElement a dom element
			 * @return {float}
			 */
			pixelRatioVert: function( compareElement ) {
				return this._pixelRatio( compareElement, 'vert' );
			},
			/*
			 * @param {object} compareElement a dom element
			 * @return {float}
			 */
			pixelRatioHoz: function( compareElement ) {
				return this._pixelRatio( compareElement, 'hoz' );
			},
			/*
			 * this method is very useful for building custom scrollbars
			 * it will figure out the number of px the compareElement will need to move when this.element.scrollTop/left
			 * changes.  
			 *
			 * @param {object} compareElement a dom elemetn to compare its dimensions with this.element
			 * @param {string} orientation vert / hoz
			 * @return {float}
			 */
			_pixelRatio: function( compareElement, orientation ) {
				var viewPort = this.viewPort()[ orientation ],
					props = this._props[ orientation ];
					
					
				return (
					( this.element[ props.dim ] - viewPort ) / ( viewPort - compareElement[ props.offset ] )
				);
			
			},
			/*
			 * get the the clientHeight / Width or as we call it the view port
			 * @return {object} { vert: 12, hoz: 100 }
			 */
			viewPort: function() {
				var element = this.element,
					props = this._props;
				return {
					vert: element[ props.vert.offset ],
					hoz: element[ props.hoz.offset ],
				};
			},
			/*
			 * figure out the direction the element is scrolling, useful for use in event handlers
			 * @return {object} an object that contains vert and hoz, 1 for scrolling down / right, -1 for up / left 
			 * 		and 0 for no change
			 */
			direction: function(){
				var element = this.element,
					props = this._props,
					types = [
						'vert',
						'hoz'
					],
					i = 1,
					//first time coll?
					prev = this._scrollCords || {
						'hoz': element.scrollLeft,
						'vert': element.scrollTop
					},
					// 0, 0 no change
					ret = {
						'hoz': 0,
						'vert': 0
					};
					
					while( i-- ){
						var type = types[ i ],
							currentScroll = element[ props[ type ].scroll ],
							prevScroll = prev[ type ];
							
							//scrolling down / right
						if( currentScroll > prevScroll ){
							ret[ type ] = 1;
							//scrolling up/left
						}else if( currentScroll < prevScroll ){
							ret[ type ] = -1
						}
					} 
					
					this._scrollCords = {
						'hoz': element.scrollLeft,
						'vert': element.scrollTop
					};
					
					return ret;
			}

		}

		scroll.prototype.init.prototype = scroll.prototype;

		return ( jebaird.scroll = scroll );

	})();

})();