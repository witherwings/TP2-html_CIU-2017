'use strict';

var app = angular.module('paisesApp', []);

app.controller('PaisesCtrl', function () {

	this.paises = [{
		"nombre": "Argentina",
		"id" : 1,
		"caracteristicas" : [
			"tomar mates",
			"bandera blanca y celeste"
		],
		"lugares" : [
			"Embajada",
			"Banco",
			"Club"
		],
		"conexiones" : [
			{
				"nombre": "Estados Unidos",
				"id" : 2,
			},
			{
				"nombre": "Mexico",
				"id" : 3
			}
		]
	}, 
	{
		"nombre": "Estados Unidos",
		"id" : 2,
		"caracteristicas" : [
			"casablanca",
			"bandera con barras y estrellas"
		],
		"lugares" : [
			"Embajada",
			"Banco",
			"Biblioteca"
		],
		"conexiones" : [
			{
				"nombre": "Mexico",
				"id" : 3,
			},
			{
				"nombre": "Francia",
				"id" : 4
			}
		]
	}, 
	{
		"nombre": "Mexico",
		"id" : 3,
		"caracteristicas" : [
			"tacos",
			"mariachis"
		],
		"lugares" : [
			"Banco",
			"Biblioteca",
			"Club"
		],
		"conexiones" : [
			{
				"nombre": "Argentina",
				"id" : 1,
			},
			{
				"nombre": "Estados Unidos",
				"id" : 2
			}
		]
	},
	 {
		"nombre": "Francia",
		"id" : 4,
		"caracteristicas" : [
			"torre Eifel",
			"bandera blanca y celeste"
		],
		"lugares" : [
			"Embajada",
			"Banco",
			"Club"
		],
		"conexiones" : [
			{
				"nombre": "Estados Unidos",
				"id" : 2,
			},
			{
				"nombre": "Mexico",
				"id" : 3
			}
		]
	}];
});
