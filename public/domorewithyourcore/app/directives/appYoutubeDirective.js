angular.module('dyxjweaApp').directive('appYoutube', function ($sce) {
    return {
    	restrict: 'A',
    	scope: { code:'='},
    	replace: true,
    	template: '<div class="wrapper"><div class="h_iframe"><img class="ratio" src="styles/img/transparent.png" /><iframe src="{{url}}" frameborder="0" allowfullscreen></iframe></div></div>',
    	link: function (scope) {
    		scope.$watch('code', function (newVal) {
    			if (newVal) {
    				scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+newVal);
    			}
    		});
    	}
    };
});