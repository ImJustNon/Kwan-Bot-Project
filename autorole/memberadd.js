const db = require('../database/quickmongo.js');

module.exports = async(bot, member) =>{
    try{
        const roleCount = await db.get(`autorole_${member.guild.id}_count`);
        if(roleCount == null) return;

        let allRole = [];
        let i;
        for(i = 1; i < parseInt(roleCount) + 1; i++){
            let getRole = await db.get(`autorole_${member.guild.id}_${i}`);
            allRole.push(getRole);
        }

        let ii;
        for(ii = 0; ii < allRole.length; ii++){
            let CHECK_ROLE = await member.guild.roles.cache.find( r => r.id === allRole[ii]);
            if(!CHECK_ROLE) continue;
            if(member.guild.me.roles.highest.position > CHECK_ROLE.rawPosition){
                await member.roles.add(allRole[ii]);
            }
            else continue;
        }
    }
    catch(err){
        console.log(err);
    }
}
