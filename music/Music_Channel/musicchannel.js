const manager = require('../handlers/manager.js');
const db = require('../../database/quickmongo.js');
const setting = require('../../data/setting.js');
const { convertTime } = require('../utils/convert.js');
const { youtubeThumbnail } = require('../utils/trackimage.js');
const { MessageEmbed } = require('discord.js');

module.exports = async(client, message) =>{
    //delete message
    message.delete({timeout: 1500});

    let channel = message.member.voice.channel;
    //import data from database
    let musicChannelID = await db.get(`music_${message.guild.id}_channel`);
    let supportMessageID = await db.get(`music_${message.guild.id}_support_message`);
    let trackMessageID = await db.get(`music_${message.guild.id}_track_message`);
    let queueMessageID = await db.get(`music_${message.guild.id}_queue_message`);
    //check data is valid
    let musicChannel = await message.guild.channels.cache.get(musicChannelID);
    let supportMessage = await musicChannel.messages.fetch(supportMessageID);
    let trackMessage = await musicChannel.messages.fetch(trackMessageID);
    let queueMessage = await musicChannel.messages.cache.get(queueMessageID);


    if(!musicChannel) return;
    if(!supportMessage) return;
    if(!trackMessage) return;
	if(!queueMessage) return;


    if(!channel){  
        message.channel.send(':warning: โปรดเข้าช่องเสียงก่อนเปิดเพลงน่ะคะ').then((msg) =>{
            msg.delete({timeout: 5000 });
        });
        return;
    }
    if(message.guild.me.voice.channel && !channel.equals(message.guild.me.voice.channel)){
        message.channel.send(':warning: เอ๊ะ! ดูเหมือนว่าคุณจะไม่ได้อยู่ในช่องเสียงเดียวกันน่ะคะ').then((msg) =>{
            msg.delete({timeout: 5000 });
        });
        return;
    }


    let queary = message.content;
    let player = await manager.players.get(message.guild.id);
    if(!player){
        player = await manager.create({
            guild : message.guild.id,
            textChannel : message.channel.id, 
            selfDeafen : false,
            selfMute : false,
            voiceChannel : channel.id,
            volume : 80,
        });
        require('./events/clickbutton.js')(client, message);
    }
    if(player.state !== "CONNECTED") await player.connect();
    let res = await manager.search(queary, message.author);

    switch (res.loadType) {
        case "LOAD_FAILED": 
        {
            if(player.queue.current) await player.destroy();
            message.channel.send(`:x: ไม่สามารถโหลดการค้นหาได้ โปรดลองอีกครั้งในภายหลังน่ะคะ`).then((msg) =>{
                msg.delete({timeout: 5000 });
            });
        }
            break;
        case "NO_MATCHES": 
        {
            if(player.queue.current) await player.destroy();
            message.channel.send(`:x: ไม่พบผลการค้นหาของ ${queary} ค่ะ`).then((msg) =>{
                msg.delete({timeout: 5000 });
            });
        }
            break;
        case "PLAYLIST_LOADED": 
        {
            await player.queue.add(res.tracks);
            message.channel.send(`:white_check_mark: ทำการเพิ่ม Playlist : ${res.playlist.name}  เข้าไปในคิวการเล่นเเล้วค่ะ`).then((msg) =>{
                msg.delete({timeout: 5000 });
            });
            if(!player.playing){
                await player.play();
            }
            Editembed()
        }

            break;
        case "SEARCH_RESULT": 
        {
            await player.queue.add(res.tracks[0]);
            message.channel.send(`:white_check_mark: ได้ทำการเพิ่มเพลง : ${res.tracks[0].title}  เข้าไปในคิวการเล่นเเล้วค่ะ`).then((msg) =>{
                msg.delete({timeout: 5000 });
            });
            if(!player.playing){
                await player.play();
            }
            Editembed()
        }
            break;
            case "TRACK_LOADED": 
        {
            await player.queue.add(res.tracks[0]);
            message.channel.send(`:white_check_mark: ได้ทำการเพิ่มเพลง : ${res.tracks[0].title}  เข้าไปในคิวการเล่นเเล้วค่ะ`).then((msg) =>{
                msg.delete({timeout: 5000 });
            });
            if(!player.playing){
                await player.play(); 
            }
            Editembed()
        }
            break;
        default:
            break;
    }

    async function Editembed(){
        if(player.playing){
            let Queue_message = `**คิวเพลง:**\n`;
            for(let i = 0; i < player.queue.length; i++) {
                Queue_message += `\`${i + 1})\` [${convertTime(player.queue[i].duration)}] - ${player.queue[i].title}\n`;
            }
            await queueMessage.edit(Queue_message);
        }
    }

};