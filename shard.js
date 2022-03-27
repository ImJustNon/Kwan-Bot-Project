const { ShardingManager } = require('discord.js');
const setting = require('./data/setting.js');
const chalk = require('chalk');
const manager = new ShardingManager('./index.js', { 
	totalShards: 'auto', 
    token: setting.mainbot.Token,
    respawn: true,
    spawnTimeout: -1,
});

manager.on('shardCreate', async(shard) =>{
    shard.on('reconnecting', async() =>{
        console.log(chalk.white.bold.bgGreen('[Shard-Manager]') + chalk.white.bold(' Reconnecting shard : ') + chalk.blue.bold(shard.id));
    });
    shard.on('spawn', async() =>{
        console.log(chalk.white.bold.bgGreen('[Shard-Manager]') + chalk.white.bold(' Spawned shard : ') + chalk.blue.bold(shard.id));
    });
    shard.on('ready', async() =>{
        console.log(chalk.white.bold.bgGreen('[Shard-Manager]') + chalk.white.bold(' Launched shard : ') + chalk.blue.bold(shard.id));
    });
    shard.on('death', async() =>{
        console.log(chalk.white.bold.bgGreen('[Shard-Manager]') + chalk.white.bold(' Died shard : ') + chalk.blue.bold(shard.id));
    });
    shard.on('error', async(err) =>{
        console.log(chalk.white.bold.bgGreen('[Shard-Manager]') + chalk.white.bold(' Error shard : ') + chalk.blue.bold(shard.id) + `\nERROR\n\n${err}`);
        shard.respawn;
    });
});

manager.spawn();