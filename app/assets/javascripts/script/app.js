angular.module('contact', ['ui.router', 'ngMaterial', 'templates','ngMessages'])
       .config(['$mdThemingProvider', '$stateProvider', function ($mdThemingProvider, $stateProvider) {
       	
     $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');

    $stateProvider
             .state('home', {
               url: '',
               templateUrl: 'templates/home.html',
               controller: 'MainCtrl as vm'

             });

       }]).controller('MainCtrl', function ($scope, $mdSidenav,$mdDialog,$mdToast, contacts) {

         var vm = this;
         $scope.searchText ="";

          $scope.toggleSidenav = function(){
          $mdSidenav('left').open();
        };
         
        contacts.getall().then(function(response){
        console.log(response.data);
         $scope.people = response.data;
        });

        $scope.saveit = function(detail, myform){

            if (!detail.name || !detail.phone) { return ;}

              contacts.add({
                name: detail.name,
                phone: detail.phone,
                email: detail.email
              });
              $mdToast.show( 
              $mdToast.simple()
              .content("ContactAdded!")
              .position('top, right')
              .hideDelay(2000)
              );
              $scope.people.push(detail);
            detail = {};
            myform.$setPristine();
            myform.$setUntouched();
      
        };

        $scope.showConfirm = function(ev, person) {
    // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please delete it!')
          .cancel('I want to keep it.');
        $mdDialog.show(confirm).then(function() {
          contacts.deletethis(person.id).then(function(){
          $mdToast.show( 
            $mdToast.simple()
              .content("Deleted!")
              .position('top, right')
              .hideDelay(2000)
              );
        
           });
           var index = $scope.people.indexOf(person);
               $scope.people.splice(index,1);
        }, function() {
       $scope.status = 'You decided to keep your debt.';
       });
  };


       });