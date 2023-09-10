const { MessageEmbed } = require('discord.js');
const { getAudioUrl, getAllAudioUrls } = require('google-tts-api');
require("@discordjs/voice");
const { waitForDebugger } = require('inspector');
const DetectLanguage = require('detectlanguage');
const setting = require('../../data/setting.js');
const detectlanguage = new DetectLanguage(setting.api.detectLanguageAPI);

//wait until function
const waitUntil = (condition) => {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return;
            }
            clearInterval(interval);
            resolve();
        }, 100);
    });
}

module.exports = {
    config: {
        name: 'say',
        aliases: [],
        description: 'join channel and say something ',
    },
    run: async(bot, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send('โปรดเข้าช่องเสียงก่อนใช้คำสั่งนี้ด้วยน่ะคะ');
        if(!args[0]) return message.channel.send('โปรดระบุสิ่งที่ต้องการให้ขวัญพูดด้วยน่ะคะ');
        const text = args.join(' ');

        detectlanguage.detect(text).then(async(result) =>{
            if(result.length === 0) return message.lineReplyNoMention("💢 พิมพ์ให้มันเป็นภาษาหน่อยสิ !");
            let audioUrl = getAllAudioUrls(text,{
                lang: result[0].language,
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
            });

            try{
                for(let i = 0; i < audioUrl.length; i++){
                    let wait = false;
                    let msg = await message.lineReplyNoMention(new MessageEmbed().setColor('#2dfa25').setDescription(`:microphone2: กำลังพูดว่า\n\`\`\`${audioUrl[i].shortText}\`\`\``).setFooter('K w a n').setTimestamp());
                    await voiceChannel.join().then(async(connection) =>{
                        msg.react('🎙️').catch(()=>{});
                        const dispather = await connection.play(audioUrl[i].url);
                        dispather.on('finish',() =>{
                            wait = true;
                        });
                    });

                    await waitUntil(() => wait == true);
                    await msg.react('✅');
                }
                await message.react('✅');
                await voiceChannel.leave();

            }
            catch(err){
                console.log(err);
                message.channel.send('เกิดข้อผิดพลากขึ้น โปรดลองอีกครั้งค่ะ');
            }
        });
    }
}


            /*
            
            voiceChannel.join().then( async(connection) =>{
                const dispather = await connection.play(audioUrl);
                dispather.on('speaking',async(speaking) =>{
                    if(!speaking){
                        voiceChannel.leave();
                        msg.delete();
                        await message.react('✅');
                    }
                });
            });*/