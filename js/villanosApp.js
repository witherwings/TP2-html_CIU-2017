carmenSandiegoApp.controller('VillanosCtrl', function (Villanos) {
	'use strict';

	var self = this;

	self.villanos = [];
    self.creating = false;

	function errorHandler(error) {
        self.notifyError(error.data);
    }

	this.updateList = function() {
        Villanos.query(function(data) {
            self.villanos = data;
        }, errorHandler);
    };
    
    this.updateList();

    // NUEVO VILLANO
    this.newVillano = function() {
        var newv = {
            "id": 999,
            "name": "Nombre",
            "gender": "",
            "signs": [],
            "hobbies": [] 
        };
        this.villanoSeleccionado = newv;
        this.creating = true;
    };

    // AGREGAR    
    this.createVillain = function() {
        console.log(this.newVillain)
        Villanos.save(this.newVillain, function(data) {
            self.messageNotify('Villano agregado con id:' + data.id);
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
    };

    // MODIFICAR
    this.aceptar = function() {
        if (!this.creating) {
            Villanos.remove(this.villanoSeleccionado, function() {
                self.messageNotify('Villano eliminado!');
                self.updateList();
            }, errorHandler);
        }
        this.newVillain = this.villanoSeleccionado;
        this.createVillain();
    };

    // QUITAR SIGN/HOBBIE
    this.removeSign = function(sign) {
        var temp = new Array();   
        for ( var i = 0; i < this.villanoSeleccionado.signs.length; i++ ) {
            if( this.villanoSeleccionado.signs[i] != sign ) {
                temp.push(this.villanoSeleccionado.signs[i]);
            }
        }
        this.villanoSeleccionado.signs = temp;
    };
    this.removeHobbie = function(hobbie) {
        var temp = new Array();   
        for ( var i = 0; i < this.villanoSeleccionado.hobbies.length; i++ ) {
            if( this.villanoSeleccionado.hobbies[i] != hobbie ) {
                temp.push(this.villanoSeleccionado.hobbies[i]);
            }
        }
        this.villanoSeleccionado.hobbies = temp;
    };

    // AGREGAR SIGN/HOBBIE
    this.new_sign = "";
    this.new_hobbie = "";

    this.addSign = function() {
        this.villanoSeleccionado.signs.push(this.new_sign);
    };
    this.addHobbie = function() {
        this.villanoSeleccionado.hobbies.push(this.new_hobbie);
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
