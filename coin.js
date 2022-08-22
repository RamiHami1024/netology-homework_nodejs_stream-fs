const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const number = Math.floor(Math.random() * 2) + 1;
console.log(number)

module.exports.coinGame = function() {
    rl.question('Укажите название файла: ', (answer) => {
        const fileName = answer;

        rl.question('Орел или решка (1 или 2)? ', (answer) => {
            if (number === Number(answer)) {
                console.log('Вы угадали');
                writeScore(fileName, 'win');
            } else {
                console.log('Вы проиграли');
                writeScore(fileName, 'loose');
            }

            rl.close();
        })
    })
}

function writeScore(file, score) {
    const fileName = file + '.json';
    
    let data = '', 
        result;

    if (fs.existsSync(fileName)) {
        const readFile = fs.createReadStream(fileName);
        
        readFile
            .setEncoding('utf-8')
            .on('data', (chunk) => {
                data += chunk;
            })
            .on('end', () => {
                result = JSON.parse(data);
                result.games.push({
                    "result": score,
                    "date": new Date()
                });
                result.total = result.total + 1;
                const writeData = fs.createWriteStream(fileName);
                writeData.write(JSON.stringify(result), 'utf-8');
                writeData.end();
            })
    } else {
        const create = fs.createWriteStream(fileName, 'utf-8');

        create.write(JSON.stringify({
            "games": [{
                "result": score,
                "date": new Date()
            }],
            "total": 1
        }), 'utf-8');
        create.end();
    }
}