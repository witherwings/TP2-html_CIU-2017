carmenSandiegoApp.factory('Paises', function($resource) {
    var resource = $resource('//localhost:9000/paises/:id', {id: '@id'}, {
    	'query': { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'save': { method: 'POST' },
        'remove': { method:'DELETE' }
    });
    return resource;
});

carmenSandiegoApp.factory('Villanos', function($resource) {
    return $resource('//localhost:9000/villanos/:id', {'id': '@id'}, {
    	'query': { method: 'GET', isArray: true},
        'update': { method: 'PUT' },
        'save': { method: 'POST' },
        'remove': { method:'DELETE' }
    });
});

carmenSandiegoApp.factory('Juego', function($resource) {
    var resource = $resource('//localhost:9000/iniciarJuego', {
        'save': { method: 'POST' }
    });
    return resource;
});

carmenSandiegoApp.factory('OrdenDeArresto', function($resource) {
    var resource = $resource('//localhost:9000/emitirOrdenPara', {
        'save': { method: 'POST'}
    });
    return resource;
});

carmenSandiegoApp.factory('Viajar', function($resource) {
    var resource = $resource('//localhost:9000/viajar', {
        'save': { method: 'POST'}
    });
    return resource;
});

