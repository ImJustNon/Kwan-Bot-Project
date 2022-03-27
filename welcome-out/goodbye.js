const Canvas = require('canvas');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('../database/quickmongo.js');
const validUrl = require('valid-url');
const isImageUrl = require('is-image-url');
const setting = require('../data/setting.js');

module.exports = async(bot, member) =>{
    try{
        const goodbyeActivate = await db.get(`goodbye_${member.guild.id}_activate`);
        const goodbyeChannel = await db.get(`goodbye_${member.guild.id}_goodbyechannel`);
        const goodbyeMessage = await db.get(`goodbye_${member.guild.id}_message`);
        const goodbyeBackgroundActivate = await db.get(`goodbye_${member.guild.id}_backgroundimage_activate`);
        const goodbyeBackgroundURL = await db.get(`goodbye_${member.guild.id}_backgroundimage`);
        const goodbyeFontColor = await db.get(`goodbye_${member.guild.id}_fontcolor`);
        const goodbyeTextInImage = await db.get(`goodbye_${member.guild.id}_textinimage`);

        
        const getChannel = member.guild.channels.cache.get(goodbyeChannel);
        if(goodbyeActivate == null) return;    
        if(!getChannel) return;

        let MESSAGE;
        let BACKGROUND_IMAGE;
        if(goodbyeMessage !== null) MESSAGE = `<@${member.id}> ${goodbyeMessage}`; //check massage
        else MESSAGE = null;
        if(goodbyeBackgroundURL !== null){ //check Image url
            if(isImageUrl(goodbyeBackgroundURL)){
                BACKGROUND_IMAGE = goodbyeBackgroundURL;
            }
            else{
                BACKGROUND_IMAGE = setting.image.transparent;
            }
        }
        else{
            BACKGROUND_IMAGE = setting.image.transparent;
        }

        let attachments;
        if(goodbyeBackgroundActivate !== null){
            let username = member.user.tag;
            let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: 1024});
            
            const goodbyeCavas = {};
            goodbyeCavas.create = Canvas.createCanvas(1024, 500);
            goodbyeCavas.context = goodbyeCavas.create.getContext('2d');
            goodbyeCavas.context.font = '72px sans-serif';
            goodbyeCavas.context.fillStyle = goodbyeFontColor || '#ffffff';

            await Canvas.loadImage(BACKGROUND_IMAGE).then(async(img) =>{
                goodbyeCavas.context.drawImage(img, 0, 0, 1024, 500);
                goodbyeCavas.context.fillText("Goodbye", 360, 360);
                goodbyeCavas.context.beginPath();
                goodbyeCavas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
                goodbyeCavas.context.stroke();
                goodbyeCavas.context.fill();
            });

            let canvas = goodbyeCavas;
            canvas.context.font = '42px sans-serif';
            canvas.context.textAlign = 'center';
            canvas.context.fillText(username, 512,410);
            canvas.context.font = '32px sans-serif';
            canvas.context.fillText(goodbyeTextInImage || ` `, 512, 455);
            canvas.context.beginPath();
            canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
            canvas.context.closePath();
            canvas.context.clip();
            await Canvas.loadImage(avatarURL).then(img =>{
                canvas.context.drawImage(img, 393, 47, 238, 238);
            });

            attachments = new MessageAttachment(canvas.create.toBuffer(), `goodbye-${member.id}.png`);
        }
        getChannel.send(MESSAGE, attachments);
    }
    catch(err){
        console.log(err);
    }
}