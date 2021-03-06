angular.module('contact').controller('MainCtrl',[ '$scope', '$mdSidenav','$mdDialog','$mdToast'
                       ,'$mdMedia', 'contacts',function ($scope, $mdSidenav,$mdDialog,$mdToast,$mdMedia, contacts) {

         $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

         var vm = this;
         vm.searchText = "";
         vm.info = {};
         vm.people = [];


      
         
        contacts.getall().then(function(response){
         vm.people = response.data;
        });


        vm.toggleSidenav = function(){
          $mdSidenav('left').open();
        };

        vm.clear = function(){
          vm.info = {};
          vm.myform.$setPristine();
          vm.myform.$setUntouched();
        }


        vm.saveit = function(info){

          vm.xyz = {name: vm.info.name, phone: vm.info.phone, email: vm.info.email};

                vm.people.push(vm.xyz); 
                contacts.add(vm.xyz);
                console.log(vm.people);

               $mdSidenav('left').close();
               $mdToast.show( 
               $mdToast.simple()
              .content("ContactAdded!")
              .position('top, right')
              .hideDelay(2000)
              );
          
            vm.info = {};
            vm.myform.$setPristine();
            vm.myform.$setUntouched();
      
        };

      vm.showConfirm = function(ev, person) {
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
           var index = vm.people.indexOf(person);
               vm.people.splice(index,1);
        }, function() {
       $scope.status = 'You decided to keep your debt.';
       });
  };



  $scope.showDialog = function(ev, person) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
       locals:{ person : person},
      controller: 'DialogController',
      controllerAs: 'ctrl',
      templateUrl: 'templates/_advdialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {

      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };


       }]);