(function() {
    var MainCtrl = function($scope, $state, $stateParams) {
        $scope.purlName = $stateParams.purlName;

        function init() {
            if ($scope.purlName === '' && $scope.$state.$current.path.length === 2) {
                $state.go('index.home.modal.guest');
            } else if ($scope.$state.$current.path.length === 2) {
                $state.go('index.home');
            }
        };
        init();
    };
    MainCtrl.$inject = ['$scope', '$state', '$stateParams'];
    angular.module('dyxjweaApp')
        .controller('MainCtrl', MainCtrl);
}());