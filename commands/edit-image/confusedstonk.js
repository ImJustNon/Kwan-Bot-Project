const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
    config: {
        name: 'confusedstonk',
        description: 'This is ConfusedStonk',
        aliases: [],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
 //   const m = client.findMember(message, args, true);
   
 let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
 let m = await message.channel.send("**รอเเป๊บน่ะ...**");   
 let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.ConfusedStonk().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "delete.png");
    m.delete({ timeout: 5000 });
    message.channel.send(attach);
  },
};