(function() {

    var app = angular.module('dyxjweaApp', ['ui', 'ui.router', 'ngAnimate']);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                abstract: true
            })
            .state('index.home', {
                url: "/:purlName",
                views: {
                    'main@': {
                        templateUrl: 'app/views/root.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('index.home.modal', {
                abstract: true,
                views: {
                    'modal': {
                        templateUrl: 'app/views/modal.html',
                        controller: 'ModalCtrl'
                    }
                },
                onEnter: ['$state', function($state) {
                    $('body').addClass('modal-open');
                }],
                onExit: ['$state', function($state) {
                    $('body').removeClass('modal-open');
                }]
            })
            .state('index.home.modal.guest', {
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.guest.html'
                    }
                }
            })
            .state('index.home.modal.video', {
                url: '/video',
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.video.html'
                    }
                }
            })
            .state('index.home.modal.branch-anywhere', {
                url: '/branch-anywhere',
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.branchanywhere.html'
                    }
                }
            })
            .state('index.home.modal.real-time', {
                url: '/real-time',
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.realtime.html'
                    }
                }
            })
            .state('index.home.modal.power-on', {
                url: '/power-on',
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.poweron.html'
                    }
                }
            })
            .state('index.home.modal.jhaenterprise-workflow', {
                url: '/jhaenterprise-workflow',
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.enterpriseworkflow.html'
                    }
                }
            })
            .state('index.home.modal.digital-suite', {
                url: '/digital-suite',
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.digitalsuite.html'
                    }
                }
            })
            .state('index.home.modal.support', {
                url: '/support',
                views: {
                    'modalIn': {
                        templateUrl: 'app/views/module.support.html'
                    }
                }
            })


        $urlRouterProvider.when('', '/'); // IE 8 & 9
        $urlRouterProvider.otherwise('/');

    }]);

    app.run(function($rootScope, $state, $stateParams, $window, $location) {



        // removed appSettings & navigationSettings
        // $rootScope.appSettings = appSettings;
        // $rootScope.navigationSettings = navigationSettings;

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // console.log($state);

        // $window.ga('create', '', 'auto');
        // $rootScope.$on('$stateChangeSuccess', function (event) {
            // $window.ga('send', 'pageview', $location.path());
        // });

    });


}());
