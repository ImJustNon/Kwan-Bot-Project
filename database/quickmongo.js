const setting = require('../data/setting.js');
const { Database } = require('quickmongo');
const db = new Database(setting.database.mongodburl);
const chalk = require('chalk');

async function connect(){
    db.on("ready", () => {
        console.log(chalk.magenta.bold('[Data-Base]') + chalk.white.bold(" quickmongo Already Connected To MongoDB"));
    });
    await db.connect();
	
}
connect()

module.exports = db;