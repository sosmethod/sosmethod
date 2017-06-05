import {AuthUser} from '../+dialogs/+auth/auth-user';

export class Series {

    static links: string[] = [
        '_5_day/essentials',
        '_11_day/essentials',
        '_5_day/soothing_relief',
        '_11_day/soothing_relief',
        '_5_day/improving_relationships',
        '_11_day/improving_relationships',
        '_5_day/focus_and_creativity',
        '_11_day/focus_and_creativity',
        '_5_day/kids',
        '_11_day/kids',
        '_5_day/pets',
        '_11_day/pets'
    ];

    static audios: { [key: string]: string[] } = {
        '_5_day/essentials': [
            'Day 1 - ESS 5 day Meditation Reinvented NEW FINAL copy.mp3',
            'Day 2 - ESS 5 day Epi Neuro V2 NEW FINAL 2017 copy.mp3',
            'Day 3 - ESS 5 Day Most Imp Thing NEW FINAL 2017 copy 2.mp3',
            'Day 4 - ESS 5 Day Stop Drop Roll NEW FINAL 2017 copy 2.mp3',
            'Day 5 - ESS 5day Excellence NEW FINAL 2017 copy.mp3'
        ],
        '_11_day/essentials': [
            '01 1 - 11 Day Essentials Overcoming Stumbling Blocks.mp3',
            '02 2 - 11 Day Neuroplasticity.mp3',
            '03 3 - 11 Day ESS Focus Fuel Action.mp3',
            '04 4 - 11 Day ESS Positivity Tool.mp3',
            '05 5 - 11 Day ESS Daydream.mp3',
            '06 6 - 11 DAY ESS Affirming Word.mp3',
            '07 7 - 11 Day ESS Mind Sculpting.mp3',
            '08 8 - 11 DAY ESS Possibility of 5.mp3',
            '09 9 - 11 Day Ess Greatest Teachers.mp3',
            '10 10 - 11 DAY ESS Brain Waves.mp3',
            '11 11 - 11 Day Ess Feeding the Mind Body.mp3'
        ],
        '_11_day/focus_and_creativity': [
            'Day 1 FC 11 Day Necessity of Creativity V2 NEW FINAL 2017 copy.mp3',
            'Day 2 FC 11 day Intention & To Do FINAL.mp3',
            'Day 3 FC 11 day HF Intention FINAL.mp3',
            'Day 4 FC 11 day Priorities FINAL.mp3',
            'Day 5 FC 11 day SO principal FINAL.mp3',
            'Day 6 FC 11 day Helpful Tension FINAL.mp3',
            'Day 7 FC 11 day Science of Intuition FINAL.mp3',
            'Day 8 FC 11 day Intuitive Abilities FINAL.mp3',
            'Day 9 FC 11 day Dynamic Messages FINAL.mp3',
            'Day 10 FC 11 day Passion & Trust FINAL.mp3',
            'Day 11 FC 11 day Future V2 FINAL.mp3'
        ],
        '_11_day/soothing_relief': [
            'Day 1 11 Day SR Being Open V2 FINAL.mp3',
            'Day 2 11 Day SR Healing Traditions V2 FINAL.mp3',
            'Day 3 11 Day SR Body\'s Potential V2 FINAL.mp3',
            'Day 4 11 Day SR Morning After Tool FINAL.mp3',
            'Day 5 11 Day SR Deepening Mindfulness V2 FINAL.mp3',
            'Day 6 11 Day SR Be In The Moment V2 FINAL.mp3',
            'Day 7 11 Day SR Hidden Inheritance V2 FINAL.mp3',
            'Day 8 11 Day SR Forgiveness Tool v2 FINAL.mp3',
            'Day 9 11 Day SR Regret Free FINAL.mp3',
            'Day 10 11 Day SR Complaints FINAL.mp3',
            'Day 11 11 Day SR Freedom FINAL.mp3'
        ],
        '_5_day/soothing_relief': [
            'Day 1 - 5 DAY Soothing Relief - WELCOME.mp3',
            'Day 2 - 5 DAY Soothing Relief - Epigenetics and You.mp3',
            'Day 3 - 5 DAY Soothing Relief - Rewind.mp3',
            'Day 4 - 5 DAY Soothing Relief - Clear The Slate.mp3',
            'Day 5 - 5 DAY Soothing Relief - Perception.mp3'
        ],
        '_5_day/focus_and_creativity': [
            'Day 1 - 5 DAY Focus & Creativity - Higher Mind Solutions.mp3',
            'Day 2 - 5 DAY Focus & Creativity - Mirror Neurons.mp3',
            'Day 3 - 5 DAY Focus & Creativity - Request Envision.mp3',
            'Day 4 - 5 DAY Focus & Creativity - Higher Mind.mp3',
            'Day 5 - 5 DAY Focus & Creativity - Value of Time.mp3'
        ],
        '_5_day/pets': [
            '01 1 HD 5 day ESS Meditation Reinvented FINAL.mp3',
            '01 2 HD 5day ESS Genetics V2 FINAL.mp3',
            '01 3 HD 5 day ESS Halo FINAL.mp3',
            '01 4 HD 5day ESS SDR Tool FINAL.mp3',
            '01 5 HD 5day ESS Excellent Adventures FINAL.mp3'
        ],
        '_5_day/improving_relationships': [
            'Day 1 - 5 DAY Improving Relationships - Cooperation & Love.mp3',
            'Day 2 - 5 DAY Improving Relationships - Power of Thought.mp3',
            'Day 3 - 5 DAY Improving Relationships - Conscious Communication.mp3',
            'Day 4 - 5 DAY Improving Relationships - Enhancing Self Esteem.mp3',
            'Day 5 - 5 DAY Improving Relationships - Changing the Conversation.mp3'
        ],
        '_5_day/kids': [
            'Day 1 SK 5day .mp3',
            'Day 2 SK 5day Super Skills FINAL.mp3',
            'Day 3 SK 5day Halo Effect FINAL.mp3',
            'Day 4 SK 5day SDR Tool FINAL.mp3',
            'Day 5 SK 5day Excellent Adventures FINAL',
        ]
    };

    static dailyMeditations: { [key: string]: string[][] } = {
        '_5_day/essentials': [[
            'classic_calm/sweet_spot',
            '/bonus/essentials_day_1'
        ], [
            'classic_calm/calm_strength',
            '/bonus/essentials_day_2'
        ], [
            'classic_calm/sweet_spot',
            '/bonus/essentials_day_3'
        ], [
            'classic_calm/calm_strength',
            '/tool/stop_drop'
        ], [
            'elevate/believe',
            '/bonus/essentials_day_5'
        ]],
        '_11_day/essentials': [[
            'classic_calm/breathe',
            '/bonus/essentials11_day_1',
        ], [
            'classic_calm/ease_comfort',
            '/bonus/essentials11_day_2',
        ], [
            'classic_calm/breathe',
            '/bonus/essentials11_day_3',
        ], [
            'elevate/say_yes',
            '/tool/positivity',
        ], [
            'classic_calm/ease_comfort',
            '/bonus/essentials11_day_5',
        ], [
            'affirming_word/grateful',
            '/bonus/essentials11_day_6',
        ], [
            'classic_calm/breathe',
            '/bonus/essentials11_day_7',
        ], [
            'affirming_word/grateful',
            '/tool/possibility_5',
        ], [
            'classic_calm/ease_comfort',
            '/bonus/essentials11_day_9',
        ], [
            'relax/serenity',
            '/bonus/essentials11_day_10',
        ], [
            'elevate/say_yes',
            '/bonus/essentials11_day_11',
        ]],
        '_5_day/soothing_relief': [[
            'emergency/breath',
            '/bonus/soothing_day_1',
        ], [
            'relax/light_on',
            '/bonus/soothing_day_2',
        ], [
            'classic_calm/into_silence',
            '/tool/rewind',
        ], [
            'elevate/music_heart',
            '/tool/stop_drop',
        ], [
            'affirming_word/grateful',
            '/bonus/soothing_day_5',
        ]],
        '_5_day/focus_and_creativity': [[
            'classic_calm/into_silence',
            '/bonus/creativity_day_1',
        ], [
            'relax/tranquility',
            '/bonus/creativity_day_2',
        ], [
            'elevate/paint_life',
            '/tool/envision',
        ], [
            'affirming_word/divine_love',
            '/bonus/creativity_day_4',
        ], [
            'elevate/believe',
            '/bonus/creativity_day_5',
        ]],
        '_5_day/improving_relationships': [[
            'elevate/this_moment',
            '/bonus/improving_day_1',
        ], [
            'relax/tranquility',
            '/bonus/improving_day_2',
        ], [
            'love_forgiveness/thank_you',
            '/tool/communication',
        ], [
            'classic_calm/easy_breath',
            '/bonus/improving_day_4',
        ], [
            'elevate/believe',
            '/bonus/improving_day_5'
        ]]
    };

    static colorSeries: { [key: string]: string } = {
        'essentials': 'sos-circle-purple',
        'soothing_relief': 'sos-circle-green',
        'improving_relationships': 'sos-circle-ruby',
        'focus_and_creativity': 'sos-circle-gold',
        'kids': 'sos-circle-blue',
        'pets': 'sos-circle-coral'
    };

    static seriesRegex = (s: string) => (/Day_([0-9]+)|[0-9]+_([0-9]+)/ig).exec(s.replace(/ |%20/ig, '_'));

    static getLinkProps(link: string, time?: Date, user?: AuthUser) {
        const match = Series.seriesRegex(link.split('/').pop());
        const keys = Object.keys(Series.colorSeries);
        const s = (new RegExp(keys.join('|'), 'ig')).exec(link)[0];
        const day = 'DISCOVERY.SUBTITLE.'
            + (link.indexOf('_11_day') > -1 ? '_11_day' : '_5_day')
            + '_' + s;
        const series = 'DISCOVERY.TITLE.'
            + (link.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') + '_' + s;
        return {
            series: s,
            color: 'sos-circle ' + Series.colorSeries[s],
            seriesText: series,
            day: day,
            time: typeof time !== 'undefined' && time != null
                ? time
                : new Date(),
            url: <string>link,
            locked: Series.isLocked(user, link),
            completed: Series.isCompleted(user, link)
        };
    }

    static isCompleted(user: AuthUser = null, seriesUri: string = '') {
        const urls = user != null && typeof user.completed !== 'undefined'
            ? Object.keys(user.completed).map(c => user.completed[c])
                .filter(c => c.indexOf(seriesUri) > -1)
                .map(l => {
                    const match = Series.seriesRegex(l.replace('#/', ''));
                    return match && parseInt(match[1] || match[2]) || 0;
                })
            : [];
        return urls.filter((u, i) => urls.indexOf(i + 1) > -1).length === (seriesUri.indexOf('_11_day') > -1 ? 11 : 5);
    }

    static isLocked(u: AuthUser = null, seriesUri: string = '') {
        if (seriesUri.indexOf('_5_day') > -1 && seriesUri.indexOf('essentials') > -1) {
            return false;
        }
        if (u != null && !Series.isCompleted(u, '_11_day/essentials') &&
            seriesUri.indexOf('_11_day') > -1 && seriesUri.indexOf('essentials') > -1) {
            return false;
        }
        if (Object.keys(Series.audios).filter((k) => seriesUri.indexOf(k) > -1).length === 0) {
            return true;
        }
        return !(u != null && Series.isCompleted(u, '_11_day/essentials'));
    }

}


