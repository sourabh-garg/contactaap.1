angular.module('contact').controller('DialogController', ['$scope', '$mdDialog','$mdToast', 
	'person', 'contacts', function ($scope, $mdDialog,$mdToast, person, contacts) {

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

    contacts.updatethis(person.id, data).then(function(){
$mdDialog.hide(answer);
      $mdToast.show( 
            $mdToast.simple()
              .content("Updated!")
              .position('top, right')
              .hideDelay(2000)
              );
      
    })
    

    
  };
	
}]);