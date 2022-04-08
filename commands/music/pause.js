const manager = require('../../music/handlers/manager.js');

module.exports = {
    config: {
        name: 'pause',
        aliases: [],
        description: 'pause a song',
    },
    run: async(client, message, args, prefix) =>{
        let channel = message.member.voice.channel;
        let player = await manager.players.get(message.guild.id);
        if(!channel){
            return message.lineReplyNoMention(':warning: โปรดเข้าช่องเสียงก่อนใช้คำสั่งนี้น่ะคะ');
        }
        else if(!message.guild.me.voice.channel.equals(channel)){ 
            return message.lineReplyNoMention(':warning: เอ๊ะ! ดูเหมือนว่าคุณจะไม่ได้อยู่ในช่องเสียงเดียวกันน่ะคะ');
        }
        else if(!player || !player.queue.current){
            return message.lineReplyNoMention(':warning: เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้มีการเล่นเพลงในช่องของคุณเลยน่ะคะ');
        }
        else if(player.paused){
            return message.lineReplyNoMention(':warning: กำลังหยุดชั่วคราวอยู่ค่ะ');
        }
        else {
            await player.pause(true);
            message.lineReplyNoMention(':white_check_mark: ทำการหยุดชั่วคราวเพลงเรียบร้อยค่ะ');
        }  
    }
};