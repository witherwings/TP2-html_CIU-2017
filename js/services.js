var app = angular.module('paisesApp', ['ngResource']);

app.factory('Paises', function($resource) {
    return $resource('//localhost:9000/paises/:id', {'id': '@id'}, {
    	'query': { method: 'GET', isArray: true},
        'update': { method: 'PUT' },
        'save': { method: 'POST' },
        'remove': { method:'DELETE' }
    });
});

