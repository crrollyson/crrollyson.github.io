(function(){
    var ModalCtrl = function($scope, $state) {
        var currentLocation = $state.current.name;
        if (currentLocation != 'index.home.modal.guest') {
            $(document).on('keyup', function(evt) {
                if (evt.keyCode == 27) {
                    $(document).off('keyup');
                    $state.go('index.home');
                }
            });
            $(document).on('click', '.modal-backdrop, .modal-holder', function() {
                $state.go('index.home');
            });
            $(document).on('click', '.modal-box, .modal-box *', function(evt) {
                evt.stopPropagation();
            });
        }
    };
    ModalCtrl.$inject = ['$scope', '$state'];
    angular.module('dyxjweaApp')
        .controller('ModalCtrl', ModalCtrl);
}());