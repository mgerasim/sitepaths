/**
*	 v1.0
*
*	template todo, finish closure call impelementation: me.closureCall('functionName', 2), inserts data and $this in closure's arguments
**/
	
var jQuery,
	PLUGIN_NAME = 'observerEffect';
(function ($) {

	// Define console if it isn't (for older browsers)
	if (typeof console === "undefined") {
		this.console = {log: function () {}};
	}

	/**
	*	 Major property <code>me</code> holds plugin properties that are set at runtime
	**/
	var me = {
		},
	
	/**
	*	 Major property <code>settings</code> holds plugin properties that are set before runtime
	**/
		settings = {
			visibleCheckIntervalDur: 180
		},
	/**
	*	 Major property <code>meta</code> holds descriptive information about this plugin
	**/
		meta = {
			name: 'observerEffect',
			dataName: 'observerEffectData',
			author: 'Ashley Coleman',
			version: 'a1.0',
			templateVersion: 'a1.1',
			requiredOptions: []
		},
		
		
 
	/**
	*
	**/
		methods = {
			/* FUNCTION */
			init : function (options) {
				return this.each(function () {											
					var data = $.extend(data, me, settings, options, {meta:meta});
					if (typeof options == 'undefined') 		throw meta.name+': no options passed';
					data.$cherryImgHolder = $('.cherry-img-holder', $(this));
					
					$(this).data(meta.name+'Data', data);  
					data.methods.pluginStart(data, $(this));
				});
			},
			pluginStart: function (data, $this) {	
				 
				$this.visibleCheckInterval = window.setInterval( function () {
					var isVisible = data.methods.checkVisible($this[0]);
					data.methods.setVisible(data, $this, isVisible);
				},
				data.visibleCheckIntervalDur);
				//foreach data.requiredOptions 
				//if (typeof data['prop'] != 'object') throw meta.name+': options has no "classes" property of type "object"(array)';
			},
			checkVisible: function (elem) {
			    var docViewTop = $(window).scrollTop();
			    var docViewBottom = docViewTop + $(window).height();

			    var elemTop = $(elem).offset().top;
			    var elemBottom = elemTop + $(elem).height();

			    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
			      && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
			},
			
			
			setVisible: function (data, $this, val) {
				if (data._isVisible !== val) {
					data._isVisible = val;
					if (data._isVisible) {
						data.methods.doEffects(data, $this, data.onScrolledInToView || data.methods.onScrolledInToView);
					} else {
						data.methods.doEffects(data, $this, data.onScrolledOutOfView || data.methods.onScrolledOutOfView);
					}
				}
			},
			doEffects: function (data, $this, listOfEffects) { 
				var target, e, listOfEffectsLength = listOfEffects.length, effect, target
				for (e = 0; 
					 effect = listOfEffects[e], e < listOfEffectsLength;
					e++) {
						
						var $target = $this;
						if (effect.target) {
							$target = $(effect.target, target);
						}
						switch (effect.type) {
							case 'intervalFunc': 
								setInterval( function () {
									effect.calledFunc.apply($(this));
								},
								effect.interval);
								break;
							case 'classAdd':
								$target.addClass(effect.clas);
								break;

							case 'classRemove':
								$target.removeClass(effect.clas);
								break;

							case 'animate':
								$target['animate'].apply($target, effect.args);
								break;

							case 'callFunc':
								$target[effect.functionName].apply($target, effect.args);
								break;

							default:
								break;

						}
						if (effect.isOnce) {
							listOfEffects.splice(e,1);
							e--;
							listOfEffectsLength--;
						
						}
				}
			},

			closureCall: function (callee, caller, params) {
				called.apply(callee, params);
			},
			
			cleanup : function () {
				try {
					if (typeof me.$this.data(meta.dataName).timeout != 'undefined') clearTimeout(me.$this.data(meta.dataName).timeout);
					me.$this.data(meta.dataName, null);
				} catch(e) {
		 
				}
			}
		};


	$.fn[meta.name] = function (method) {
		me.methods = methods;
		me.settings = settings;
		me.$this = $(this);
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist in '+meta.name);
		}
	};
}(jQuery));




