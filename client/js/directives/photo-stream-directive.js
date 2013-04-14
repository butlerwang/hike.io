"use strict";

angular.module("hikeio").
	directive("photoStream", function() {

	var template = '<div class="preview-list">' +
		'<div class="preview" data-ng-repeat="hike in hikes">' +
			'<div data-ng-class="{\'featured-box\': $first}" >' +
				'<img data-ng-src="/hike-images/{{hike.string_id}}/{{hike.string_id}}-preview{{ $first && \'-large\' || \'\' }}.jpg"></img>' +
				'<div class="preview-footer">' +
					'<div>' +
						'<div class="preview-title">{{hike.name}}</div>' +
						'<div class="preview-location">{{hike.locality}}</div>' +
					'</div>' +
					'<div>' +
						'<div class="preview-distance">{{hike.distance}}</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';

		return {
			replace: true,
			scope: {
				 hikes: "="
			},
			template: template,
			link: function (scope, element, attrs) {
				var gutterWidth = 2;
				var maxColumnWidth = 350;
				element.masonry({
					itemSelector: ".preview",
					gutterWidth: gutterWidth,
					isAnimated: false,
					columnWidth: function(containerWidth) {
						var boxes = Math.ceil(containerWidth / maxColumnWidth);
						var boxWidth = Math.floor((containerWidth - (boxes - 1) * gutterWidth) / boxes);
						element.find(".preview > div").width(boxWidth);
						if (boxes !== 1) {
							element.find(".featured-box").width(boxWidth * 2 + gutterWidth);
						}
						return boxWidth;
					}
				});
					
				scope.$watch("hikes", function(newValue, oldValue) {
					element.imagesLoaded(function() {
						element.masonry("reload");
					});
				}, true);
			}
		};
	});