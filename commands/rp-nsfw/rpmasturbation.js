const client = require('nekos.life');
var Discord = require('discord.js')
const config = require('../../config');
const superagent = require('superagent');
const neko = new client();

module.exports = {
    config: {
        name: 'rpmasturbation',
        description: 'Roleplay-masturbation your pussy',
        aliases: [],
        usage: '<user>',
        accessableby: "",
    },

  
  //command
    run: async (client, message, args) => {
    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent


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
        let owo = (await neko.nsfw.pussyWankGif());

        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;

        const keta = new Discord.MessageEmbed()
        .setTitle("ภาพไม่โหลดหรอ? กดนี่สิ")
        .setDescription(`${message.author} กำลังปลดปลดปล่อยอารมณ์ `)
        .setImage(owo.url)
        .setColor(`#060606`)
        .setURL(owo.url);
        message.channel.send(keta);

}

      work();
}
                };