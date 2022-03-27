const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../config');
const axios = require('axios')

module.exports = {
    config: {
        name: 'binary',
        description: 'Shows your text in Binary Format',
        aliases: ["binary"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        
        const url = `http://some-random-api.ml/binary?text=${args}`;

  let response, data;
  try {
    response = await axios.get(url);
    data = response.data;
  } catch (e) {
    return message.channel.send(`เอ๊ะ! โปรดลองใหม่อีกครั้งน่ะคะ`);
  }

  const embed = new MessageEmbed()
    .setTitle("เลขฐานสอง")
    .setThumbnail("https://cdn.discordapp.com/attachments/933667577207611402/940478085046870036/PngItem_527512.png")
    .setDescription("**โค้ดเลขฐานสอง** : `" + data.binary + "`")
    .setTimestamp()
    .setFooter('K w a n')
    .setColor('RANDOM');

  await message.channel.send(embed);

    }
}
