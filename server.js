const express = require('express');
const app = express();

// Exercício 1 - Contar o número de vogais em uma string
app.get('/contaVogais', (req, res) => {
  const string = req.query.string || '';
  const vogais = string.match(/[aeiouáéíóúâêîôûãõàèìòùäëïöü]/gi);
  const numeroDeVogais = vogais ? vogais.length : 0;
  res.send(`O número de vogais em "${string}" é: ${numeroDeVogais}`);
});

// Exercício 2 - Cálculo do montante de um investimento
app.get('/calculaInvestimento', (req, res) => {
  const capitalInicial = parseFloat(req.query.capital);
  const taxaJuros = parseFloat(req.query.taxa) / 100;
  const tempo = parseInt(req.query.tempo);
  
  if (!capitalInicial || !taxaJuros || !tempo) {
    res.send("Por favor, forneça os parâmetros corretos: capital, taxa, e tempo.");
  } else {
    const montante = capitalInicial * Math.pow((1 + taxaJuros), tempo);
    res.send(`O montante após ${tempo} meses é: R$ ${montante.toFixed(2)}`);
  }
});

// Exercício 3 - Contar ocorrências de um caractere em uma string
app.get('/contaCaractere', (req, res) => {
  const string = req.query.string || '';
  const caractere = req.query.caractere || '';
  const ocorrencias = string.split(caractere).length - 1;
  res.send(`O caractere "${caractere}" aparece ${ocorrencias} vezes na string "${string}".`);
});

// Exercício 4 - Verificar se um ano é bissexto
app.get('/verificaBissexto', (req, res) => {
  const ano = parseInt(req.query.ano);
  
  if (!ano) {
    res.send("Por favor, forneça um ano.");
  } else {
    const isBissexto = (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
    res.send(isBissexto ? `O ano ${ano} é bissexto.` : `O ano ${ano} não é bissexto.`);
  }
});

// Exercício 5 - Encontrar o maior e o menor número em um array
app.get('/maiorMenor', (req, res) => {
  const numeros = req.query.numeros ? req.query.numeros.split(',').map(Number) : [];
  
  if (numeros.length === 0) {
    res.send("Por favor, forneça um array de números.");
  } else {
    const menor = Math.min(...numeros);
    const maior = Math.max(...numeros);
    res.send(`O menor número é: ${menor} e o maior número é: ${maior}.`);
  }
});

// Exercício 6 - Simulação de loteria
app.get('/loteria', (req, res) => {
  const numerosEscolhidos = req.query.numeros ? req.query.numeros.split(',').map(Number) : [];
  
  if (numerosEscolhidos.length !== 6) {
    res.send("Por favor, forneça 6 números.");
  } else {
    const numerosSorteados = [];
    while (numerosSorteados.length < 6) {
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!numerosSorteados.includes(numero)) {
        numerosSorteados.push(numero);
      }
    }

    const acertos = numerosEscolhidos.filter(num => numerosSorteados.includes(num)).length;
    res.send(`Números sorteados: ${numerosSorteados.join(', ')}. Você acertou ${acertos} número(s)!`);
  }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
