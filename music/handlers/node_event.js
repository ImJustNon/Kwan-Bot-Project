const manager = require('./manager.js');
const chalk = require('chalk');

/**
 * 
 * @param {Client} client 
 */

module.exports = async(client) =>{
    client.on('ready', async() =>{
        manager.init(client.user.id);
    });
    client.on('raw', async(d) =>{
        manager.updateVoiceState(d);
    });
    manager.on('nodeConnect', async(node) =>{
        console.log(chalk.blue.bold('[Node] ') + chalk.green.bold('------------ [MusicClient] ------------'))
        console.log(chalk.blue.bold('[Node] ') + chalk.white.bold(`Host : ${String(node.options.identifier)}`));
        console.log(chalk.blue.bold('[Node] ') + chalk.white.bold(`ID : ${String(node.options.id)}`));
        console.log(chalk.blue.bold('[Node] ') + chalk.green.bold('------------ [MusicClient] ------------'))
    });
    manager.on('nodeCreate', async(node) =>{
        console.log(chalk.blue.bold('[Node] ') + chalk.white.bold(`Node create : ${String(node.options.identifier)}`));
    });
    manager.on('nodeDestroy', async(node) =>{
        console.log(chalk.blue.bold('[Node] ') + chalk.white.bold(`Node destroy : ${String(node.options.identifier)}`));
    });
    manager.on('nodeDisconnect', async(node) =>{
        console.log(chalk.blue.bold('[Node] ') + chalk.white.bold(`Node disconnect : ${String(node.options.identifier)}`));
    });
    manager.on('nodeError', async(node) =>{
        console.log(chalk.blue.bold('[Node] ') + chalk.white.bold(`Node error : ${String(node.options.identifier)}`));
    });
    manager.on('nodeReconnect', async(node) =>{
        console.log(chalk.blue.bold('[Node] ') + chalk.white.bold(`Node Reconnecting : ${String(node.options.identifier)}`));
    });
};