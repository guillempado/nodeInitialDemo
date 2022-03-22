
/**
 * Fer una app que registri dates de cotxes
 * cilindrada marca matrícula color combustibleType = {gasolina, gasoil, híbrid, elèctric}
 * Crea una array amb 6 cotxes
 * canviar color de tots els cotxes en posicions parells a negre, imparells a vermell
 * pintar per consola la marca i matrícula dels cotxes de gasolina
 */

const {CombustibleType, CarColor, Car} = require('./model/Car')

cars = [
    new Car(500, 'Mitsubishi', '1245-ABC', CarColor.VERD, CombustibleType.GASOLINA),
    new Car(1200, 'Ford', '1345-ABC', CarColor.VERMELL, CombustibleType.GASOIL),
    new Car(600, 'Mercerdes', '1234-ABC', CarColor.BLAU, CombustibleType.GASOLINA),
    new Car(400, 'Nissan', '1235-ABC', CarColor.NEGRE, CombustibleType.HIBRID),
    new Car(800, 'Seat', '1235-AWC', CarColor.BLANC, CombustibleType.GASOLINA),
    new Car(900, 'Audi', '2345-ACC', CarColor.VERD, CombustibleType.ELECTRIC)
]

for(let i = 0; i < 6; i++){
    if(i%2==0){
        cars[i].color = CarColor.NEGRE
        continue
    }
    cars[i].color = CarColor.VERMELL
}

for (const car of cars) {
    if(car.combustibleType == CombustibleType.GASOLINA)
        console.log(`Marca: ${car.marca}, Matrícula: ${car.matricula}`);
}