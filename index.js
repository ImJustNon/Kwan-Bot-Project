const { Client, Collection, Presence,MessageEmbed} = require('discord.js');
require('discord-reply');
require('@discordjs/voice');
const { PREFIX } = require('./config');
const { Token } = require('./config');
const setting = require('./data/setting.js');
const bot = new Client({disableMentions: 'everyone'});

const Enmap = require("enmap");
const fs = require("fs");
const request = require("request");
const axios = require("axios");
const snekfetch = require("snekfetch");
const fetch = require("node-fetch");
const chalk = require('chalk');

const disbut = require('discord-buttons');
disbut(bot);

const { DiscordTogether } = require('discord-together');
bot.discordTogether = new DiscordTogether(bot);

const db = require('quick.db');

const Nuggies = require('nuggies');
Nuggies.handleInteractions(bot);
Nuggies.connect(setting.database.mongodburl).then(() =>{
    console.log(chalk.white.bold('[Module]') + chalk.white.bold(' Nuggies Already Connected To MongoDB'));
})

const data = require('./database/quickmongo.js');

const Levels = require('discord-xp');
Levels.setURL(setting.database.mongodburl).then(()=>{
    console.log(chalk.white.bold('[Module]') + chalk.white.bold(' Discord-xp Already Connected To MongoDB'));
});









 

//============================================================================================================================================================================================================


//====================================================================================COLLECTIONS REQUIRED ON READY===========================================================================================

bot.commands = new Collection();
bot.aliases = new Collection();


//============================================================================================================================================================================================================



//============================================================================================INITIALIZING====================================================================================================
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event", "error"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

/*const shard = require('./shard.js');
shard(bot);*/
//==================================================================Event=============================================================================================================================
bot.on("guildCreate", async(guild) =>{
    let firstMessage = require('./events/firstmessage/joinGuild.js');
    firstMessage(bot, guild);

    let joinGuildLog = require('./log/joinguildlog.js');
    joinGuildLog(bot, guild);
});


data.on('ready', async() =>{ //wait for quick db connect to database
    //join to create
    try {
        const jointocreate = require("./jointocreate/jointocreate.js");
        jointocreate(bot);
        const jointocreate2 = require("./jointocreate/jointocreate2.js");
        jointocreate2(bot);
        const jointocreate3 = require("./jointocreate/jointocreate3.js");
        jointocreate3(bot);
    }
    catch(err){
        console.log(err); 
    }

    bot.on('guildMemberAdd', async(member) =>{ //server stats
        let setup = await data.get(`stats_${member.guild.id}`);
        if(setup == null) return;
        let serverstats = require("./serverstats/statsupdate.js");
        serverstats(bot,member);
    });
    bot.on('guildMemberRemove', async(member) =>{ //server stats
        let setup = await data.get(`stats_${member.guild.id}`);
        if(setup == null) return;
        let serverstats = require("./serverstats/statsupdate.js");
        serverstats(bot,member);
    });
    bot.on('presenceUpdate', async(oldMember, newMember) => { //server status stats
        try{
            let setup = await data.get(`stats_${newMember.guild.id}_add_status_activate`);
            if(setup !== null){
                if(await oldMember.status !== await newMember.status){
                    let status_stats = require('./serverstats/addstats/status.js');
                    status_stats(bot, newMember);
                }
            }
        }
        catch(err){
            console.log('ERROR : Cannot Update channel status stats');
            console.log(err)
        }
    });
    bot.on('guildMemberAdd', async(member) =>{ //captcha System
        let setup = await data.get(`captcha_${member.guild.id}_activate`);
        if(setup !== null){
            const catchaSystem = require('./captcha/memberadd.js');
            catchaSystem(bot, member);
        }
    });
    bot.on('guildMemberAdd', async(member) =>{ //welcome message System
        let setup = await data.get(`welcome_${member.guild.id}_activate`);
        let welcomeMsg = await data.get(`welcome_${member.guild.id}_message`);
        let welcomeImageActivate = await data.get(`welcome_${member.guild.id}_backgroundimage_activate`);
        if(setup !== null){
            if(welcomeMsg !== null || welcomeImageActivate !== null){
                const welcome = require('./welcome-out/welcome.js');
                welcome(bot, member);
            }
        }
    });
    bot.on("guildMemberRemove", async(member) => { //goodbye message System
        let setup = await data.get(`goodbye_${member.guild.id}_activate`);
        let goodbyeMsg = await data.get(`goodbye_${member.guild.id}_message`);
        let goodbyeImageActivate = await data.get(`goodbye_${member.guild.id}_backgroundimage_activate`);
        if(setup !== null){
            if(goodbyeMsg !== null || goodbyeImageActivate !== null){
                const goodbye = require('./welcome-out/goodbye.js');
                goodbye(bot, member);
            }
        }
    });
});

//=========================================================================================MENTION SETTINGS===========================================================================================
bot.on('message', async message => { //mention
    let prefix;
    try {
        let fetched = await db.fetch(`prefix_${message.guild.id}`);
        if (fetched == null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
    } catch {
        prefix = PREFIX
    };
    try {
        if (message.author.bot) return;

        if (message.mentions.has(bot.user) && !message.mentions.everyone) {
            const ind = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor('ขวัญขอเเนะนำตัวนะคะ')
            .setDescription(`   สวัสดีค่ะ หนูชื่อขวัญนะคะ เป็นบอทสำหรับ จัดการเซิฟเวอร์ , อำนวยความสะดวก \n เเละนำพาความสุขให้ทุกคนค่ะ ขอฝากตัวด้วยนะคะ   ${setting.emoji.relax_face} \n ${setting.emoji.figure_down}   รายระเอียดตามด้านล่างเลยนะคะ \n\n ** ${setting.emoji.bear}  |  หากต้องการความช่วยเหลือเกี่ยวกับคำสั่งของ ขวัญ โปรดใช้คำสั่งนี้นะคะ  : ** \n \`  ${prefix}help  \`  ,  \`  ${prefix}h  \` \n **${setting.emoji.room}  |  หากต้องการให้ ขวัญไปอยู่ใน เซิฟเวอร์อื่นสามารถใช้คำสั่งนี้ได้เลยค่ะ : ** \n \`  ${prefix}invite  \`  ,  \`  ${prefix}inv  \``)
            .setFooter('K w a n')
            .setTimestamp()
          await message.channel.send(ind);
        }
          
    } catch {
        return;
    };
});


//============================================================================================================================================================================================================
bot.login(Token);
//=====================MUSIC Client========================================
require("./music/bot");
module.exports = {
    bot,
}

