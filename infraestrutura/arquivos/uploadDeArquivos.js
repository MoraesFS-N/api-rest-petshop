const fs = require('fs');
const path = require('path');

module.exports = (caminho, arquivo, callBackImagemCriada) => {

    const tiposValidos = ['jpg','png','jpeg'];
    const tipo = path.extname(caminho);
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1; 
    

    if (tipoEhValido) {
        const novoCaminho = `./assets/img/${arquivo}${tipo}`;

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => {
                callBackImagemCriada(false,  novoCaminho);
        });
        
    } else {
        const erro = 'Tipo é inválido';
        console.log('Erro, tipo invalido');
        callBackImagemCriada(erro);
    }
}