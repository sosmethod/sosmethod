import {AuthUser} from '../+dialogs/+auth/auth-user';

export class Meditations {

    static links: string[] = [
        'classic_calm/calm_strength',
        'classic_calm/ease_comfort',
        'classic_calm/breathe',
        'classic_calm/into_silence',
        'classic_calm/sweet_spot',
        'classic_calm/easy_breath',
        'elevate/believe',
        'elevate/say_yes',
        'elevate/music_heart',
        'elevate/paint_life',
        'elevate/happy_reason',
        'elevate/this_moment',
        'relax/light_on',
        'relax/body_stars',
        'relax/connect',
        'relax/play_all_relax',
        'relax/serenity',
        'relax/tranquility',
        'relax/soothe',
        'relax/play_all_sleep',
        'affirming_word/grateful',
        'affirming_word/moon_rising',
        'affirming_word/divine_love',
        'affirming_word/bless_day',
        'affirming_word/francis',
        'love_forgiveness/love_you',
        'love_forgiveness/forgiveness',
        'love_forgiveness/thank_you',
        'emergency/breath',
    ];

    static audios: { [index: string]: { [index: string]: string } } = {
        'classic_calm/calm_strength': {
            '5 min': 'CALM & STRENGTH 5.mp3',
            '11 min': 'CALM & STRENGTH 11.mp3'
        },
        'classic_calm/ease_comfort': {
            '5 min': 'EASE & COMFORT 5.mp3',
            '11 min': 'EASE & COMFORT 11.mp3'
        },
        'classic_calm/breathe': {
            '5 min': 'Breathe Just Breathe 5.mp3',
            '11 min': 'Breathe Just Breathe 11.mp3'
        },
        'classic_calm/into_silence': {
            '5 min': 'Into The Silence 5.mp3',
            '11 min': 'Into The Silence 11.mp3'
        },
        'classic_calm/sweet_spot': {
            '5 min': 'THE SWEET SPOT 5.mp3',
            '11 min': 'THE SWEET SPOT 11.mp3'
        },
        'classic_calm/easy_breath': {
            '5 min': 'Easy Breath 5.mp3',
            '11 min': 'Easy Breath 11.mp3'
        },
        'relax/light_on': {
            '11 min': 'Turn On The Light 11.mp3'
        },
        'relax/body_stars': {
            '11 min': 'Body Of Stars 11.mp3'
        },
        'relax/connect': {
            '11 min': 'Connected 11.mp3'
        },
        'relax/play_all_relax': {
            'turn on the light': 'Turn On The Light 11.mp3',
            'body of stars': 'Body Of Stars 11.mp3',
            'connect': 'Connected 11.mp3'
        },
        'relax/serenity': {
            '11 min': 'SERENITY 11.mp3'
        },
        'relax/tranquility': {
            '11 min': 'Tranquility Sleep Meditation V3.mp3'
        },
        'relax/soothe': {
            '11 min': 'SOOTHE 11.mp3'
        },
        'relax/play_all_sleep': {
            'serenity': 'SERENITY 11.mp3',
            'tranquility': 'Tranquility Sleep Meditation V3.mp3',
            'soothe': 'SOOTHE 11.mp3'
        },
        'elevate/believe': {
            '7 min': 'I BELIEVE 7.mp3'
        },
        'elevate/say_yes': {
            '7 min': 'Say Yes 7.mp3'
        },
        'elevate/music_heart': {
            '5 min': 'MUSIC IN MY HEART 5.mp3'
        },
        'elevate/paint_life': {
            '7 min': 'PAINTING LIFE\'S CANVAS 7.mp3'
        },
        'elevate/happy_reason': {
            '5 min': 'Happy For No Reason V4 FINAL 5 min.mp3',
            '11 min': 'Day+1+and+3+-+Meditation+option+-+CALM+and+STRENGTH+11+min.mp3'
        },
        'elevate/this_moment': {
            '5 min': 'In This Moment 5.mp3',
            '11 min': 'In This Moment 11.mp3'
        },
        'affirming_word/grateful': {
            '5 min': 'I Am Grateful 5.mp3',
            'bonus': '/bonus/grateful'
        },
        'affirming_word/moon_rising': {
            '7 min': 'Moon Rising 7.mp3',
            '11 min': 'Moon Rising 11.mp3',
            'bonus': '/bonus/moon_rising'
        },
        'affirming_word/divine_love': {
            '7 min': 'DIVINE LOVE 7.mp3',
            '11 min': 'DIVINE LOVE 11.mp3',
            'bonus': '/bonus/divine_love'
        },
        'affirming_word/bless_day': {
            '7 min': 'I Bless This Day 7.mp3',
            '11 min': 'I Bless This Day 11.mp3',
            'bonus': '/bonus/bless_day'
        },
        'affirming_word/francis': {
            '5 min': 'Prayer of St Francis 5.mp3',
            '11 min': 'Prayer of St Francis 11.mp3',
            'bonus': '/bonus/st_francis'
        },
        'love_forgiveness/love_you': {
            '5 min': 'CONNECT 5.mp3',
            '11 min': 'CONNECT 11.mp3'
        },
        'love_forgiveness/forgiveness': {
            '5 min': 'THIS IS LOVE FORGIVEN 5.mp3',
            '11 min': 'THIS IS LOVE FORGIVEN 11.mp3'
        },
        'love_forgiveness/thank_you': {
            '5 min': 'Thank You, I Love You 5.mp3',
            '11 min': 'Thank You, I Love You 11.mp3'
        },
        'emergency/breath': {
            '5 min': 'Three Breath Awareness 5.mp3'
        }
    };

    static months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    static colorSeries: { [key: string]: string } = {
        'classic_calm': 'sos-circle-purple',
        'relax': 'sos-circle-green',
        'affirming_word': 'sos-circle-ruby',
        'elevate': 'sos-circle-gold',
        'love_forgiveness': 'sos-circle-blue',
        'emergency': 'sos-circle-coral'
    };

    static getLinkProps(link: string, time?: Date, user?: AuthUser) {
        const keys = Object.keys(Meditations.colorSeries);
        const s = (new RegExp(keys.join('|'), 'ig')).exec(link)[0];
        const m = (new RegExp(Meditations.links.join('|'), 'ig')).exec(link);
        const series = 'MEDITATIONS.TITLE.' + s;
        const meditation = 'MEDITATIONS.MEDITATE.' + (m ? m[0].split('/')[1] : '');
        return {
            series: s,
            color: 'sos-circle ' + (link.indexOf('play_all') > -1 ? 'popout' : Meditations.colorSeries[s]),
            meditation: meditation,
            seriesText: series,
            time: typeof time !== 'undefined' && time != null
                ? time
                : new Date(),
            url: <string>link,
            locked: Meditations.isLocked(user, link)
        };
    }

    static isLocked(u: AuthUser, seriesUri: string) {
        if ((seriesUri.indexOf('classic_calm') > -1 && seriesUri.indexOf('sweet_spot') > -1)
            || seriesUri.indexOf('classic_calm') > -1 && seriesUri.indexOf('calm_strength') > -1
            || seriesUri.indexOf('classic_calm') > -1 && seriesUri.indexOf('calm_strength') > -1
            || seriesUri.indexOf('elevate') > -1 && seriesUri.indexOf('believe') > -1) {
            return false;
        }
        return !u;

    }

}


