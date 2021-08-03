var fs = require('fs');

let falas_a_converter = require('./falas.json')

var convertido = {}
var entradas = Object.entries(falas_a_converter);

for(entrada in entradas) {
	if(!(entradas[entrada][1] in convertido)) {
		convertido[entradas[entrada][1]] = [entradas[entrada][0]];
	} else {
		convertido[entradas[entrada][1]].push(entradas[entrada][0]);
	}
}

fs.writeFile('convertido.json', JSON.stringify(convertido), function (erro) {
	console.log(erro);
});

console.log("convertido.")