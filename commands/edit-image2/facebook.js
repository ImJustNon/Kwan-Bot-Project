const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const setting = require('../../data/setting.js');

module.exports = {
    config: {
        name: 'facebook',
        description: 'facebook user profile',
        aliases: [],
        usage: 'facebook <user>',
        accessableby: "",
    },
    run: async(client, message, args) => {
        let AmeAPI = new AmeClient(setting.api.imageapi);
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let m = await message.channel.send("**รอเเป๊บน่ะ...**"); 

		const buffer = await AmeAPI.generate("facebook", { url: user.displayAvatarURL({ format: "png", size: 512 }), text: user.username});
		const attachment = new Discord.MessageAttachment(buffer, "approved.png");
        m.delete({ timeout: 3000 });
		await message.channel.send(attachment);
    },
}