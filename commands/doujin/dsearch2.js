const { MessageEmbed} = require('discord.js');
const Manytoon = require('manytoon.com')
const parser = new Manytoon.Parser() 

module.exports = {
    config: {
        name: 'dsearch2',
        description: 'search doujin from Manytoon.com',
        aliases: [],
        usage: '<user>',
        accessableby: "",
    },
    run: async(bot, message, args) =>{
        try {
            var errMessage = "โปรดใช้คำสั่งประเภท NSFW ในห้อง NSFW น่ะคะ";
            if (!message.channel.nsfw) {
                message.react('💢');
                return message.reply(errMessage).then(msg => {
                    msg.delete({ timeout: 3000 })
                }) 
            }   
        
            const Text = args.join(" ");
            if(!Text)return message.channel.send('โปรดระบุสิ่งที่ต้องการค้นหาด้วยน่ะคะ')
             
            await message.channel.send('**รอเเป๊บน่ะ...**').then(msg => {msg.delete({ timeout: 3000 })})
            
            async function url() {
                const page = await parser.search(Text)
                let random = Math.floor(Math.random() * page.length);
                await message.channel.send(page[random].url)
            }
            url()
        }
        catch(err){
            await message.channel.send('เอ๊ะ! ดูเหมือนว่าจะไม่พบสิ่งที่คุณต้องการจะค้นหาน่ะคะ')
        }
    },
}
