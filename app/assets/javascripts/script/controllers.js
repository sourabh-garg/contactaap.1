angular.module('contact').controller('MainCtrl', function ($scope, $mdSidenav,$mdDialog,$mdToast,$mdMedia, contacts) {

         $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

         var vm = this;
         vm.searchText = "";
         vm.info = {};
         vm.people= [];

      
         
        contacts.getall().then(function(response){
        console.log(response.data);
         vm.people = response.data;
        });


        vm.toggleSidenav = function(){
          $mdSidenav('left').open();
        };


        vm.saveit = function(info){

                contacts.add({
                name: vm.info.name,
                phone: vm.info.phone,
                email: vm.info.email
              });
              vm.people.push({
                name: vm.info.name,
                phone: vm.info.phone,
                email: vm.info.email
              });


                

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
      controller: DialogController,
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


       });

function DialogController($scope, $mdDialog,$mdToast, person, contacts) {

     $scope.val = true;
     console.log(person);
    $scope.name = person.name;
    $scope.phone = person.phone;
    $scope.email = person.email;


   $scope.edit = function() {
    $scope.val = !$scope.val;
    
    };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    var data = { name:$scope.name,
      phone:$scope.phone,
      email:$scope.email}
    console.log(person.id, data)

    contacts.updatethis(person.id, data);
      $mdToast.show( 
            $mdToast.simple()
              .content("Updated!")
              .position('top, right')
              .hideDelay(2000)
              );

    $mdDialog.hide(answer);
  };
}