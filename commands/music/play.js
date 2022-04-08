const manager = require('../../music/handlers/manager.js');

module.exports = {
    config: {
        name: 'play',
        aliases: ['p'],
        description: 'play a song in voice channel',
    },
    run: async(client, message, args, prefix) =>{
        let channel = message.member.voice.channel;
        if(!args[0]) return message.lineReplyNoMention('โปรดระบุเพลงที่ต้องการจะให้เล่นด้วยน่ะคะ');
        
        if(!channel){
            return message.lineReplyNoMention(':warning: โปรดเข้าช่องเสียงก่อนใช้คำสั่งนี้น่ะคะ');
        }
        else if(message.guild.me.voice.channel && !channel.equals(message.guild.me.voice.channel)){ 
            return message.lineReplyNoMention(':warning: เอ๊ะ! ดูเหมือนว่าคุณจะไม่ได้อยู่ในช่องเสียงเดียวกันน่ะคะ');
        }
        else {
            let queary = args.join(' ');
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
            }
            if(player.state !== "CONNECTED") await player.connect();

            let res = await manager.search(queary, message.author);

            switch (res.loadType) {
                case "LOAD_FAILED": 
                {
                    if(player.queue.current) await player.destroy();
                    message.lineReplyNoMention(`:x: ไม่สามารถโหลดการค้นหาได้ โปรดลองอีกครั้งในภายหลังน่ะคะ`);
                }
                    break;
                case "NO_MATCHES": 
                {
                    if(player.queue.current) await player.destroy();
                    message.lineReplyNoMention(`:x: ไม่พบผลการค้นหาของ ${queary} ค่ะ`);
                }
                    break;
                case "PLAYLIST_LOADED": 
                {
                    await player.queue.add(res.tracks);
                    message.lineReplyNoMention(`ทำการเพิ่ม Playlist : ${res.playlist.name}  เข้าไปในคิวการเล่นเเล้วค่ะ`);
                    if(!player.playing){
                        await player.play();
                    }
                }

                    break;
                case "SEARCH_RESULT": 
                {
                    await player.queue.add(res.tracks[0]);
                    message.lineReplyNoMention(`ได้ทำการเพิ่มเพลง : ${res.tracks[0].title}  เข้าไปในคิวการเล่นเเล้วค่ะ`);
                    if(!player.playing){
                        await player.play();
                    }
                }
                    break;
                    case "TRACK_LOADED": 
                {
                    await player.queue.add(res.tracks[0]);
                    message.lineReplyNoMention(`ได้ทำการเพิ่มเพลง : ${res.tracks[0].title}  เข้าไปในคิวการเล่นเเล้วค่ะ`);
                    if(!player.playing){
                        await player.play(); 
                    }
                }
                    break;
                default:
                    break;
            }
        }  
    }
};