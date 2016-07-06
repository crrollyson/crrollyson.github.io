(function(){

	var CancelController = function($scope, $state, $log) {

		var self = this;

		function init() {
			$('.modalClose').hide();
		};

		init();

		self.getPurlName = function(field) {
	        field = field.replace(/\s+/g, '-');
	        return $state.go('index.home', {
	            purlName: field
	        });
	    };

		self.cancel = function() {
			return $state.go('index.home', {
				purlName: 'Guest'
			});
		};

	};

	CancelController.$inject = ['$scope', '$state', '$log'];

	angular.module('dyxjweaApp')
		.controller('CancelController', CancelController);

}());