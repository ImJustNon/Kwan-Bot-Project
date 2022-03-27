const db = require('../database/quickmongo.js');
const chalk = require('chalk');

module.exports = async function (bot,message) {
    

    console.log(chalk.white.bold(`[ServerStats]`) + chalk.white.bold(` Updating ServerStats`));

    const allmemberid = await db.get(`stats_${message.guild.id}_allmember`);
    const memberid = await db.get(`stats_${message.guild.id}_member`);
    const botid = await db.get(`stats_${message.guild.id}_bot`);

    const checkAllmemberCH = await message.guild.channels.cache.get(allmemberid);
    const checkMemberCH = await message.guild.channels.cache.get(memberid);
    const checkBotCH = await message.guild.channels.cache.get(botid);

    if(checkAllmemberCH && checkMemberCH && checkBotCH){
        const updateAllMembers = guild => {
            const channel = guild.channels.cache.get(allmemberid)
            channel.setName(`📊 | สมาชิกทั้งหมด : ${guild.memberCount.toLocaleString()}`)
        }
        const updateMembers = guild => {
            const channel = guild.channels.cache.get(memberid)
            channel.setName(`👪 | สมาชิก : ${guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`)
        }
        const updateBot = guild => {
            const channel = guild.channels.cache.get(botid)
            channel.setName(`🤖 | บอท : ${guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`)
        }

        updateAllMembers(message.guild)
        updateMembers(message.guild)
        updateBot(message.guild)
    }
    else{
        return;
    }
}