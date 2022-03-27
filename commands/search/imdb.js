const discord = require("discord.js");
const imdb = require("imdb-api");
const setting = require('../../data/setting.js');

module.exports = {
  config : {
    name: "imdb",
    description: "Get the information about series and movie",
    category: "info",
    usage: "imdb <name>"
  },
  run: async (client, message, args, color) => {
    
    if(!args.length) {
      return message.channel.send("โปรดระบุชื่อหนังหรือซีรีย์ที่ต้องการจะค้นหาด้วยน่ะคะ")
    }
    try {
    const imob = new imdb.Client({
      apiKey: setting.api.imdbapi
    }); //You need to paste you imdb api 
    
    let movie = await imob.get({'name': args.join(" ")})
    
    let embed = new discord.MessageEmbed()

    .setTitle(`${movie.title}, ${movie.year}`)
    .setURL(movie.imdburl)
    .setColor("RANDOM")
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .addField("ประเทศ", movie.country, true)
    .addField("ภาษา", movie.languages, true)
    .addField("ประเภท", movie.type, true)
    .addField("เวลา : ", movie.runtime, true)
    .addField(`คะเเนนโดย ${movie.ratings[0].source} :`,movie.ratings[0].value, true)
    .addField("เเนว : ", movie.genres, true)
    .setFooter('K w a n')
    .setTimestamp()
  
    await message.channel.send(embed)
    
    
  }
  catch(err){
      console.log(err)
  }
}

}