(function() {
    var MainCtrl = function($scope, $state, $stateParams, VideosService) {
        $scope.purlName = $stateParams.purlName;
        function init() {
            if ($scope.purlName === '' && $scope.$state.$current.path.length === 2) {
                $state.go('index.home.modal.guest');
            } else {
                $state.go('index.home');
            }
        };
        init();
    };
    MainCtrl.$inject = ['$scope', '$state', '$stateParams', 'VideosService'];
    angular.module('myApp')
        .controller('MainCtrl', MainCtrl);
}());

(function() {

    var NavCtrl = function($scope) {

        $scope.isCollapsed = true;

        function init() {
            $scope.$on('$stateChangeSuccess', function() {
                $scope.isCollapsed = true;
            })
        };

        init();

    };

    NavCtrl.$inject = ['$scope'];

    angular.module('myApp')
        .controller('NavCtrl', NavCtrl);

}());

(function() {

    var VideoDetailCtrl = function($scope, $stateParams, VideosService) {

        function init() {
            $scope.selectedVideo = VideosService.find($stateParams.url);
        };

        init();

    };

    VideoDetailCtrl.$inject = ['$scope', '$stateParams', 'VideosService'];

    angular.module('myApp')
        .controller('VideoDetailCtrl', VideoDetailCtrl);

}());


(function() {

    var ModalCtrl = function($scope, $state) {

        // Stuff
        var currentLocation = $state.current.name;

        function init() {
            if (currentLocation != 'index.home.modal.guest') {
                $(document).on('keyup', function(event) {
                    if (event.keyCode == 27) {
                        $document.off('keyup');
                        $state.go('index.home');
                    }
                });
                $(document).on('click', '.modal-backdrop, .modal-holder', function() {
                    $state.go('index.home');
                });
                $(document).on('click', '.modal-box', '.modal-box *', function(event) {
                    event.stopPropagation();
                })
            }
        };

        init();

    };

    ModalCtrl.$inject = ['$scope', '$state'];

    angular.module('myApp')
        .controller('ModalCtrl', ModalCtrl);

}());

(function() {

    var GuestModalCtrl = function($window, $scope, $rootScope, $state, $stateParams, $location, $log) {

        function cancel() {
            console.log('cancel');
            return {
                $state.go('index.home', {
                    purlName: 'Guest'
                });
            }
        };

        function getPurlName(field) {
            field = field.replace(/\s+/g, '-');
            return {
                $state.go('index.home', {
                    purlName: field;
                });
            }
        };

        function init() {
            // $('.modalClose').hide();
        };

        init();
    };

    GuestModalCtrl.$inject = ['$window', '$scope', '$rootScope', '$state', '$stateParams', '$location', '$log'];

    angular.module('myApp')
        .controller('GuestModalCtrl', GuestModalCtrl);

}());

(function() {

    var FormContactCtrl = function($scope, $state, $stateParams, $http, $timeout) {

        // Stuff
        $scope.sender = {};

        function init() {

            $scope.sender = {
                submitted: true,
                sending: false,
                success: false
            };

            function processContactForm(user) {
                var subjectemail = 'Contact@ARCU',
                    emailMessage;

                /* Wrap to center */
                emailMessage = '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f0f0f0"><tr><td><table bgcolor="#7dadd2" width="640" align="center" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="#7dadd2" style="padding: 10px 10px 10px 10px;"><table bgcolor="#7dadd2" width="100%" border="0" cellpadding="0" cellspacing="0">';
                /* Contact Info */
                emailMessage += '<tr><td width="20%" valign="middle" align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">Name:</td><td width="80%" valign="middle" align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">';
                emailMessage += $scope.sender.name;
                emailMessage += '</td></tr>';
                emailMessage += '<tr><td width="20%" valign="middle" align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">Email:</td><td width="80%" valign="middle" align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;"><a href="mailto:';
                emailMessage += $scope.sender.email;
                emailMessage += '" style="color: #638199">';
                emailMessage += $scope.sender.email;
                emailMessage += '</a></td></tr>';
                emailMessage += '<tr><td width="20%" valign="middle" align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">Message:</td><td width="80%" valign="middle" align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">';
                emailMessage += $scope.sender.message;
                emailMessage += '</td></tr>';
                emailMessage += '</table></td></tr></table></td></tr></table>';
                // end contact table
                sendTheMessage(subjectemail, emailMessage);

                function sendTheMessage(subject, message) {

                    $scope.sender.sending = true;

                    var sendmail = {
                        emailInfo: {
                            'EmailSubject': subject,
                            'EmailBody': message,
                            'EmailTo': '7FCA368A7E8E43889EE26241F41DB854' // Tracy, CR
                        }
                    };
                    $http({
                            url: '/_vti_bin/jhasendmailwcf/emailservice.svc/sendmail',
                            method: 'POST',
                            data: sendmail
                        })
                        .success(function(data, status, headers, config) {
                            $scope.sender.submitted = false;
                            $scope.sender.success = true;
                            // $state.go('index.home.modal.success');
                        })
                        .error(function(data, status, headers, config) {
                            $log.log('ERROR ' + data + 'n/' + status + 'n/' + headers + 'n/' + config);
                        });
                }
            }


        };

        init();

    };

    FormContactCtrl. = ['$scope', '$state', '$stateParams', '$http', '$timeout'];

    angular.module('myApp')
        .controller('FormContactCtrl', FormContactCtrl);

}());


(function() {

    var FormShareCtrl = function($scope, $state, $stateParams, $http, $filter) {

        // Stuff

        function init() {
            $scope.sender = {
                submitted: true,
                sending: false,
                success: false
            };

            $scope.master = {};


            var filteredPurl = $filter('hyphenToSpace')($scope.purlName);

            $scope.processShareForm = function(share) {

                $scope.master = angular.copy(share);

                var subjectemail = 'ARCU Website Referral from ' + filteredPurl;
                var emailMessage;
                var sfName = $scope.share.firstName;
                var slName = $scope.share.lastName;
                var sEmail = $scope.share.email;
                var sMessage = $scope.share.message;

                /* Wrap to center */
                emailMessage = '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f0f0f0"><tr><td><table bgcolor="#7dadd2" width="640" align="center" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="#7dadd2" style="padding: 10px 10px 10px 10px;"><table bgcolor="#7dadd2" width="100%" border="0" cellpadding="0" cellspacing="0">';
                /* Contact Info */
                emailMessage += '<tr><td align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">';
                emailMessage += sfName + ',';
                emailMessage += '</td></tr>';
                emailMessage += '<tr><td align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">';
                emailMessage += filteredPurl + ' would like to share ARCU with you and has included the following message:';
                emailMessage += '</td></tr>';
                emailMessage += '<tr><td align="center" bgcolor="#f9f9f9" style="padding: 35px 15px 35px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 17px; line-height:21px; color: #2d2d2d;">';
                emailMessage += sMessage;
                emailMessage += '</td></tr>';
                emailMessage += '<tr><td align="left" bgcolor="#ffffff" style="padding: 15px 15px 15px 15px; font-family:Arial, Helvetica, sans-serif; font-size: 14px; line-height:22px; color: #56565a;">';
                emailMessage += 'Visit <a href="http://www.symitar.com/ARCU/#/';
                emailMessage += sfName;
                emailMessage += '-';
                emailMessage += slName;
                emailMessage += '" style="color: #638199">';
                emailMessage += 'http://symitar.com/ARCU/#/';
                emailMessage += sfName;
                emailMessage += '-';
                emailMessage += slName;
                emailMessage += '</a> to see what your peers have to say and learn how they are using ARCU daily! Here you will see video testimonials, have access to <em>Taming Big Data in the Credit Union</em> – a complimentary white paper, view an on-demand product demo and access other ARCU webinars and information.';
                emailMessage += '</td></tr>';

                emailMessage += '</table></td></tr></table></td></tr></table>';
                // end contact table
                sendTheMessage(subjectemail, emailMessage);

                function sendTheMessage(subject, message) {

                    $scope.sender.sending = true;

                    var sendmail = {
                        emailInfo: {
                            'EmailSubject': subject,
                            'EmailBody': message,
                            // 'EmailTo': '7FCA368A7E8E43889EE26241F41DB855' // Tracy, CR
                            // 'EmailTo': 'crrollyson@jackhenry.com'
                            'EmailTo': sEmail
                        }
                    };
                    $http({
                            url: '/_vti_bin/jhasendmailwcf/emailservice.svc/sendmail',
                            method: 'POST',
                            data: sendmail
                        })
                        .success(function(data, status, headers, config) {
                            $scope.sender.submitted = false;
                            $scope.sender.success = true;
                            // $state.go('index.home.modal.success');
                            $log.log(filteredPurl + ' ' + sfName + ' ' + slName + ' ' + sEmail + ' ' + sMessage);
                        })
                        .error(function(data, status, headers, config) {
                            $log.log('ERROR ' + data + 'n/' + status + 'n/' + headers + 'n/' + config);
                        });
                }
            }
        };

        init();

    };

    FormShareCtrl. = ['$scope', '$state', '$stateParams', '$http', '$filter'];

    angular.module('myApp')
        .controller('FormShareCtrl', FormShareCtrl);

}());
