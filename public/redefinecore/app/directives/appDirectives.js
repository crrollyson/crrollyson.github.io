(function() {
    var dyxjweaScroll = function() {
        return {
            restrict: 'AE',
            link: function(scope, elem, attrs) {
                elem.on('click', function(){
                    var dataMine = $(this).attr('data-sender'),
                        dataSend = $('[data-receiver="' + dataMine + '"]'),
                        menuToggle = $('#navbar');

                    if(dataMine === 'toggle'){
                        $(menuToggle).addClass('in');
                    } else {
                        $('html, body').animate({
                            scrollTop: $(dataSend).offset().top - 70
                        }, 800, function() {
                            $(menuToggle).removeClass('in');
                        });
                    }
                });
            }
        };
    };
    // dyxjweaScroll.$inject = [''];
    angular.module('dyxjweaApp')
        .directive('dyxjweaScroll', dyxjweaScroll);
}());
