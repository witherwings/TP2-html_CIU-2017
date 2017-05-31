var app = angular.module('carmenSandiegoApp', ['ngResource']);


app.factory('Paises', function($resource) {
    return $resource('//localhost:9000/paises/:id', {'id': '@id'}, {
    	'query': { method: 'GET', isArray: true},
        'update': { method: 'PUT' },
        'save': { method: 'POST' },
        'remove': { method:'DELETE' }
    });
});

app.factory('Villanos', function($resource) {
    return $resource('//localhost:9000/villanos/:id', {'id': '@id'}, {
    	'query': { method: 'GET', isArray: true},
        'update': { method: 'PUT' },
        'save': { method: 'POST' },
        'remove': { method:'DELETE' }
    });
});
