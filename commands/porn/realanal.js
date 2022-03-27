const client = require('nekos.life');
var Discord = require('discord.js')
const config = require('../../config');
const superagent = require('superagent');
const neko = new client();


module.exports = {
    config: {
        name: 'realanal',
        description: 'anal gif',
        aliases: [],
        usage: '<user>',
        accessableby: "",
    },

  run: async (client, message, args) => {
    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent

      var errMessage = `โปรดใช้คำสั่งประเภท NSFW ในห้อง NSFW น่ะคะ`;
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 30000 })
      })
      
  }

    var lo = new Discord.MessageEmbed()
                .setDescription(`Loading...`)
                .setTimestamp()

    message.channel.send(lo).then(m => {

        superagent.get('https://nekobot.xyz/api/image').query({ type: 'anal'}).end((err, response) => {

            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`[ภาพไม่โหลดหรอ? กดนี่สิ](${response.body.message})`)
                .setTimestamp()
                .setImage(response.body.message)
                
            
            m.edit(embed_nsfw);

   });
    });
  }
  }
