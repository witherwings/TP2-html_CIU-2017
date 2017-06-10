carmenSandiegoApp.controller('PaisesCtrl', function (Paises) {
	'use strict';

	var self = this;

	self.paises = [];
    self.places = ["Embajada", "Banco", "Club", "Biblioteca"];
    self.creating = false;
    this.paisSeleccionado = null;
    this.showEditZone = false;

	function errorHandler(error) {
        self.notifyError(error.data);
    }

    this.setShowEditZone = function() {
        var href = window.location.href;
        var parm = href.split('/')[href.split('/').length - 1];
        if (this.isNumber(parm)) {
            this.showEditZone = true;
            this.verDetallePais(parm);
        }
    };

    this.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

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

    // MODIFICAR PAIS (PUT) 
    this.updateCountry = function(country) {
        bootbox.confirm("¿Está seguro de modificar: '" + country.name + "'?", function(conf) {
            if (conf) {
                Paises.update(country);
            }
        });
        this.paisSeleccionado = Paises.get({},{'id': country.id});
    };

    // NUEVO PAIS
    this.newPais = function() {
        var newc = {
            "id": this.getNextID(),
            "name": "Nombre",
            "features": [],
            "connectedCountries": [],
            "places": [] 
        };
        this.paisSeleccionado = newc;
        this.creating = true;
    };

    this.getNextID = function() {
        var max = 0;
        this.paises.forEach(function(pais) {
            max = Math.max(max, pais.id);
        });
        return max + 1;
    };
    
    // VER DETALLE
    this.verDetallePais = function(id) {
        this.paisSeleccionado = Paises.get({},{'id': id});
        this.showEditZone = true;
    };

    // MODIFICAR
    this.aceptar = function() {
        if (this.creating) {
            this.newCountry = this.paisSeleccionado;
            this.createCountry();
        } else {
            this.updateCountry(this.paisSeleccionado);
        }
    };

    // QUITAR FEATURE
    this.removeFeature = function(feature) {
        this.paisSeleccionado.features = 
            this.arrayWithOut(this.paisSeleccionado.features, feature);
    };

    // AGREGAR FEATURE
    this.new_feature = "";
    this.addFeature = function() {
        this.paisSeleccionado.features.push(this.new_feature);
    };

    // QUITAR CONEXION
    this.removeConnection = function(conn) {
        this.paisSeleccionado.connectedCountries = 
            this.arrayWithOut(this.paisSeleccionado.connectedCountries, conn);
    }

    // AGREGAR CONEXION
    this.selectedConn = this.paises[0];
    this.addConnection = function() {
        this.paisSeleccionado.connectedCountries.push(this.selectedConn);
    }

    // QUITAR LUGAR
    this.removePlace = function(place) {
        this.paisSeleccionado.places = 
            this.arrayWithOut(this.paisSeleccionado.places, place);
    }

    this.arrayWithOut = function(arr, elemToRemove) {
        var temp = new Array();
        arr.forEach(function(elem) {
            if (elem != elemToRemove) {
                temp.push(elem);
            }
        });
        return temp;
    }

    // AGREGAR LUGAR
    this.selectedPlace = "";
    this.addPlace = function() {
        this.paisSeleccionado.places.push(this.selectedPlace);
    }

     // FEEDBACK & ERRORES
    this.msgs = [];
    this.messageNotify = function(mensaje) {
        bootbox.alert(mensaje);
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
    };

});
