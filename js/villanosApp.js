'use strict';

var app = angular.module('villanosApp', []);

app.controller('VillanosCtrl', function () {

	this.villanos = [{
		"nombre": "Carmen Sandiego",
		"id" : 1,
		"genero": "Femenino",
		"señas" : [
			"tiene pelo rojo",
			"maneja un convertible",
			"posee un collar de rubies",
			"su comida favorita son los tacos"
		],
		"hobbies" : [
			"jugar al tennis",
			"le gusta eludir a la policia"
		]
	},
	{
		"nombre": "Igor Igorovich",
		"id" : 2,
		"genero": "Masculino",
		"señas" : [
			"tiene pelo rubio",
			"maneja limosina",
			"tiene un tatuaje en el brazo",
			"creo que habla ucraniano"
		],
		"hobbies" : [
			"le gusta jugar croquet",
			"le gusta cocinar"
		]
	},
	{
		"nombre": "Al Capone",
		"id" : 3,
		"genero": "Masculino",
		"señas" : [
			"tiene cicatriz en el lado izquierdo de la cara",
			"maneja un auto negro",
			"tiene secuaces"
		],
		"hobbies" : [
			"ama tirar personas al rio atadas a bloques de cemento",
			"realiza regulares practicas de tiro"
		]
	},
	{
		"nombre": "Betty Chiars",
		"id" : 4,
		"genero": "Femenino",
		"señas" : [
			"tiene pelo rubio",
			"le gusta el deporte",
			"es atractiva"
		],
		"hobbies" : [
			"hace yoga",
			"practica artes marciales"
		]
	},
	{
		"nombre": "Vic La Mancha",
		"id" : 5,
		"genero": "Masculino",
		"señas" : [
			"tiene olor a aceite de autos",
			"siempre lleva un cuchillo en su cinturon",
			"es alto y flaco",
		],
		"hobbies" : [
			"le gusta tallar arboles",
			"juega tennis"
		]
	}];
});
