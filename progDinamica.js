//Autores: Glenda Faria, Gabriel Hirano, Rubens Euleutério, Gabriel Hirano
//Versão: 1
//Data: 15/06/2023

function planejarCardapio(dias, pratos, orcamento) {
    pratos.sort((a, b) => a[0] - b[0]);

    let cardapio = []; //Este array armazena os pratos que trarão um maior lucro.
    let lucroTotal = 0; //Lucro total do cardápio.

    let resultInterm = new Array(dias + 1).fill(0); // Array para armazenar os resultados intermediários da programação dinâmica

    //Loop onde verificamos o cardápio para cada dia.
    for (let dia = 1; dia <= dias; dia++) {
        let lucroMaximo = 0; //LM possível para o dia atual
        let pratoEscolhido = -1; //-1 indica que nenhum prato foi escolhido até o momento, durante as verificações, se o prato não possuir lucro e custo melhores, ele permanecerá como -1, e nenhum prato será selecionado e o cardápio irá receber o valor 0.

        //Greedy
        //Loop para escolher o prato com maior lucro possível dentro do orçamento disponível.
        for (let i = 0; i < pratos.length; i++) {
            let custo = pratos[i][0]; // custo do prato
            let lucro = pratos[i][1] * Math.pow(0.5, dia - 1); // lucro considerando o número de vezes que o prato já foi feito

            //Verifica se o prato pode ser escolhido e se o lucro é maior que o máximo lucro encontrado até agora.
            if (custo <= orcamento && lucro > lucroMaximo) {
                //Alteramos o valor do lucro máximo para o atual.
                lucroMaximo = lucro;
                //Escolhemos um prato e podemos seguir para a próxima verificação.
                pratoEscolhido = i;
            }
        }

        //Foi possível escolher um prato para hoje?
        if (pratoEscolhido !== -1) {
            orcamento -= pratos[pratoEscolhido][0]; // Subtrai o custo do prato escolhido do orçamento.
            lucroTotal += lucroMaximo; // Adiciona o máximo lucro possível ao lucro total.
            cardapio.push(pratoEscolhido + 1); // Adicionamos o prato ao cardápio (adicionamos +1 para corresponder aos números dos pratos).
        } else {
            cardapio.push(0); //Como mencionado anteriormente, se -1 inserimos como 0 no cardápio.
        }

        resultInterm[dia] = lucroTotal; // Armazena o lucro total até o dia atual no array dp
    }

    // Imprime o lucro total e o cardápio
    console.log("Lucro total: " + lucroTotal.toFixed(1));
    console.log("Cardápio: " + cardapio.join(','));

    return resultInterm[dias]; // Retorna o lucro total do cardápio
}

const entradas = [
    {
        dias: 2,
        pratos: 1,
        orcamento: 5,
        //pratos que pode cozinhar: [0] = custo, [1] = lucro
        pratosDisponiveis: [[3, 5]],
    },
    {
        dias: 3,
        pratos: 5,
        orcamento: 20,
        pratosDisponiveis: [[2, 5], [18, 6], [1, 1], [3, 3], [2, 3]],
    },
];

entradas.forEach(entrada => {
    const { dias, pratos, orcamento, pratosDisponiveis } = entrada;
    console.log(`Entrada:`);
    console.log(`Dias: ${dias}`);
    console.log(`Pratos: ${pratos}`);
    console.log(`Orçamento: ${orcamento}`);
    console.log(`Pratos disponíveis:`);
    console.log(pratosDisponiveis);

    console.log(`Resultado:`);
    const lucroTotal = planejarCardapio(dias, pratosDisponiveis, orcamento);
    console.log("Lucro total usando programação dinâmica: " + lucroTotal.toFixed(1));
    console.log('----------------------------------------');
});
