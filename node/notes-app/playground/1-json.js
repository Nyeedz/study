const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataString = dataBuffer.toString();
const user = JSON.parse(dataString);

user.name = 'Christian';
user.planet = 'Terra';
user.age = 25;

fs.writeFileSync('1-json.json', JSON.stringify(user));
