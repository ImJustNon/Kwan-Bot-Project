const Discord = require('discord.js')
module.exports = {
  config : {
  name: 'minecraft'
},
  

  run :async (client , message , args) => {
  const sentence = args.join("+")
    
    if (!sentence) return message.channel.send('โปรดใส่ข้อความที่ต้องการด้วยน่ะคะ')
    if (sentence > 22) return message.channel.send("เอ๊ะ! ไม่สามารถใส่ข้อความที่มีความยาวมากกว่า 22 ตัวอักษรได้ค่ะ")
    let embed = new Discord.MessageEmbed()
      .setTitle('Achievement unlocked!')
      .setImage(`https://api.cool-img-api.ml/achievement?text=${sentence}`)
      .setColor('RANDOM')
      .setFooter(' ');
    message.channel.send(embed)
  }
}