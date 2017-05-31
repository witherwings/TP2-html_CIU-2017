carmenSandiegoApp.controller('VillanosCtrl', function (Villanos) {
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
});
