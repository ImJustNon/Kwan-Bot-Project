const mongoose = require("mongoose");
const setting = require('../data/setting.js');
const chalk = require('chalk');
async function connect() {
    mongoose.connect(setting.database.mongodburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
        console.log(chalk.magenta.bold('[Data-Base]') + chalk.green.bold(' ------------ [Database] ------------'));
        console.log(chalk.magenta.bold('[Data-Base]') + chalk.white.bold(' MongoDB'));
        console.log(chalk.magenta.bold('[Data-Base]') + chalk.white.bold(' Database Is Already Connected'));
        console.log(chalk.magenta.bold('[Data-Base]') + chalk.green.bold(' ------------ [Database] ------------'));
    });
    return;
}

module.exports = connect;