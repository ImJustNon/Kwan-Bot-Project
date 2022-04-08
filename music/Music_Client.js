const chalk = require('chalk');

module.exports = async(client) =>{
    require('./handlers/manager.js');
    require('./handlers/erela_creation.js')(client);


    //load Event file
    ['disconnect','emptychannel'].forEach(async(x) =>{
        require(`./Music_Channel/events/${x}`)(client);
        console.log(chalk.blue.bold(`[Node] `) + chalk.magenta.bold(`Loading event : `) + chalk.cyan.bold(`${x}.js`))
    });
}