const Discord = require("discord.js");
const setting = require('../../data/setting.js');


module.exports = {
    config: {
        name: "inv",
        aliases: [],
        description: "",
    },
    run: async(bot, message, args) => {
        if (message.author.id == setting.mainbot.OwnerID) {
            let guild = null;

            if (!args[0]) return message.channel.send("โปรดระบุชื่อเซิฟเวอร๋ หรือ ID")

            if(args[0]){
                let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
                let found = bot.guilds.cache.get(args[0]);
                if(!found) {
                    if(fetched) {
                        guild = fetched;
                    }
                } else {
                    guild = found
                }
            } else {
                return message.channel.send("ไม่พบเซิฟเวอร์นี้");
            }
            if(guild){
                let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
                if(!tChannel) {
                    return message.channel.send("ไม่สามารถสร้างลิ้งได้"); 
                }
                let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                    return message.channel.send(`${err}`);
                });
                message.channel.send(invite.url);
            } else {
                return message.channel.send(`บอทไม่ได้อยู่ใน \`${args.join(' ')}\` `);
            }
        } 
        else {
            return;
        }
    }

}