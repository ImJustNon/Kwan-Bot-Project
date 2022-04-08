const { MessageEmbed } = require("discord.js")
const chalk = require('chalk');
const setting = require('../../data/setting.js');


async function change_status(client) {
	try {
		client.user.setActivity(`${setting.mainbot.Prefix}help | ${client.guilds.cache.size} เซิฟเวอร์`, { 
            type: "STREAMING", url: "https://www.twitch.tv/im_just_non",
			shardID: shard
		});
	} 
	catch (e) {
		client.user.setActivity(`${setting.mainbot.Prefix}help | ${client.guilds.cache.size} เซิฟเวอร์`, {
            type: "STREAMING", url: "https://www.twitch.tv/im_just_non",
			shardID: 0
		});
	}
}

module.exports = async bot => {
	console.log(chalk.yellow.bold(`[Main-Client] `) + chalk.green.bold("------------ [MainClient] ------------"));
    console.log(chalk.yellow.bold(`[Main-Client] `) + chalk.white.bold(`Logged in as `) + chalk.blue.bold(`${bot.user.tag}`))
	console.log(chalk.yellow.bold(`[Main-Client] `) + chalk.white.bold(`Ready On ${bot.guilds.cache.size} Servers, ${bot.users.cache.size} Users`))
	console.log(chalk.yellow.bold(`[Main-Client] `) + chalk.green.bold("------------ [MainClient] ------------"));
    //console.log(`${bot.user.username} is Online now !`)
    change_status(bot);
    //loop through the status per each 10 second
    setInterval(() => {
        change_status(bot);
    }, 10 * 1000);
	//connect to mongodb
	await require('../../database/connect.js')();
	await require('../../database/quickmongo.js'); //quickmongo
	if(setting.website.enable) await require('../../website/server.js')(bot);


	//=================== post status =============================
	const CHANNEL = bot.channels.cache.get(setting.mainbot.online_log_channel);
	if(CHANNEL){
		const embedLog = new MessageEmbed()
			.setColor('#1aff00')
			.setDescription(`:signal_strength: | ${bot.user.tag} Is Now Online`)
			.setFooter('k w a n')
			.setTimestamp()
		CHANNEL.send(embedLog);
	}
};
