const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const { MessageMenuOption, MessageMenu } = require("discord-buttons");

module.exports = {
    config: {
        name: 'chatbot-setup',
        aliases: ['cb-setup'],
        description: 'setup chatbot channel',
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");

            const checkdata = await db.get(`chatbot_${message.guild.id}_ch`);
            if(checkdata !== null ) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะได้ทำการตั้งค่าห้องคุยกับขวัญเอาไว้เเล้วน่ะคะ')
        
            const setchannel = args.join(" ");

            if(!setchannel) return message.channel.send('โปรดระบุช่องที่ต้องการจะตั้งค่าเป็นห้องสำหรับคุยกันด้วยน่ะคะ ');
            let checkchannel = message.guild.channels.cache.get(setchannel) || message.mentions.channels.first();
            if(!checkchannel) return message.channel.send('โปรดระบุช่องถูกต้องด้วยน่ะคะ');
            if(checkchannel.type !== 'text') return message.channel.send('โปรดระบุช่องข้อความเท่านั้นน่ะคะ');

            const embed = new MessageEmbed()
                .setColor('#2eff82')
                .setTitle(`คุณอยากให้ขวัญคุยกับคุณด้วยภาษาอะไรดีค่ะ`)
                .setFooter('K w a n')    
                .setTimestamp()

            let ben = new MessageMenuOption()
                .setLabel('[ ENGLISH ]')
                .setEmoji("🇺🇸")
                .setValue("en")
                .setDescription('[ English ]')
            let bth = new MessageMenuOption()
                .setLabel('[ ภาษาไทย ]')
                .setEmoji("🇹🇭")
                .setValue("th")
                .setDescription('[ Thai ]')
            let bja = new MessageMenuOption()
                .setLabel('[ 日本 ]')
                .setEmoji("🇯🇵")
                .setValue("ja")
                .setDescription('[ Japanese ]')
            let bzh = new MessageMenuOption()
                .setLabel('[ 中国人 ]')
                .setEmoji("🇨🇳")
                .setValue("zh")
                .setDescription('[ Chinese ]')
            let bru = new MessageMenuOption()
                .setLabel('[ русский ]')
                .setEmoji("🇷🇺")
                .setValue("ru")
                .setDescription('[ Russian ]')
            let bko = new MessageMenuOption()
                .setLabel('[ 한국어 ]')
                .setEmoji("🇰🇷")
                .setValue("ko")
                .setDescription('[ Korean ]')

            let select = new MessageMenu()
                .setID('selector')
                .setPlaceholder('เลือกลบตรงนี้ได้เลยค่ะ')
                .setMaxValues(1)
                .setMinValues(1)
                .addOptions(ben,bth,bja,bzh,bru,bko)

            const Sendmenu = await message.channel.send(embed, select);
            const filter = ( button ) => button.clicker.user.id === message.author.id;
            let collector = Sendmenu.createMenuCollector(filter, { time : 45000 });
            collector.on("collect", async(b, menu) => {
                if(b.values[0] == "en") {
                    await db.set(`chatbot_${message.guild.id}_lang`,'en');
                    completesetup()
                }
                else if(b.values[0] == "th") {
                    await db.set(`chatbot_${message.guild.id}_lang`,'th');
                    completesetup()
                }
                else if(b.values[0] == "ja") {
                    await db.set(`chatbot_${message.guild.id}_lang`,'ja');
                    completesetup()
                }
                else if(b.values[0] == "ru") {
                    await db.set(`chatbot_${message.guild.id}_lang`,'ru');
                    completesetup()
                }
                else if(b.values[0] == "ko") {
                    await db.set(`chatbot_${message.guild.id}_lang`,'ko');
                    completesetup()
                }
                b.reply.defer();
            });

            async function completesetup(){
                await db.set(`chatbot_${message.guild.id}_ch`,checkchannel.id);
                await message.reply(`:white_check_mark: ได้ทำการตั้งค่าช่อง \` ${checkchannel.name} \` เป็นห้องคุยกับขวัญเเล้วน่ะคะ`);
                await Sendmenu.delete()
            }

        }
        catch(err){
            console.log(err);
        }
    }
}