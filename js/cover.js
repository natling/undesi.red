settings.cover = {
	music : document.getElementById('music'),
	card  : document.getElementById('card'),
	title : document.getElementById('title'),

	transitionDuration : 12,

	setTransitionDurations : () => {
		settings.cover.card.style.transitionDuration  = settings.cover.transitionDuration + 's';
		settings.cover.title.style.transitionDuration = settings.cover.transitionDuration + 's';
	},

	show : () => {
		settings.cover.card.style.background = 'black';
		settings.cover.title.style.filter = 'blur(0px)';
		settings.cover.title.style.transitionTimingFunction = 'ease';
	},

	hide : () => {
		settings.cover.card.style.background = 'white';
		settings.cover.title.style.filter = 'blur(16px)';
		settings.cover.title.style.transitionTimingFunction = 'ease-out';
		settings.cover.title.style.cursor = 'default';
	},

	fade : (volume, duration) => {
		clearTimeout(settings.timer);
		duration /= 100;
		const step = (volume - settings.cover.music.volume) / duration;

		const adjust = () => {
			if (Math.abs(volume - settings.cover.music.volume) > Math.abs(step)) {
				settings.cover.music.volume += step;
				settings.timer = setTimeout(adjust, duration);
			} else {
				settings.cover.music.volume = volume;
			}
		}

		adjust();
	},

	play : () => {
		if (! settings.playing) {
			if (settings.cover.music.paused) {
				settings.cover.music.volume = 0;
				settings.cover.music.play();
			}

			settings.playing = true;
			settings.cover.hide();
			settings.cover.music.currentTime = 0;
			settings.cover.fade(1, settings.cover.transitionDuration * 1000);

			setTimeout(settings.cover.stop, (settings.cover.music.duration - settings.cover.transitionDuration) * 1000);
		}
	},

	stop : () => {
		if (settings.playing) {
			settings.cover.show();
			settings.cover.fade(0, settings.cover.transitionDuration * 1000);

			setTimeout(() => {
				settings.playing = false;
				settings.cover.title.style.cursor = 'pointer';
			}, settings.cover.transitionDuration * 1000);
		}
	},
};

settings.cover.setup = () => {
	setTimeout(settings.cover.show, 0);
	settings.cover.setTransitionDurations();
	settings.cover.title.onclick = settings.cover.play;

	document.onkeydown = event => {
		if (event.key == 'Escape') {
			settings.cover.stop();
		}
	};
}

settings.cover.setup();