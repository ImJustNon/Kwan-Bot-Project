const manager = require('../../music/handlers/manager.js');

module.exports = {
    config: {
        name: 'radio',
        aliases: [],
        description: 'play a song from radio station',
    },
    run: async(client, message, args, prefix) =>{
        let channel = message.member.voice.channel;
        let queary = args.join(' ');
        let player = await manager.players.get(message.guild.id);
        
        if(!args[0]) return message.lineReplyNoMention('โปรดระบุเพลงที่ต้องการจะให้เล่นด้วยน่ะคะ');
        
        if(!channel){
            return message.lineReplyNoMention(':warning: โปรดเข้าช่องเสียงก่อนใช้คำสั่งนี้น่ะคะ');
        }
        else if(message.guild.me.voice.channel && !channel.equals(message.guild.me.voice.channel)){ 
            return message.lineReplyNoMention(':warning: เอ๊ะ! ดูเหมือนว่าคุณจะไม่ได้อยู่ในช่องเสียงเดียวกันน่ะคะ');
        }
        else {
            
        }
    }
}