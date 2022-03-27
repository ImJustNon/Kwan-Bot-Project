const db = require('../database/quickmongo.js');
const chalk = require('chalk');
const Chatbot  =  require("discord-chatbot");
const chatbot  =  new Chatbot({name: "Kwan", gender: "female"});
const translate = require('@iamtraction/google-translate');


module.exports = async (bot,message) =>{
    
    let channelid = await db.get(`chatbot_${message.guild.id}_ch`);
    const lang = await db.get(`chatbot_${message.guild.id}_lang`);

    if(channelid == null) return;
    let channel = await message.guild.channels.cache.get(channelid);
    let content = message.content;

    const translateToEn = await translate(content, { to: 'en' });
    await chatbot.chat(translateToEn.text).then(async (response) =>{
        
        const translateTo = await translate(response, { to: lang });
        await channel.send(translateTo.text);
    }).catch((err) =>{
        console.log(err);
    });
    

}