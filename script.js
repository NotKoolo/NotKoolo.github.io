var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform );

jQuery(function ($) {
    var supportsAudio = !! document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false;
        mediaPath = 'https://archive.org/download/em-r3_202501/',
        extension = '',
        tracks = [{
            "track": 1,
            "name": "Marshall Powers - April 2018 prod. Dr. Dre",
            "length": "02:11",
            "file": "Track_1"
        }, {
            "track": 2,
            "name": "Love Drunk - March 17, 2009 prod. Dr. Dre",
            "length": "03:42",
            "file": "Track_2"
        }, {
            "track": 3,
            "name": "I'm Twisted - (Freestyle) July 2017 prod. Illa",
            "length": "01:31",
            "file": "Track_3"
        }, {
            "track": 4,
            "name": "Sociopath - (feat. 50 Cent) 2009 prod. Dr. Dre",
            "length": "03:21",
            "file": "Track_4"
        }, {
            "track": 5,
            "name": "I'm Sorry - (Seasons)",
            "length": "04:43",
            "file": "Track_5"
        }, {
            "track": 6,
            "name": "Follow Me - (feat. Nate Dogg) December 2005 prod. Scott Storch",
            "length": "04:26",
            "file": "Track_6"
        }, {
            "track": 7,
            "name": "Key to My Room - July 2009 (before Hawaii)",
            "length": "04:05",
            "file": "Track_7"
        }, {
            "track": 8,
            "name": "Trade Off - (feat. Slaughterhouse) 2015, prod. Just Blaze",
            "length": "04:55",
            "file": "Track_8"
        }, {
            "track": 9,
            "name": "Jump Out - (Dr. Dre Reference) August 2006 prod. Mr. Porter",
            "length": "04:01",
            "file": "Track_9"
        }, {
            "track": 10,
            "name": "Ritz - August 2013 prod. Eminem Resto",
            "length": "04:30",
            "file": "Track_10"
        }, {
            "track": 11,
            "name": "Freak - (feat. Anderson .Paak & Westside Boogie) June 2017 prod. Mr. Porter",
            "length": "03:41",
            "file": "Track_11"
        }, {
            "track": 12,
            "name": "Take It - (Freestyle) Verse 2001, hook 2003, intro March 2008",
            "length": "01:38",
            "file": "Track_12"
        }, {
            "track": 13,
            "name": "Antichrist – Skit April 6, 2005",
            "length": "00:38",
            "file": "Track_13"
        }, {
            "track": 14,
            "name": "Antichrist - April 6, 2005",
            "length": "03:53",
            "file": "Track_14"
        }, {
            "track": 15,
            "name": "Sexual Healing - (w/ Dr. Dre (“Is This Love” reference))",
            "length": "03:26",
            "file": "Track_15"
        }, {
            "track": 16,
            "name": "Sexual Healing - (feat. Dr. Dre)",
            "length": "03:30",
            "file": "Track_16"
        }, {
            "track": 17,
            "name": "Back and Forth - (Discombobulated ‘09)",
            "length": "03:58",
            "file": "Track_17"
        }, {
            "track": 18,
            "name": "Paul – Skit",
            "length": "00:32",
            "file": "Track_18"
        }, {
            "track": 19,
            "name": "Christopher Reeves - (Brand New Dance’ 04)",
            "length": "03:17",
            "file": "Track_19"
        }, {
            "track": 20,
            "name": "My Darling - (2007 version)",
            "length": "06:11",
            "file": "Track_20"
        }, {
            "track": 21,
            "name": "Careful - What You Wish For ’06",
            "length": "06:04",
            "file": "Track_21"
        }, {
            "track": 22,
            "name": "This Is - (“Survival” Demo)",
            "length": "04:27",
            "file": "Track_22"
        }, {
            "track": 23,
            "name": "Stepping Stones - (OG version)",
            "length": "05:32",
            "file": "Track_23"
        }, {
            "track": 24,
            "name": "My First Single - (alt. version)",
            "length": "05:03",
            "file": "Track_24"
        }, {
            "track": 25,
            "name": "Little Engine - (v1)",
            "length": "03:01",
            "file": "Track_25"
        }, {
            "track": 26,
            "name": "No Regrets - (Demo)",
            "length": "03:25",
            "file": "Track_26"
        }, {
            "track": 27,
            "name": "Smack You - (Suge and Ja Rule Diss)",
            "length": "05:27",
            "file": "Track_27"
        }, {
            "track": 28,
            "name": "Renaissance Studio Version",
            "length": "01:38",
            "file": "Track_28"
        }],
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Now Playing...');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Paused...');
        }).bind('ended', function () {
            npAction.text('Paused...');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
				console.log("Audio source:", audio.src);
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
					console.log("Audio source:", audio.src);
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
					console.log("Audio source:", audio.src);
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function (id) {
            loadTrack(id);
            audio.play();
			console.log("Audio source:", audio.src);
        };
		audio.onerror = function() {
    console.log("Failed to load audio file: " + audio.src);
};
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
