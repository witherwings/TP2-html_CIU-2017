'use strict';

var app = angular.module('villanosApp', []);

app.controller('VillanosCtrl', function () {

	this.villanos = [

		{
			"nombre": "Carmen San Diego",
			"id": 1
		},
		{
			"nombre": "Igor Flash",
			"id": 2
		}

	]

});