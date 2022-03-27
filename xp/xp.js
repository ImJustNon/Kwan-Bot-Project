const Levels = require('discord-xp');
const Discord = require('discord.js');
const setting = require('../data/setting.js');
const db = require('../database/quickmongo.js');
 

module.exports = async(message) =>{
    const alert = await db.get(`xp_${message.guild.id}_ch`);

    const randomXp = Math.floor(Math.random() * 25) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);

    const user = await Levels.fetch(message.author.id, message.guild.id);

    if(hasLeveledUp){
        if (alert !== null){
            const channel = await message.guild.channels.cache.get(alert);
            channel.send(`<@${message.author.id}> ยินดีด้วยค่ะตอนนี้คุณเลเวล **${user.level}** เเล้วค่ะ!`);

        }
        else {
            await message.channel.send(`<@${message.author.id}> ยินดีด้วยค่ะตอนนี้คุณเลเวล **${user.level}** เเล้วค่ะ!`);
        }
    }

}