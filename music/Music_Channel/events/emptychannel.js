const db = require('../../../database/quickmongo.js');
const manager = require('../../handlers/manager.js');

module.exports = async(client) =>{
    client.on("voiceStateUpdate", async (oldMember, newMember) =>{
        let player = await manager.players.get(newMember.guild.id);
        if(player){
            const voiceChannel = newMember.guild.channels.cache.get(player.voiceChannel);
            if(player.playing && voiceChannel.members.size < 2){
                player.destroy();
                player.disconnect();
            }
        } 
    });
}
