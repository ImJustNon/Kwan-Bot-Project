const Canvas = require('canvas');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('../database/quickmongo.js');
const validUrl = require('valid-url');
const isImageUrl = require('is-image-url');
const setting = require('../data/setting.js');

module.exports = async(bot, member) =>{
    try{
        const welcomeActivate = await db.get(`welcome_${member.guild.id}_activate`);
        const welcomeChannel = await db.get(`welcome_${member.guild.id}_welcomechannel`);
        const welcomeMessage = await db.get(`welcome_${member.guild.id}_message`);
        const welcomeBackgroundActivate = await db.get(`welcome_${member.guild.id}_backgroundimage_activate`);
        const welcomeBackgroundURL = await db.get(`welcome_${member.guild.id}_backgroundimage`);
        const welcomeFontColor = await db.get(`welcome_${member.guild.id}_fontcolor`);
        const welcomeTextInImage = await db.get(`welcome_${member.guild.id}_textinimage`);


        const getChannel = member.guild.channels.cache.get(welcomeChannel);
        if(welcomeActivate == null) return;    
        if(!getChannel) return;

        let MESSAGE;
        let BACKGROUND_IMAGE;
        if(welcomeMessage !== null) MESSAGE = `<@${member.id}> ${welcomeMessage}`; //check massage
        else MESSAGE = null;
        if(welcomeBackgroundURL !== null){ //check Image url
            if(isImageUrl(welcomeBackgroundURL)){
                BACKGROUND_IMAGE = welcomeBackgroundURL;
            }
            else{
                BACKGROUND_IMAGE = setting.image.transparent;
            }
        }
        else{
            BACKGROUND_IMAGE = setting.image.transparent;
        }

        let attachments;
        if(welcomeBackgroundActivate !== null){
            let username = member.user.tag;
            let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: 1024});
            
            const welcomeCavas = {};
            welcomeCavas.create = Canvas.createCanvas(1024, 500);
            welcomeCavas.context = welcomeCavas.create.getContext('2d');
            welcomeCavas.context.font = '72px sans-serif';
            welcomeCavas.context.fillStyle = welcomeFontColor || '#ffffff';

            await Canvas.loadImage(BACKGROUND_IMAGE).then(async(img) =>{
                welcomeCavas.context.drawImage(img, 0, 0, 1024, 500);
                welcomeCavas.context.fillText("Welcome", 360, 360);
                welcomeCavas.context.beginPath();
                welcomeCavas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
                welcomeCavas.context.stroke();
                welcomeCavas.context.fill();
            });

            let canvas = welcomeCavas;
            canvas.context.font = '42px sans-serif';
            canvas.context.textAlign = 'center';
            canvas.context.fillText(username, 512,410);
            canvas.context.font = '32px sans-serif';
            canvas.context.fillText(welcomeTextInImage || ` `, 512, 455);
            canvas.context.beginPath();
            canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
            canvas.context.closePath();
            canvas.context.clip();
            await Canvas.loadImage(avatarURL).then(img =>{
                canvas.context.drawImage(img, 393, 47, 238, 238);
            });

            attachments = new MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`);
        }
        getChannel.send(MESSAGE, attachments);
    }
    catch(err){
        console.log(err);
    }
}