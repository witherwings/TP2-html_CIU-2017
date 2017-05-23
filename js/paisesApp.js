'use strict';

var app = angular.module('paisesApp', []);

app.controller('PaisesCtrl', function () {

	this.paises = [{
		"nombre": "Argentina",
		"conexiones": ["Estados Unidos", "Mexico"],
		"lugares": [
			{
				"nombre": "Embajada"
				"occupant": {
					"clue": "una pista"
				}
			}
		],
		"id" : 1
	}, {
		"nombre": "Estados Unidos",
		"conexiones": ["Francia", "Mexico"],
		"lugares": [
			{
				"nombre": "Libreria"
				"occupant": {
					"clue": "otra pista"
				}
			}
		],
		"id" : 2
	}, {
		"nombre": "Mexico",
		"conexiones": ["Francia", "Argentina"],
		"lugares": [
			{
				"nombre": "Club"
				"occupant": {
					"clue": "una pista mas del monton"
				}
			}
		],
		"id" : 3
	}, {
		"nombre": "Francia",
		"conexiones": ["Estados Unidos", "Argentina"],
		"lugares": [
			{
				"nombre": "Banco"
				"occupant": {
					"clue": "alguna pista (de tu hermana)"
				}
			}
		],
		"id" : 4
	}];
	
});
