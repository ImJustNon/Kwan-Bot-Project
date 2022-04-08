const manager = require('../../handlers/manager.js');
const db = require('../../../database/quickmongo.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const setting = require('../../../data/setting.js');
const { youtubeThumbnail } = require('../../utils/trackimage.js');
const { convertTime } = require('../../utils/convert.js');
const { Player } = require('discord-player');

module.exports = async(client, message) =>{
    let player = await manager.players.get(message.guild.id);

    if(player){
        let musicChannelID = await db.get(`music_${player.guild}_channel`);
        let trackEmbedID = await db.get(`music_${player.guild}_track_message`);
        let queueMessageID = await db.get(`music_${message.guild.id}_queue_message`);

        let musicChannel = client.channels.cache.get(musicChannelID);
        let trackEmbed = await musicChannel.messages.cache.get(trackEmbedID);
        let queueMessage = await musicChannel.messages.cache.get(queueMessageID);


        let Queue_message = `**คิวเพลง:**\n`;
        for(let i = 0; i < player.queue.length; i++) {
            Queue_message += `\`${i + 1})\` [${convertTime(player.queue[i].duration)}] - ${player.queue[i].title}\n`;
        }

        client.on('clickButton', async (b) =>{
            if(player.playing){
                await b.reply.defer();
                //if(b.guild.me.voice.channel && !b.member.voice.channel.equals(b.guild.me.voice.channel)) return musicChannel.send(`:warning: <@${b.clicker.user.id}> ดูเหมือนว่าคุณจะไม่ได้อยู่ในช่องเสียงเดียวกันน่ะคะ`);

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
                else if(b.id == 'shuffle'){
                    if(!player.queue || !player.queue.length || player.queue.length == 0){
                        await musicChannel.send(':warning: เอ๊ะ! ดูเหมือนว่าคิวของคุณจะไม่มีความยาวมากพอน่ะคะ').then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                    else{
                        await player.queue.shuffle();
                        await musicChannel.send(':white_check_mark: ทำการสุ่มเรียงรายการคิวใหม่เรียบร้อยเเล้วค่ะ').then(async(msg) => await msg.delete({timeout: 5000}));
                        await queueMessage.edit(Queue_message);
                    }
                }
                else if(b.id == 'volup'){
                    let newVol = player.volume + 10;
                    if(newVol < 110){
                        player.setVolume(newVol);
                        await musicChannel.send(`:white_check_mark: ทำการปรับความดังเสียงเป็น \`${newVol}\` เรียบร้อยเเล้วค่ะ`).then(async(msg) => await msg.delete({timeout: 5000}));
                    }
                    else if(newVol >= 110){
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
        });

        /*
        client.on("clickMenu", async(b) =>{
            if(b.values[0] == "radio") {
                chooseRadio()
            }
            await b.reply.defer();
        });

        async function chooseRadio(){
            let b18k = new MessageMenu()
                .setLabel('18K-Radio')
                .setEmoji('👑') 
                .setValue('18k')
                .setDescription('[เปิดเพลงจากสถานีวิทยุ 18k]')
            let select = new MessageMenu()
                .setID('selector')
                .setPlaceholder('กดเลือกตรงนี้ได้เลยน่ะ')
                .setMaxValues(1)
                .setMinValues(1)
                .addOptions(b18k)

            const Sendmenu = await musicChannel.send(':radio: โปรดเลือกสถานีวิทยุ จากด้านล่างนี้ได้เลยค่ะ :arrow_down:', select, true);
            const filter = ( button ) => button.clicker.id === button.clicker.id;
            let collector = Sendmenu.createMenuCollector(filter, { time : 15000 });
            collector.on("collect", (b) =>{
                if(b.values[0] == "18k"){
                    RadioStation(radioStation.ecq_18k,b);
                }
                else if(b.values[0] == "radio"){

                }
            });


            async function RadioStation(url,b){
                if(!channel){  
                    return musicChannel.send(':warning: โปรดเข้าช่องเสียงก่อนเปิดเพลงน่ะคะ').then((msg) => msg.delete({timeout: 5000 })); 
                }
                if(player.playing){
                    let res = await manager.search(url, b.clicker.user);
                    player.queue.add(res.tracks[0]);
                }
                else{
                    if(!player){
                        player = await manager.create({
                            guild : b.guild.id,
                            textChannel : b.channel.id, 
                            selfDeafen : false,
                            selfMute : false,
                            voiceChannel : b.member.voice.channel.id,
                            volume : 80,
                        });
                        if(player.state !== "CONNECTED") await player.connect();
                        let res = await manager.search(url, message.author);
                        player.queue.add(res.tracks[0]);

                    }
                }
                await queueMessage.edit(Queue_message);
            }
        }
        */
    }
}