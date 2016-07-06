(function() {

    var dyxjweaRotate = function($timeout) {

        return {
            restrict: 'AE',
            replace: true,
            scope: {
                components: '='
            },
            link: function(scope, elem, attrs) {

                // var count = scope.components;
                // console.log(count);

                scope.currentIndex = 0;

                scope.next = function() {
                    scope.currentIndex < scope.components.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
                };
                scope.prev = function() {
                    scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.components.length - 1;
                };

                scope.$watch('currentIndex', function() {
                    scope.components.forEach(function(component) {
                        component.visible = false;
                    });
                    scope.components[scope.currentIndex].visible = true;
                });

                var timer;

                var sliderFunc = function() {
                    timer = $timeout(function() {
                        scope.next();
                        timer = $timeout(sliderFunc, 6000);
                    }, 6000);
                };

                sliderFunc();

                scope.$on('$destroy', function() {
                    $timeout.cancel(timer);
                });

            },
            templateUrl: 'app/views/module.quotes.html'
        };
    };

    dyxjweaRotate.$inject = ['$timeout'];

    angular.module('dyxjweaApp')
        .directive('dyxjweaRotate', dyxjweaRotate);

}());
