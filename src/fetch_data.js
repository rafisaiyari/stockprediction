const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const dirs = ['chart_data/stocks', 'chart_data/crypto'];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

console.log('Fetching data');
exec('python src/data.py', (error, stdout, stderr) => {
    if(error){
        console.error(`Error executing script: ${error.message}`);
        return;
    }
    console.log(stdout);
});


