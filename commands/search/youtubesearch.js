const Discord = module.require("discord.js");
const yts = require( 'yt-search' )

module.exports = {
  config : {
    name: "ytsearch",
    description: "Search For results on Youtube",
  },
  
  run: async(client, message, args) => {
    try{
      const text = args.join(' ');
      if(!text) return message.channel.send('โปรดระบุสิ่งที่ต้องการจะค้นหาด้วยน่ะคะ')
      const r = await yts(text)

      let embed = new Discord.MessageEmbed()
        .setTitle(`ผลการค้นหาของ "${text}"`)
        .setColor('#ff0000')
        .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/944097842216198164/2560px-YouTube_full-color_icon_28201729.png')
        .setFooter('K w a n')
        .setTimestamp()
      let num;
      if(r.all.length < 25){
        num = r.all.length;
      }
      else if(r.all.length > 25){
        num = 25;
      }
      for(let i = 0 ; i < num ; i++){
        embed.addField(`${i+1}) ${r.all[i].title}`,`╰ ${r.all[i].url}`, false)
      }

      /*const videos = r.videos.slice( 0, 3 )
      videos.forEach(( v ) => {
	      const views = String( v.views ).padStart( 10, ' ' )
	      console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }` )
      })*/
      await message.channel.send(embed)
    }
    catch(err){
      message.channel.send('เอ๊! ดูเหมือนว่าจะไม่พบสิ่งที่คุณต้องการจะค้นหาน่ะคะ')
    }
  }
}