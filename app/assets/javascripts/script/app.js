angular.module('contact', ['ui.router', 'ngMaterial', 'templates','ngMessages'])
       .config(['$mdThemingProvider', '$stateProvider', function ($mdThemingProvider, $stateProvider) {
       	
     $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');

    $stateProvider
             .state('contact', {
               url: '',
               templateUrl: 'templates/_all-contacts',
               controller: 'MainCtrl as vm'

             });
  
             


       }]);