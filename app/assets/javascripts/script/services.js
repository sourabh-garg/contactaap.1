angular.module('contact').service('contacts', function ($http) {
	
		var o =  this;
          
           o.getall = function(){
           return  $http.get('/contacts.json');
              };

           o.add = function(data){
           return $http.post('/contacts.json', data);
           };  

           o.show =  function(id){
            return $http.get('/contacts/' + id + '.json');

           };

           o.deletethis= function(id){
            return $http.delete('/contacts/' + id + '.json');
           };
           o.updatethis= function(id, data){
            return $http.put('/contacts/' + id + '.json', data);
           };
});