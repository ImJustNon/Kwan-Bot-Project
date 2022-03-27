const translate = require('@iamtraction/google-translate');

module.exports = {
    config: {
        name: 'translate',
        aliases: [],
        description: 'translate Word To thai',
    },
    run: async(bot,message,args) => {
        const word = args.join(" ");
        if(!word) return message.channel.send('โปรดระบุสิ่งที่ต้องการจะให้เเปลด้วยน่ะคะ');

        const translated = await translate(word,{ to: 'th' })

        await message.channel.send(translated.text);
    }
}