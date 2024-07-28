//Definindo e importando a constante que será responsável pela entrada de dados
const prompt = require('prompt-sync')();

//Chamando a função para obter uma entrada do usuário com uma pergunta
function perguntar(promptText) { //definindo a entrada de texto no prompt
    return prompt(promptText); //retornando o que foi digitado na entrada
}

//Função para validar a entrada de números durante a execução do programa
function obterNumeroValido(promptText) { //Definindo a função
    let valor; //definindo a variável
    while (true) { //enquanto o número for um número, segue o programa
        valor = parseFloat(perguntar(promptText)); //Abre o prompt e recebe o valor
        if (!isNaN(valor) && valor >= 0) { //verifica se o não é um número e se é maior ou igual a zero
            return valor; //se atender a condição acima, continua
        } else { //se não atender, ou seja, se não for um número ou se for menor que 0, informa a mensagem e retorna para a entrada de uma resposta válida
            console.log('Entrada inválida. Por favor, insira um número positivo.');
        }
    }
}

//Função para calcular a média de um array de notas
function calcularMedia(notas) { //definindo a função de calculo de média que será chamada ao longo do código
    const soma = notas.reduce((acc, nota) => acc + nota, 0);//criando a constante que calcula o acúmulo de notas até o presente momento e soma com a ultima nota informada dentro do array de notas, começando do índice 0 (o primeiro)
    return soma / notas.length; //faz a divisão da soma das notas pela quantidade de notas através do '.length'.
}

//Função principal, que pede o nome do aluno e cria a lista de matérias vazia que será preenchida com as matérias informadas ao longo do programa
function main() {
    const aluno = {
        nome: perguntar('Digite o nome do aluno: '),
        materias: []
    };

    //Cadastro das matérias
    console.log('Cadastro de matérias:'); //Título que vai aparecer para o usuário apenas para fim informativo
    while (true) { //enquanto for verdade, ou seje, enquanto o usuário não digitar fim, ele vai continuar preenchendo
        const materia = perguntar('Digite o nome da matéria (ou "fim" para terminar): '); //Entrada de dados (nome da matéria)
        if (materia.toLowerCase() === 'fim') break; //Condição de parada quando digitar 'fim' e utilização do toLowerCase, método de string que converte todos os caracteres da string para minúsculas para garantir que a comparação seja feita de forma insensível a maiúsculas e minúsculas

        const notas = []; //criando a constante em forma de lista vazia, que armazenará as notas de cada matéria
        for (let i = 1; i <= 3; i++) { //definindo o número de vezes que será pedida uma nota, nesse caso são 3, começando do 1 para ficar visualmente mais sugestivo para o usuário (nota 1, 2 e 3)
            let nota; //definindo a variável de nota que receberá os valores digitados pelo usuário
            while(true){ //enquanto for verdade, ou seja, enquanto a nota não for um valor entre 0 e 10, ele continua rodando a função.
                nota = obterNumeroValido(`Digite a nota ${i} para a matéria ${materia}: `); //Retornando dentro da pergunta da nota, as variáveis que identificam qual a nota e de qual a matéria está sendo pedida
                if (nota >=0 && nota <=10){ //definindo parâmetros para o recebimento da nota, deve estar entre 0 e 10 (mínimo e máximo)
                    break; //se o valor for atendido (estiver entre 0 e 10) ele para o loop do while.
                }else{ //caso não atenda o critério, aparece a mensagem e continua no loop do while até que atenda
                    console.log("Nota inválida. A nota deve estar entre 0 e 10.")
                }
            }
            notas.push(nota); //Adicionando dentro da lista de notas, a nota informada
        }

        let faltas //criando a variável de faltas
        while (true){ //enquanto a condição abaixo (a entrada de dados for menor que 0), ele continua rodando
            faltas = parseInt(perguntar(`Digite o número de faltas para a matéria ${materia}: `), 10); //chamando a função que trás o prompt e transformando a entrada de resposta em número inteiro de base decimal 10, já que o dado recebido será um número (quantidade de faltas)
            if (!isNaN(faltas) && faltas >= 0) { //se for diferente de 'not a number'(se for um número) e se for maior ou igual a 0 ele interrompe o loop do while
                break;
            } else { //se não for maior ou igual a zero ou não for um número, informa a mensagem e continua no loop do while.
                console.log('Número de faltas inválido. Por favor, insira um número não negativo.');
            }
        }

        aluno.materias.push({ //adicionando a lista de matérias, dentro do nome de cada aluno, o nome da matéria definido pela variável de entrada do nome de matéria, as notas, faltas e a média(definida através da função de cálculo de média que está sendo chamada)
            nome: materia,
            notas,
            faltas,
            media: calcularMedia(notas)
        });
    }

    //Resultados
    console.log('\nResultados:'); //imprimindo mensagem de título resultados com um espaço (visualmente mais interativo)
    aluno.materias.forEach(materia => { //para cada aluno no array, na lista 'matérias', para cada dado dentro da lista(nome, notas, faltas e média), pegando através do nome da matéria
        console.log(`\nMatéria: ${materia.nome}`); //mostrando o nome vinculado a matéria
        console.log(`Notas: ${materia.notas.join(', ')}`); //juntando as 3 notas dentro da matéria, acessando através do nome da matéria, por isso o 'materia.'
        console.log(`Média: ${materia.media.toFixed(2)}`); //pegando a média pelo nome da matéria e ajustando para mostrar apenas duas casas decimais após a vírgula
        console.log(`Faltas: ${materia.faltas}`); //pegando a quantidade de faltas através do nome da matéria
        
        const aprovadoPorNotas = materia.media >= 6; //se a média da matéria for maior ou igual a 6
        const aprovadoPorFaltas = materia.faltas <= 5; //se a quantidade de faltas for menor ou igual a 5
        
        if (aprovadoPorNotas && aprovadoPorFaltas) { //atendendo as condições acima, está aprovado
            console.log('Status: Aprovado');
        } else { //se não atender as condições, status reprovado.
            console.log('Status: Reprovado');
        }
    });
}

main(); //chamando a função principal, para iniciar o programa.