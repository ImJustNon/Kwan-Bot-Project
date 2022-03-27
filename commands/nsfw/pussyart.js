const client = require('nekos.life');
var Discord = require('discord.js')
const config = require('../../data/setting.js');
const superagent = require('superagent');
const neko = new client();

module.exports = {
    config: {
        name: 'pussyart',
        description: 'pussy art',
        aliases: [],
        usage: '<user>',
        accessableby: "",
    },

  
  //command
    run: async (client, message, args) => {

  //Checks channel for nsfw
  var errMessage = "โปรดใช้คำสั่งประเภท NSFW ในห้อง NSFW น่ะคะ";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.pussyArt());

        const embed = new Discord.MessageEmbed()
        .setTitle("ภาพไม่โหลดหรอ? กดนี่สิ")
        .setDescription("**2D pussy art**")
        .setImage(owo.url)
        .setColor(`#060606`)
        .setURL(owo.url);
         message.channel.send(embed);

}

      work();
}
                };