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
        console.log(this.nuevoVillano)
        Villanos.save(this.nuevoVillano, function(data) {
            self.messageNotify('Villano agregado con id:' + data.id);
            self.updateList();
            self.nuevoVillano = null;
        }, errorHandler);
    };

    // ELIMINAR
    this.deleteVillainById = function(villano) {
        var mensaje = "¿Está seguro de eliminar: '" + villano.name + "'?";
        bootbox.confirm(mensaje, function(confirma) {
            if (confirma) {
                Villanos.remove(villano, function() {
                    self.messageNotify('Villano eliminado!');
                    self.updateList();
                }, errorHandler);
            }
        });
    };

    this.updateVillain = function() {
        console.log(this.villanoSeleccionado);
        Villanos.update(this.villanoSeleccionado, function() {
            self.messageNotify('Villano actualizado!');
            self.updateList();
        }, errorHandler);

        this.villanoSeleccionado = null;
        // $("#editarLibroModal").modal('toggle');
    };

    // VER DETALLE
    this.villanoSeleccionado = null;

    this.verDetalleVillano = function(id) {
        this.villanoSeleccionado = Villanos.get({},{'id': id});
        this.fillGender();
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
