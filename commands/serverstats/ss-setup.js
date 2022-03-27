const { Database } = require("quickmongo");
const db = require('../../database/quickmongo.js');
const database = require('quick.db');
const { PREFIX } = require('../../config.js');


module.exports = {
    config: {
        name: 'ss-setup',
        aliases: [],
        description: 'add stats data to database , and create channel , and category',
    },
    run: async(bot, message, args) => {
        let prefix;
        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await database.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX 
            } else {
               prefix = fetched
            }
        } catch (e) {
            console.log(e)
        }

        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**")
            const data = await db.get(`stats_${message.guild.id}`)
            if( data !== null ) return  message.channel.send(`เอ๊ะ! คุณได้ทำการตั้งต่าเอาไว้เเล้วน่ะคะ หากต้องการจะตั้งต่าอีกรอบโปรดใช้คำสั่ง \` ${prefix}ss-delete \` ก่อนน่ะคะ`)
            let Chtype = args[0];
            if(!Chtype) return message.channel.send(`โปรดเลือกประเภทช่องเป็น **\`Voice\`** หรือ **\`Text\`** ดีค่ะ`);

            let categoryid;
            async function createcategory() {
                await message.guild.channels.create('📊 SERVER STATS 📊', {
                    type: 'category',
                })
                .then(async(category) =>{
                    await db.set(`stats_${message.guild.id}_category`,category.id)
                    await category.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, CONNECT: false, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
                    categoryid = category.id;
                });
            }

            if(Chtype.toLowerCase() == 'voice'){
                createcategory();


                await message.guild.channels.create(`📊 | สมาชิกทั้งหมด : ${message.guild.memberCount.toLocaleString()}`,{
                    type: `voice`,
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_allmember`,channel.id)
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, CONNECT: false });
                    await channel.setParent(categoryid);
                });

                await message.guild.channels.create(`👪 | สมาชิก : ${message.guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`,{
                    type: `voice`
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_member`,channel.id)
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, CONNECT: false });
                    await channel.setParent(categoryid);
                });

                await message.guild.channels.create(`🤖 | บอท : ${message.guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`,{
                    type: `voice`,
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_bot`,channel.id)
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, CONNECT: false });
                    await channel.setParent(categoryid);
                });

            
            }
            else if(Chtype.toLowerCase() == 'text'){
                createcategory();

                await message.guild.channels.create(`สมาชิกทั้งหมด : ${message.guild.memberCount.toLocaleString()}`,{
                    type: `text`
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_allmember`,channel.id)
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
                    await channel.setParent(categoryid)
                });

                await message.guild.channels.create(`สมาชิก : ${message.guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`,{
                    type: `text`
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_member`,channel.id)
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
                    await channel.setParent(categoryid)
                });

                await message.guild.channels.create(`บอท : ${message.guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`,{
                    type: `text`,
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_bot`,channel.id)
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
                    await channel.setParent(categoryid)
                });
            }
            else {
                return message.channel.send(`โปรดเลือก **\`Voice\`** หรือ **\`Text\`** เท่านั้นน่ะคะ`);
            }

            await db.set(`stats_${message.guild.id}`,'true');

            message.channel.send(':white_check_mark: ทำการตั้งค่าเสร็จเรียบร้อยค่ะ');

        }
        catch (err){
            console.log(err);
        } 
    }
}