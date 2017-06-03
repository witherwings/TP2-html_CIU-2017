carmenSandiegoApp.controller('PaisesCtrl', function (Paises) {
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
    
 // VER DETALLE
    this.paisSeleccionado = null;

    this.verDetalle = function(pais) {
        this.paisSeleccionado = pais;
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

    // OBTENER DATOS 

    this.getFeatures = function() {
        var data;
        Paises.queryp(function(data) {
            data = data;
        }, errorHandler);
        return data.features;
    }

});
