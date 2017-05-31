app.controller('PaisesCtrl', function (Paises) {
	'use strict';

	var self = this;

	self.paises = [];

	function errorHandler(error) {
        self.notifyError(error.data);
    }

	this.updateList = function() {
        Paises.query(function(data) {
            self.paises = data;
        }, errorHandler);
    };
    
    this.updateList();

    // AGREGAR
    this.createCountry = function() {
        Paises.save(this.newCountry, function(data) {
            self.messageNotify('Pais agregado con id:' + data.id);
            self.updateList();
            self.newCountry = null;
        }, errorHandler);
    };

    // ELIMINAR
    this.deleteCountryById = function(pais) {
        var mensaje = "¿Está seguro de eliminar: '" + pais.name + "'?";
        bootbox.confirm(mensaje, function(confirma) {
            if (confirma) {
                Paises.remove(pais, function() {
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

	// this.paises = [{
	// 	"nombre": "Argentina",
	// 	"id" : 1,
	// 	"caracteristicas" : [
	// 		"tomar mates",
	// 		"bandera blanca y celeste"
	// 	],
	// 	"lugares" : [
	// 		"Embajada",
	// 		"Banco",
	// 		"Club"
	// 	],
	// 	"conexiones" : [
	// 		{
	// 			"nombre": "Estados Unidos",
	// 			"id" : 2,
	// 		},
	// 		{
	// 			"nombre": "Mexico",
	// 			"id" : 3
	// 		}
	// 	]
	// }, 
	// {
	// 	"nombre": "Estados Unidos",
	// 	"id" : 2,
	// 	"caracteristicas" : [
	// 		"casablanca",
	// 		"bandera con barras y estrellas"
	// 	],
	// 	"lugares" : [
	// 		"Embajada",
	// 		"Banco",
	// 		"Biblioteca"
	// 	],
	// 	"conexiones" : [
	// 		{
	// 			"nombre": "Mexico",
	// 			"id" : 3,
	// 		},
	// 		{
	// 			"nombre": "Francia",
	// 			"id" : 4
	// 		}
	// 	]
	// }, 
	// {
	// 	"nombre": "Mexico",
	// 	"id" : 3,
	// 	"caracteristicas" : [
	// 		"tacos",
	// 		"mariachis"
	// 	],
	// 	"lugares" : [
	// 		"Banco",
	// 		"Biblioteca",
	// 		"Club"
	// 	],
	// 	"conexiones" : [
	// 		{
	// 			"nombre": "Argentina",
	// 			"id" : 1,
	// 		},
	// 		{
	// 			"nombre": "Estados Unidos",
	// 			"id" : 2
	// 		}
	// 	]
	// },
	//  {
	// 	"nombre": "Francia",
	// 	"id" : 4,
	// 	"caracteristicas" : [
	// 		"torre Eifel",
	// 		"bandera blanca y celeste"
	// 	],
	// 	"lugares" : [
	// 		"Embajada",
	// 		"Banco",
	// 		"Club"
	// 	],
	// 	"conexiones" : [
	// 		{
	// 			"nombre": "Estados Unidos",
	// 			"id" : 2,
	// 		},
	// 		{
	// 			"nombre": "Mexico",
	// 			"id" : 3
	// 		}
	// 	]
	// }];
});
