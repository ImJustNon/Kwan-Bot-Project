module.exports = {
    mainbot:{
        Prefix: 'k/',
        Token: 'OTMzNjYyODQ1OTA2ODYyMTEw.GkyV5W.c67T6vYxR7pI2vX3CRAjg0RlOsNHLFknAYY-k4',
        Permission: '8', //150314937471
        OwnerID: '708965153131200594',
        ClientID: '933662845906862110',
        ClientSecret: 'QnZY9TkqywvASTbPfc6U_-PjJE_zpgbc',
        logChannel: '944155202968248320',
        errorlogChannel: '956734858258960514',
		online_log_channel: '957828918696628244',
		offline_log_channel: '957828918696628244',
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
        github: 'https://github.com/ImJustNon/Kwan-Bot-Project.git',
        website: '',
        supportServer: '',
        invitelink: 'https://kwn-proj.netlify.app/invite',
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
        dash: ':dash:',
    },
    api: {
        imageapi: 'bb03f373caa534fcfcbaeae177a65134f44a6e57ba7a7b098be273867b376d8a677ddae3c23c6ded4fec8288573945e8c3483689deb13f229376ad4b5b60231d',
        youtubeapi: 'AIzaSyCxbnVT8gW9zXlw_W6E7TB8_482OhuyO38',
        openweatherapi: 'c6beb8aca641c6c7683c40abdf4779a5',
        imdbapi: '5e36f0db',
        tenorapi: 'N3J5SA3FY0AK',
        giphyapi: 'W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk',
        somerandomapi: 'pUVCA3c0WcVj95IeXgpS0Ub6jnHdBWrc4f0Q8U753zFgr3TcEwm9DHmry8TrOy6o',
        detectLanguageAPI: '4795a5285114d73fab5ea17bac331920',
    },
    music: {
        nodes: [ 
            {
                id: 'main',
                host: 'lavalink-replit-1.nonnyha5.repl.co',
                port: 443 ,
                password: 'maybeiwasboring',
                secure: true,
                retryAmount : Infinity,
                retryDelay : 3000,
            },
            /*{
                id: '22222',
                host: '45.141.26.82',
                port: 2333 ,
                password: 'reirin',
                secure: false,
                retryAmount : Infinity,
                retryDelay : 3000,
            },*/
        ],
        spotify: {
            enable: false,
            id: '14fb69255922464cbec11930cfeff379',
            secret: 'bce4acf93ebd4a13a11c88bd42424172',
            spotify_playlist_page_limit: 100,
        },
        autoplay: true,
        config: {
            defaultSupportImage: 'https://cdn.discordapp.com/attachments/933667577207611402/960360690772758559/standard_2.gif',
            defaultTrackImage: 'https://cdn.discordapp.com/attachments/933667577207611402/960358910185865316/standard.gif',
            embedColor: '#f70dff',
        },
        radioStation: {
            ecq_18k: 'http://112.121.151.133:8147/live',
        },
    }, 
    database: {
        mongodburl: 'mongodb+srv://Kwan-0111:LIVPbGPbI6fVLM9E@cluster0.rp8ie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        mongodburl2: 'mongodb+srv://LamyTheBestWaifu:qbzXXk91TaiwPwm0@cluster0.rp8ie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    },
    image: {
        transparent: 'https://cdn.discordapp.com/attachments/933667577207611402/955762797814366308/HD_transparent_picture.png',
    },
}
