const autos = require('./autos');
const personas = require('./personas');

const concesionaria = {
    autos: autos,
    personas: personas,

    buscarAuto: function(patente) {

        for (let i = 0; i < this.autos.length; i++) {
            if (autos[i].patente == patente) {
                return autos[i];
            }
        }
        return null;
    },

    venderAuto: function(patente) {
        let autoAVender = null;

        autoAVender = this.buscarAuto(patente);

        if (autoAVender != null) {
            for (let i = 0; i < this.autos.length; i++) {
                if (autos[i].patente == patente) {
                    autos[i].vendido = true;
                }
            }

        }
    },

    autosParaLaVenta: function() {
        autosParaVender = this.autos.filter(function(auto) {
            return auto.vendido == false;
        });
        return autosParaVender;
    },

    autosNuevos: function() {

        let autosDisponiblesParaVenta = this.autosParaLaVenta();
        let autosNuevosDisponiblesParaVenta = autosDisponiblesParaVenta.filter(function(autoNuevo) {
            if (autoNuevo.vendido == false && autoNuevo.km < 100) {
                return autoNuevo;
            }
        });
        return autosNuevosDisponiblesParaVenta;
    },

    listaDeVentas: function() {
        let listaDeVentas = this.autos.filter(function(auto) {
            if (auto.vendido == true) {
                return auto.precio;
            }
        });
        let listaDePrecios = [];
        listaDeVentas.forEach(function(venta) {
            listaDePrecios.push(venta.precio);
        })
        return listaDePrecios;
    },

    totalDeVentas: function() {
        let totalVentas = 0;
        let arrayTotalVentas = [];
        this.autos.forEach(function(auto) {
            if (auto.vendido == true) {
                arrayTotalVentas.push(auto.precio);
            }
        });

        if (arrayTotalVentas.length == 0) {
            return 0;
        } else {
            totalVentas = arrayTotalVentas.reduce(function(acum, monto) {
                return acum + monto;
            });
        }
        return totalVentas;
    },

    puedeComprar: function(auto, persona) {
        const costoCuota = auto.precio / auto.cuotas;
        return (persona.capacidadDePagoTotal >= auto.precio && persona.capacidadDePagoEnCuotas >= costoCuota);
    },

    autosQuePuedeComprar: function(persona) {
        let autosEnVenta = this.autos.filter(function(auto) {
            if (auto.vendido == false) {
                return auto;
            }
        });

        let autosQuePuedeComprar = [];
        for (let i = 0; i < autosEnVenta.length; i++) {
            let puedeComprar = this.puedeComprar(autosEnVenta[i], persona);
            if (puedeComprar == true) {
                autosQuePuedeComprar.push(autosEnVenta[i]);
            }
        }

        return autosQuePuedeComprar;
    },
};

//Testeos
console.log(concesionaria.autosParaLaVenta());

concesionaria.venderAuto2('JJK116');
console.log(concesionaria.autosParaLaVenta());
/*
console.log(concesionaria.autosNuevos());
console.log(concesionaria.listaDeVentas());
console.log(concesionaria.puedeComprar(autos[0], personas[0]));

console.log(concesionaria.autosQuePuedeComprar(personas[0]));
*/