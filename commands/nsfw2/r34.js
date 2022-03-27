var Discord = require('discord.js')
const config = require('../../data/setting.js');
const superagent = require('superagent');
const booru = require('booru');

module.exports = {
    config: {
        name: 'r34',
        description: 'search rule 34',
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


  if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('ดูเหมือนไม่ได้รับอณุญาติให้ส่งข้อความี้น่ะคะ');

  var query = message.content.split(/\s+/g).slice(1).join(" ");
  booru.search('rule34', [query], {nsfw: true, limit: 1, random: true })
      .then(booru.commonfy)
      .then(images => {
          for (let image of images) {
              const embed = new Discord.MessageEmbed()
              .setTitle("Rule34:")
              .setImage(image.common.file_url)
              .setColor('#FF0000')
              .setFooter(`Tags: r34 ${query}`)
              .setURL(image.common.file_url);
          return message.channel.send({ embed });
          }

      }).catch(err => {
          if (err.name === 'booruError') {
              return message.channel.send(`ไม่พบการค้นหาสำหรับ **${query}**!`);
          } else {
              return message.channel.send(`ไม่พบการค้นหาสำหรับ **${query}**!`);
          }
})
  }
  };