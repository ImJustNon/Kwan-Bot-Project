  
const discord = require("discord.js");

module.exports = {
config : {
  name: "avatar",
  aliases: ["av", "ava"],
  category: "info",
  description: "Get avatar of any user"
},
  run: async (client, message, args) => {
    try{
    let target;

    if (message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else if (args[0]) {
      target = message.guild.members.cache.get(args[0]).user;
    } else {
      target = message.author;
    }

    let avatar = target.displayAvatarURL({ dynamic: true, size: 2048 });

    let embed = new discord.MessageEmbed();

    embed.setDescription(`[ดาวน์โหลด โปรไฟล์](${avatar})`);
    embed.setImage(avatar);
    embed.setColor("RANDOM");
    embed.setFooter('K w a n')
    embed.setTimestamp()
    message.channel.send(embed);
  } 
  catch (err) {
    message.channel.send('เอ๊ะ! โปรดลองใหม่อีกครั้งน่ะคะ')
  }
  }
};