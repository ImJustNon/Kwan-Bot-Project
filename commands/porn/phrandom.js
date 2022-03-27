const { RandomPHUB } = require('discord-phub');
const pornhub = new RandomPHUB(unique = true);

module.exports = {
    config: {
        name: 'phrandom',
        description: 'pornhub media',
        aliases: [],
        usage: '<user>',
        accessableby: "",
    },
    run: async(bot,message,args) => {
        var errMessage = "โปรดใช้คำสั่งประเภท NSFW ในห้อง NSFW น่ะคะ";
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.reply(errMessage).then(msg => {
                msg.delete({ timeout: 3000 })
            }) 
        }
        const rnd2 = pornhub.getRandom();
        console.log(rnd2.url)
        await message.channel.send(rnd2.url)

    },
}