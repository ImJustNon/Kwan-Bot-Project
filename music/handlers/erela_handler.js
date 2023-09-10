const manager = require('./manager.js');
const db = require('../../database/quickmongo.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const setting = require('../../data/setting.js');
const { youtubeThumbnail } = require('../utils/trackimage.js');
const { convertTime } = require('../utils/convert.js');


/**
 * 
 * @param {Client} client 
 */
module.exports = async(client) =>{
    manager.on('trackStart',async(player, track) =>{

        let musicChannelID = await db.get(`music_${player.guild}_channel`);
        let trackEmbedID = await db.get(`music_${player.guild}_track_message`);
        let queueMessageID = await db.get(`music_${player.guild}_queue_message`);

        let musicChannel = client.channels.cache.get(musicChannelID);
        let trackEmbed = await musicChannel.messages.fetch(trackEmbedID);
        let queueMessage = await musicChannel.messages.fetch(queueMessageID);


        let editEmbed = new MessageEmbed()
            .setColor(setting.music.config.embedColor)
            .setTitle(`${track.title}`)
            .setURL(track.uri)
            .setImage(youtubeThumbnail(track.identifier))
            .setFooter('K w a n')
            .setTimestamp()
        let Queue_message = `**คิวเพลง:**\n`;
        for(let i = 0; i < player.queue.length; i++) {
            Queue_message += `\`${i + 1})\` [${convertTime(player.queue[i].duration)}] - ${player.queue[i].title}\n`;
        }

        /*let bpause = new MessageButton()
            .setID(`pause`)
            .setStyle(`SUCCESS`)
            .setEmoji(`⏯`)
        let bskip = new MessageButton()
            .setID(`skip`)
            .setStyle(`SECONDARY`)
            .setEmoji(`⏭`)
        let bstop = new MessageButton()
            .setID(`stop`)
            .setStyle(`red`)
            .setEmoji(`⏹`)
        let bloop = new MessageButton()
            .setID(`loop`)
            .setStyle(`SUCCESS`)
            .setEmoji(`🔁`)
        let bdisconnect = new MessageButton()
            .setID(`disconnect`)
            .setStyle(`red`)
            .setEmoji(`❌`)
        let bvolumeup = new MessageButton()
            .setID(`volup`)
            .setLabel(`เพิ่มเสียง`)
            .setStyle(`PRIMARY`)
            .setEmoji(`🔊`)
        let bvolumedown = new MessageButton()
            .setID(`voldown`)
            .setLabel(`ลดเสียง`)
            .setStyle(`PRIMARY`)
            .setEmoji(`🔉`)
        let bmute = new MessageButton()
            .setID(`mute`)
            .setLabel(`ปิด/เปิดเสียง`)
            .setStyle(`PRIMARY`)
            .setEmoji(`🔈`)
        let row = new MessageActionRow()
            .addComponents(bpause,bskip,bstop,bloop,bdisconnect)
        let row2 = new MessageActionRow()
            .addComponents(bvolumedown,bvolumeup,bmute)*/
        await trackEmbed.edit(editEmbed);
        await queueMessage.edit(Queue_message);
        

    });
    manager.on('playerDestroy',async(player, track) =>{
        let musicChannelID = await db.get(`music_${player.guild}_channel`);
        let trackEmbedID = await db.get(`music_${player.guild}_track_message`);
        let queueMessageID = await db.get(`music_${player.guild}_queue_message`);

        let musicChannel = client.channels.cache.get(musicChannelID);
        let trackEmbed = await musicChannel.messages.fetch(trackEmbedID);
        let queueMessage = await musicChannel.messages.fetch(queueMessageID);
        
        const editEmbed = new MessageEmbed()
            .setColor(setting.music.config.embedColor)
            .setTitle('ยังไม่มีเพลงเล่นอยู่ ณ ตอนนี้ค่ะ')
            .setImage(setting.music.config.defaultTrackImage)
            .setFooter('K w a n')
            .setTimestamp()
        await queueMessage.edit('**คิวเพลง:**\nเข้าช่องเสียง และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลงค่ะ');
        await trackEmbed.edit(editEmbed);
    });
    manager.on('queueEnd',async(player, track) =>{
        let channel = client.channels.cache.get(player.textChannel);
        channel.send(`:exclamation: คิวหมดเเล้วน่ะคะ`).then(async(msg) => await msg.delete({timeout: 5000}));
        player.destroy();
    });

}




/*const filter = ( button ) => button.clicker.id === button.clicker.id;
        const buttonCollector = MESSAGE.createButtonCollector(filter);
        const menuCollector = MESSAGE.createMenuCollector(filter);
        buttonCollector.on('collect', async (b) =>{
            if(player.playing){
                await b.reply.defer();
                if(b.id == 'pause'){
                    if(!player.paused){
                        player.pause(true);
                        await musicChannel.send(':white_check_mark: ทำการหยุดเพลงชั่วคราวเรียบร้อยเเล้วค่ะ').then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                    if(player.paused){
                        player.pause(false);
                        await musicChannel.send(':white_check_mark: ทำการเล่นเพลงต่อเเล้วค่ะ').then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                }
                else if(b.id == 'skip'){
                    player.stop();
                    await musicChannel.send(':white_check_mark: ทำการข้ามเพลงให้เรียบร้อยเเล้วค่ะ').then(async(msg) => await msg.delete({timeout: 5000}));
                }
                else if(b.id == 'stop'){
                    if(player.playing){
                        player.destroy();
                        await musicChannel.send(':white_check_mark: ทำการปิดเพลงเรียบร้อยเเล้วค่ะ').then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                }
                else if(b.id == 'loop'){
                    if(!player.trackRepeat && !player.queueRepeat){
                        player.setTrackRepeat(false)
                        player.setQueueRepeat(true);
                        await musicChannel.send(`:white_check_mark: ทำการเปิดการวนซ้ำเพลงเเบบ \`ทั้งหมด\` เรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                    else if(player.queueRepeat && !player.trackRepeat){
                        player.setQueueRepeat(false);
                        player.setTrackRepeat(true);
                        await musicChannel.send(`:white_check_mark: ทำการเปิดการวนซ้ำเพลงเเบบ \`เพลงเดียว\` เรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                    else if(!player.queueRepeat && player.trackRepeat){
                        player.setQueueRepeat(false);
                        player.setTrackRepeat(false);
                        await musicChannel.send(`:white_check_mark: ทำการปิดวนซ้ำเพลงเรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                }
                else if(b.id == 'disconnect'){
                    player.destroy()
                    player.disconnect()
                    await musicChannel.send(':white_check_mark: ทำการตัดการเชื่อมต่อจากช่องเสียงเรียบร้อยเเล้วค่ะ').then(async(msg) => await msg.delete({timeout: 5000}));
                }
                else if(b.id == 'volup'){
                    let newVol = player.volume + 10;
                    if(newVol < 100){
                        player.setVolume(newVol);
                        await musicChannel.send(`:white_check_mark: ทำการปรับความดังเสียงเป็น \`${newVol}\` เรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                    else if(newVol > 100){
                        await musicChannel.send(`:white_check_mark: ไม่สามารถปรับความดังเสียงได้มากกว่านี้เเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                }
                else if(b.id == 'voldown'){
                    let newVol = player.volume - 10;
                    if(newVol > 0){
                        player.setVolume(newVol);
                        await musicChannel.send(`:white_check_mark: ทำการปรับความดังเสียงเป็น \`${newVol}\` เรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }   
                    else if(newVol < 0){
                        await musicChannel.send(`:white_check_mark: ไม่สามารถปรับความดังเสียงได้น้อยกว่านี้เเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }                 
                }
                else if(b.id == 'mute'){
                    if(player.volume > 0){
                        player.setVolume(0);
                        await musicChannel.send(`:white_check_mark: ทำการปิดเสียงเรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                    else if(player.volume == 0){
                        player.setVolume(player.options.volume);
                        await musicChannel.send(`:white_check_mark: ทำการเปิดเสียงเรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                }
            }
            else{
                await b.reply.defer();
            }
        });
        menuCollector.on("collect", async(b, menu) =>{
            if(b.values[0] == "dddasd") {

            }
            await b.reply.defer();
        });
        
        */