
const CombustibleType = {
    GASOLINA: 'GASOLINA',
    GASOIL : 'GASOIL',
    HIBRID : 'HIBRID',
    ELECTRIC : 'ELECTRIC'
}

const CarColor = {
    BLAU: 1,
    VERMELL: 2,
    NEGRE: 3,
    BLANC: 4,
    VERD: 5
}

class Car {
    constructor(cilindrada, marca, matricula, color, combustibleType){
        this.cilindrada = cilindrada
        this.marca = marca
        this.matricula = matricula
        this.color = color
        this.combustibleType = combustibleType
        
        if( !(combustibleType in CombustibleType)){
            console.log(`Error: Bad input: ${combustibleType}`);
        }
        
    }
}

module.exports = {CombustibleType, CarColor, Car}


