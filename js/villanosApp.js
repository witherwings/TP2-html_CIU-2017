app.controller('VillanosCtrl', function (Villanos) {
	'use strict';

	var self = this;

	self.villanos = [];

	function errorHandler(error) {
        self.notifyError(error.data);
    }

	this.updateList = function() {
        Villanos.query(function(data) {
            self.villanos = data;
        }, errorHandler);
    };
    
    this.updateList();

    // AGREGAR
    this.createVillain = function() {
        Villanos.save(this.newVillain, function(data) {
            self.messageNotify('Pais agregado con id:' + data.id);
            self.updateList();
            self.newVillain = null;
        }, errorHandler);
    };

    // ELIMINAR
    this.deleteVillainById = function(villano) {
        var mensaje = "¿Está seguro de eliminar: '" + villano.name + "'?";
        bootbox.confirm(mensaje, function(confirma) {
            if (confirma) {
                Villanos.remove(villano, function() {
                    self.messageNotify('Pais eliminado!');
                    self.updateList();
                }, errorHandler);
            }
        });
    };

     // FEEDBACK & ERRORES
    this.msgs = [];
    this.messageNotify = function(mensaje) {
        this.msgs.push(mensaje);
        this.notify(this.msgs);
    };

    this.errors = [];
    this.notifyError = function(mensaje) {
        this.errors.push(mensaje);
        this.notify(this.errors);
    };

    this.notify = function(mensajes) {
        $timeout(function() {
            while (mensajes.length > 0) mensajes.pop();
        }, 3000);
    }

	// this.villanos = [{
	// 	"nombre": "Carmen Sandiego",
	// 	"id" : 1,
	// 	"genero": "Femenino",
	// 	"senhas" : [
	// 		"tiene pelo rojo",
	// 		"maneja un convertible",
	// 		"posee un collar de rubies",
	// 		"su comida favorita son los tacos"
	// 	],
	// 	"hobbies" : [
	// 		"jugar al tennis",
	// 		"le gusta eludir a la policia"
	// 	]
	// },
	// {
	// 	"nombre": "Igor Igorovich",
	// 	"id" : 2,
	// 	"genero": "Masculino",
	// 	"senhas" : [
	// 		"tiene pelo rubio",
	// 		"maneja limosina",
	// 		"tiene un tatuaje en el brazo",
	// 		"creo que habla ucraniano"
	// 	],
	// 	"hobbies" : [
	// 		"le gusta jugar croquet",
	// 		"le gusta cocinar"
	// 	]
	// },
	// {
	// 	"nombre": "Al Capone",
	// 	"id" : 3,
	// 	"genero": "Masculino",
	// 	"senhas" : [
	// 		"tiene cicatriz en el lado izquierdo de la cara",
	// 		"maneja un auto negro",
	// 		"tiene secuaces"
	// 	],
	// 	"hobbies" : [
	// 		"ama tirar personas al rio atadas a bloques de cemento",
	// 		"realiza regulares practicas de tiro"
	// 	]
	// },
	// {
	// 	"nombre": "Betty Chiars",
	// 	"id" : 4,
	// 	"genero": "Femenino",
	// 	"senhas" : [
	// 		"tiene pelo rubio",
	// 		"le gusta el deporte",
	// 		"es atractiva"
	// 	],
	// 	"hobbies" : [
	// 		"hace yoga",
	// 		"practica artes marciales"
	// 	]
	// },
	// {
	// 	"nombre": "Vic La Mancha",
	// 	"id" : 5,
	// 	"genero": "Masculino",
	// 	"senhas" : [
	// 		"tiene olor a aceite de autos",
	// 		"siempre lleva un cuchillo en su cinturon",
	// 		"es alto y flaco"
	// 	],
	// 	"hobbies" : [
	// 		"le gusta tallar arboles",
	// 		"juega tennis"
	// 	]
	// }];
});
