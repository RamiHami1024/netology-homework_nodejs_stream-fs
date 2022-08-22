const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });


let result
rl.question('Путь к файлу: ', (answer) => {    
    fs.readFile(__dirname + `/${answer}`, 'utf-8', (err, data) => {
        if (err) throw Error(err)

        let wins = 0, 
            loses = 0, 
            average, 
            total;
        const file = JSON.parse(data)

        file.games.forEach(item => {
            item.result === 'win' ? 
                wins += 1 :
                loses += 1;
        });

        average = percentage(wins, loses);
        total = file.total;

        console.log(`Всего игр: ${total}\nпроцентное соотношение (победы/проигрыши): ${average}\nпобеды: ${wins}\nпроигрыши: ${loses}`);
    });

    
    rl.close();
});

function percentage(num1, num2) {
  return 100*(num1/num2)/num1;
}