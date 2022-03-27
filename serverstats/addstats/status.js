const db = require('../../database/quickmongo.js');
const chalk = require('chalk');

module.exports = async function (bot,message) {
    console.log(chalk.white.bold(`[ServerStats]`) + chalk.white.bold(` Updating ServerStats (status)`));

    const status1 = await db.get(`stats_${message.guild.id}_add_status_1`);
    const status2 = await db.get(`stats_${message.guild.id}_add_status_2`);

    const checkStatus1CH = await message.guild.channels.cache.get(status1);
    const checkStatus2CH = await message.guild.channels.cache.get(status2);

    if(checkStatus1CH && checkStatus2CH){
        //voice
        const updateVoiceStatusCH1 = guild => {
            const channel = guild.channels.cache.get(status1);
            channel.setName(`🟢 | ${guild.members.cache.filter(m => m.presence?.status == 'online').size} ➖ ⛔ | ${guild.members.cache.filter(m => m.presence?.status == 'dnd').size}`);
        }
        const updateVoiceStatusCH2 = guild => {
            const channel = guild.channels.cache.get(status2);
            channel.setName(`🌙 | ${guild.members.cache.filter(m => m.presence?.status == 'idle').size} ➖ ⚫ | ${guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size}`);
        }
        //text
        const updateTextStatusCH1 = guild => {
            const channel = guild.channels.cache.get(status2);
            channel.setName(`🟢${guild.members.cache.filter(m => m.presence?.status == 'online').size}-⛔${guild.members.cache.filter(m => m.presence?.status == 'dnd').size}`);
        }
        const updateTextStatusCH2 = guild => {
            const channel = guild.channels.cache.get(status2);
            channel.setName(`🌙${guild.members.cache.filter(m => m.presence?.status == 'idle').size}-⚫${guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size}`);
        }
        
        const checktypeCH1 = await message.guild.channels.cache.get(status1);
        const checktypeCH2 = await message.guild.channels.cache.get(status2);
        if(checktypeCH1.type == 'voice'){
            updateVoiceStatusCH1(message.guild);
        }
        else if(checktypeCH1.type == 'text'){
            updateTextStatusCH1(message.guild);
        }
        if(checktypeCH2.type == 'voice'){
            updateVoiceStatusCH2(message.guild);
        }
        else if(checktypeCH2.type == 'text'){
            updateTextStatusCH2(message.guild);
        }
    }
    else{
        return;
    }
}