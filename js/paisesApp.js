'use strict';

var app = angular.module('paisesApp', []);

app.controller('PaisesCtrl', function () {

	this.paises = [{
		"nombre": "Argentina",
		"id" : 1
	}, {
		"nombre": "Estados Unidos",
		"id" : 2
	}, {
		"nombre": "Mexico",
		"id" : 3
	}, {
		"nombre": "Francia",
		"id" : 4
	}];
	
});
