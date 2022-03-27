module.exports = {
    mainbot:{
        Prefix: '',
        Token: '',
        Permission: '', //150314937471
        OwnerID: '',
        ClientID: '',
        ClientSecret: '',
        logChannel: '',
        errorlogChannel: '',
        embed: {
            helpthumbnail: {
                game: 'https://cdn.discordapp.com/attachments/933667577207611402/945289748631662592/giphy.gif',
                imagegen: 'https://cdn.discordapp.com/attachments/933667577207611402/945290880401694720/giphy_1.gif',
                tool: 'https://cdn.discordapp.com/attachments/933667577207611402/945291436990033970/giphy_2.gif',
                search: 'https://cdn.discordapp.com/attachments/933667577207611402/945291687062806558/giphy_3.gif',
                music: 'https://cdn.discordapp.com/attachments/933667577207611402/945291877870088242/giphy_4.gif',
                filter: 'https://cdn.discordapp.com/attachments/933667577207611402/945292045822590986/giphy_5.gif',
                meme: 'https://cdn.discordapp.com/attachments/933667577207611402/945292343513350205/giphy_6.gif',
                nsfw: 'https://cdn.discordapp.com/attachments/933667577207611402/945293974556512326/nsfw-levels.gif',
                moderation: 'https://cdn.discordapp.com/attachments/933667577207611402/945294299128537118/engine-engineer.gif',
                setting: 'https://cdn.discordapp.com/attachments/933667577207611402/945294637512396840/art-line-art.gif',
                random: 'https://cdn.discordapp.com/attachments/933667577207611402/945296236766969877/giphy_8.gif',
            },
            helpbanner: [
                'https://cdn.discordapp.com/attachments/831877886680104971/935426473337180200/helppanel.gif',
                'https://cdn.discordapp.com/attachments/831877886680104971/944542555079585842/standard_2.gif',
                'https://cdn.discordapp.com/attachments/831877886680104971/944544448266768414/standard_3.gif',
                'https://cdn.discordapp.com/attachments/831877886680104971/944546478549004309/standard_4.gif',
                'https://cdn.discordapp.com/attachments/831877886680104971/944551164853223424/standard_5.gif',
            ],
            rainbow_line_1: 'https://cdn.discordapp.com/attachments/945631084861849600/945631169427423242/rainbow_line_1.gif',
        },
    },
    information: {
        github: '',
        website: '',
        supportServer: '',
        invitelink: '',
    },
    website: {
        enable: false,
        port: 8080,
    },
    emoji : {
        off: ':x:',
        error: ':warning:',
        queue: ':bar_chart:',
        music: ':notes:',
        success: ':white_check_mark:',
        room: ':house_with_garden:',
        search: ':mag:',
        loading:':hourglass_flowing_sand:',
        door: ':door:',
        volume_0: ':speaker:',
        volume_1: ':sound:',
        volume_2: ':loud_sound:',
        outbox: ':outbox_tray:',
        inbox: ':inbox_tray:',
        bear: ':teddy_bear:',
        relax_face: ':relaxed:', 
        figure_down: ':point_down:',
        duration: ':tickets:',
        request: ':envelope_with_arrow:',
        bot: ':snowman:',
        guitar: ':guitar:', 
        control_knobs: ':control_knobs:',
        diamond: ':gem:',
        mod: ':safety_vest:',
        fun: ':tada:',
        pic: ':frame_photo:',
        tool: ':tools:',
        rocket: ':rocket:', 
        setup: ':gear:',
        random: ':performing_arts:',
        music_filter: ':control_knobs:',
        voicechannel: ':microphone2:',
        stats: ':bar_chart:',
        xp: ':chart_with_upwards_trend:',
        lock: {
            locked: ':lock:',
            unlock: ':unlock:',
            lockwithkey: ':closed_lock_with_key:',
        },
        shield: ':shield:',
        confetti_ball: ':confetti_ball:',
    },
    api: {
        imageapi: '',
        youtubeapi: '',
        openweatherapi: '',
        imdbapi: '',
        tenorapi:'',
        giphyapi: '',
        somerandomapi: '',
        detectLanguageAPI: '',
    },
    music: {
        lavalink: {
            id: 'main',
            host: 'localhost',
            port: 2333,
            pass: 'lovelamy',
            secure: false,
        },
        spotify: {
            enable: false, // <== have little Bug !
            id: '',
            secret: '',
            spotify_playlist_page_limit: 100,
        },
    }, 
    database: {
        mongodburl: '',
        mongodburl2: '',
    },
    image: {
        transparent: 'https://cdn.discordapp.com/attachments/933667577207611402/955762797814366308/HD_transparent_picture.png',
    },
}
