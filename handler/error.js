const Discord = require('discord.js');
const setting = require('../data/setting.js');
const chalk = require('chalk');

module.exports = async (client) =>{
    const errChannel = setting.mainbot.errorlogChannel;

    process.on('unhandledRejection', async(reason, p) =>{
        console.log(chalk.red.bold("[Anti-crash] ") + chalk.white.bold("Unhandled Rejection/Catch"));
        console.log(reason, p);

        const errEmbed = new Discord.MessageEmbed()
            .setColor('#fe0000')
            .setAuthor(`${client.user.tag} Error Logging`,client.user.displayAvatarURL())
            .setDescription(`An error just occurred in the bot console!**\n\nERROR:\n\n** \`\`\`${reason}\n\n${p}\`\`\``)
            .setTimestamp()
            .setFooter('k w a n')

        const CHANNEL = client.channels.cache.get(errChannel);
        await CHANNEL.send(errEmbed);
    });

    process.on('uncaughtException', async(err, origin) =>{
        console.log(chalk.red.bold("[Anti-crash] ") + chalk.white.bold("Uncaught Exception/Catch"));
        console.log(err, origin);

        const errEmbed = new Discord.MessageEmbed()
            .setColor('#fe0000')
            .setAuthor(`${client.user.tag} Error Logging`,client.user.displayAvatarURL())
            .setDescription(`An error just occurred in the bot console!**\n\nERROR:\n\n** \`\`\`${err}\n\n${origin}\`\`\``)
            .setTimestamp()
            .setFooter('k w a n')

        const CHANNEL = client.channels.cache.get(errChannel);
        await CHANNEL.send(errEmbed);
    });

    process.on('uncaughtExceptionMonitor', async(err, origin) =>{
        console.log(chalk.red.bold("[Anti-crash] ") + chalk.white.bold("Uncaught Exception/Catch (MONITOR)"));
        console.log(err, origin);

        const errEmbed = new Discord.MessageEmbed()
            .setColor('#fe0000')
            .setAuthor(`${client.user.tag} Error Logging`,client.user.displayAvatarURL())
            .setDescription(`An error just occurred in the bot console!**\n\nERROR:\n\n** \`\`\`${err}\n\n${origin}\`\`\``)
            .setTimestamp()
            .setFooter('k w a n')

        const CHANNEL = client.channels.cache.get(errChannel);
        await CHANNEL.send(errEmbed);    
    });
}