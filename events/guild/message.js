const db = require('quick.db');
const { PREFIX } = require('../../config.js');
const schema = require('../../models/custom-commands.js');
const commandtoggle = require('../../models/command.js');

const setting = require('../../data/setting.js');
const { MessageEmbed } = require('discord.js');

const database = require('../../database/quickmongo.js');

const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()

module.exports = async (bot, message) => {
    try {
        if (message.author.bot || message.channel.type === "dm") return;  

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);
        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
        //permission
        const permissionAlertEmbed = new MessageEmbed()
            .setColor('#ff1f53')
            .setAuthor(`โปรดให้สิทธิ ผู้ดูเเล กับขวัญด้วยน่ะคะ `)
            .setDescription(`เพื่อจะได้ใช้งานคำสั่งได้อย่างมีประสิทธิภาพค่ะ :heart_eyes:`)
            .setFooter('K w a n')
            .setTimestamp()
        if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(permissionAlertEmbed).then((msg) =>{
            msg.delete({ timeout : 10000 });
        });

        //ai chat bot
        const chatbotsetup = await database.get(`chatbot_${message.guild.id}_ch`);
        if(chatbotsetup !== null){
            if(message.channel.id === chatbotsetup){
                const chatbot = require('../../chatbot/chatbot.js');
                chatbot(bot,message);
            }
        }
        //xp and rank
        const xp = await database.get(`xp_${message.guild.id}_activate`);
        if(xp !== null){
            const levelxp = require('../../xp/xp.js');
            levelxp(message);
        }

        //args and commands-name
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();
        

        if (!message.content.startsWith(prefix)) return;

        let ops = {
            queue2: queue2,
            queue: queue,
            queue3: queue3,
            games: games
        }
        //send custom commands
        const data = await schema.findOne({ Guild: message.guild.id, Command: cmd })
        if(data) {
            message.channel.send(data.Response);
            console.log('use Custom commands');
        }
        //exec commands
        var commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
        if (commandfile){

            const cmdCH = await database.get(`cmdch_${message.guild.id}`);
            const nsfwCH = await database.get(`cmdch_${message.guild.id}_nsfw`);
            if(cmdCH !== null || nsfwCH !== null){
                if(message.channel.id == cmdCH || message.channel.id == nsfwCH){
                    let check = await commandtoggle.findOne({ Guild: message.guild.id})
                    let logchannel = require('../../log/mainlog.js')
                    if(check) {
                        if(check.Cmds.includes(commandfile.config.name)) return message.channel.send(`คำส่งนี้ได้ถูกปิดการใช้งานโดย \` ผู้ดูเเล \` เเล้วค่ะ`);
                        
                        commandfile.run(bot, message, args, ops);
                        logchannel(bot,message,args,commandfile)
                        console.log(commandfile);
                    }
                    else {   
                        commandfile.run(bot, message, args, ops);
                        logchannel(bot,message,args,commandfile)
                        console.log(commandfile);
                    }
                }
                else{
                    let cmdchannelid = await database.get(`cmdch_${message.guild.id}`);
                    if(cmdchannelid == null ) return;
                    let cmdchannel = await message.guild.channels.cache.get(cmdchannelid);
                    if(!cmdchannel) return;

                    return message.channel.send(`คุณสามารถใช้คำสั่งได้ในเฉพาะช่อง **\`${cmdchannel.name}\`** เท่านั้นนะคะ`).then((msg) =>{
                        msg.delete({ timeout : 5000 });
                    });
                }     
            }
            else{
                
                let check = await commandtoggle.findOne({ Guild: message.guild.id})
                let logchannel = require('../../log/mainlog.js')
                if(check) {
                    if(check.Cmds.includes(commandfile.config.name)) return message.channel.send(`คำส่งนี้ได้ถูกปิดการใช้งานโดย \` ผู้ดูเเล \` เเล้วค่ะ`);
                        
                    commandfile.run(bot, message, args, ops);
                    logchannel(bot,message,args,commandfile)
                    console.log(commandfile);
                }
                else {   
                    commandfile.run(bot, message, args, ops);
                    logchannel(bot,message,args,commandfile)
                    console.log(commandfile);
                }
            }      
        }
    } 
    catch (e) {
        console.log(e);
    }
}

/*
const db = require('quick.db');
const { PREFIX } = require('../../config');
const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()

module.exports = async (bot, message) => {
    try {
        if (message.author.bot || message.channel.type === "dm") return;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;

        let ops = {
            queue2: queue2,
            queue: queue,
            queue3: queue3,
            games: games
        }

        var commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
        if (commandfile) commandfile.run(bot, message, args, ops)


    } catch (e) {
        console.log(e);
    }


}
*/




/*let  dis = db.fetch(`${commandfile.config.name}_${message.channel.id}_${message.guild.id}`)
            if(!dis) dis = "enabled";
            if(dis === "enabled"){
                
            }
            else{
                return;
            }*/  
