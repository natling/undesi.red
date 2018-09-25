class Video {

	constructor(source) {
		this.source = source;

		this.zIndex = {
			randomize : () => this.zIndex.value = f.randomIntegerInclusive(settings.video.zIndex.min, settings.video.zIndex.max),
			update    : () => this.video.style.zIndex = this.zIndex.value,
			cycle     : () => {
				this.zIndex.randomize();
				this.zIndex.update();

				const delay = f.randomIntegerInclusive(settings.video.zIndex.delay.min, settings.video.zIndex.delay.max);
				setTimeout(this.zIndex.cycle, delay);
			},
		};

		this.opacity = {
			randomize : () => this.opacity.value = f.randomFloat(settings.video.opacity.min, settings.video.opacity.max),
			update    : () => this.video.style.opacity = this.opacity.value,
			cycle     : () => {
				this.opacity.randomize();
				this.opacity.update();

				const delay = f.randomIntegerInclusive(settings.video.opacity.delay.min, settings.video.opacity.delay.max);
				this.video.style.transitionDuration = delay / 1000 + 's';
				setTimeout(this.opacity.cycle, delay);
			},
		};

		this.blendMode = {
			randomize : () => this.blendMode.value = f.randomItem(settings.video.blendMode.list),
			update    : () => this.video.style.mixBlendMode = this.blendMode.value,
			cycle     : () => {
				this.blendMode.randomize();
				this.blendMode.update();

				const delay = f.randomIntegerInclusive(settings.video.blendMode.delay.min, settings.video.blendMode.delay.max);
				setTimeout(this.blendMode.cycle, delay);
			},
		};
	}

	play() {
		this.video = document.createElement('video');
		settings.filter.div.appendChild(this.video);

		const source = document.createElement('source');
		this.video.appendChild(source);
		source.src = this.source;

		this.video.loop     = true;
		this.video.muted    = true;
		this.video.autoplay = true;

		this.zIndex.cycle();
		this.opacity.cycle();
		this.blendMode.cycle();
	}
}

const settings = {
	paths : [
		'25004936_496318364071693_8757687119704489984_n.mp4',
		'25028375_1935891253118370_7867467903937806336_n.mp4',
		'26881144_779335842252297_560437019596029952_n.mp4',
		'27063132_154915628500991_975729841376591872_n.mp4',
		'27531178_2031479350463132_2907359690188914688_n.mp4',
		'27679305_152723948855490_457664791574478848_n.mp4',
		'29002521_1687530844640841_8282464596313243648_n.mp4',
		'30040565_218742602040378_1773007807398805504_n.mp4',
	],

	video : {
		zIndex : {
			min : 0,
			max : 7,

			delay : {
				min :  8000,
				max : 16000,
			},
		},

		opacity : {
			min : 0,
			max : 0.5,

			delay : {
				min :  8000,
				max : 16000,
			},
		},

		blendMode : {
			list : [
				'multiply',
				'screen',
				'overlay',
				'darken',
				'lighten',
				'color-dodge',
				'color-burn',
				'hard-light',
				'soft-light',
				'difference',
				'exclusion',
				'hue',
				'saturation',
				'color',
				'luminosity',
			],

			delay : {
				min :  8000,
				max : 16000,
			},
		},
	},

	tint : {
		hue : {
			min :   0,
			max : 360,
		},

		saturation : 100,

		lightness : {
			min : 25,
			max : 75,
		},

		alpha : {
			min : 0.5,
			max : 1,
		},

		delay : {
			min :  8000,
			max : 16000,
		},
	},

	filter : {
		brightness : {
			min :  100,
			max : 1000,
		},

		contrast : {
			min :  100,
			max : 1000,
		},

		hueRotate : {
			min :   0,
			max : 360,
		},

		saturate : {
			min :  100,
			max : 1000,
		},

		delay : {
			min :  8000,
			max : 16000,
		},
	},
};

const f = {
	randomIntegerInclusive : (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	randomFloat : (min, max) => Math.random() * (max - min) + min,

	randomItem : array => {
		return array[Math.floor(Math.random() * array.length)];
	},

	shuffleArray : array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	},
};

settings.tint = {
	...settings.tint,

	div : document.getElementById('tint'),

	randomize : () => {
		settings.tint.value = {
			hue        : f.randomIntegerInclusive(settings.tint.hue.min,       settings.tint.hue.max),
			saturation : settings.tint.saturation,
			lightness  : f.randomIntegerInclusive(settings.tint.lightness.min, settings.tint.lightness.max),
			alpha      : f.randomFloat(settings.tint.alpha.min,                settings.tint.alpha.max),
		};
	},

	update : () => {
		const hue        = settings.tint.value.hue;
		const saturation = settings.tint.value.saturation + '%';
		const lightness  = settings.tint.value.lightness  + '%';
		const alpha      = settings.tint.value.alpha;

		settings.tint.div.style.background = 'hsla(' + [hue, saturation, lightness, alpha].join(', ') + ')';
	},

	cycle : () => {
		settings.tint.randomize();
		settings.tint.update();

		const delay = f.randomIntegerInclusive(settings.tint.delay.min, settings.tint.delay.max);
		settings.tint.div.style.transitionDuration = delay / 1000 + 's';
		setTimeout(settings.tint.cycle, delay);
	},
};

settings.filter = {
	...settings.filter,

	div : document.getElementById('filter'),

	randomize : () => {
		settings.filter.value = {
			brightness : f.randomIntegerInclusive(settings.filter.brightness.min, settings.filter.brightness.max),
			contrast   : f.randomIntegerInclusive(settings.filter.contrast.min,   settings.filter.contrast.max),
			hueRotate  : f.randomIntegerInclusive(settings.filter.hueRotate.min,  settings.filter.hueRotate.max),
			saturate   : f.randomIntegerInclusive(settings.filter.saturate.min,   settings.filter.saturate.max),
		};
	},

	update : () => {
		const brightness = 'brightness(' + settings.filter.value.brightness + '%)';
		const contrast   = 'contrast('   + settings.filter.value.contrast   + '%)';
		const hueRotate  = 'hue-rotate(' + settings.filter.value.hueRotate  + 'deg)';
		const saturate   = 'saturate('   + settings.filter.value.saturate   + '%)';

		const filter = f.shuffleArray([brightness, contrast, hueRotate, saturate]).join(' ');
		settings.filter.div.style.filter = filter;
	},

	cycle : () => {
		settings.filter.randomize();
		settings.filter.update();

		const delay = f.randomIntegerInclusive(settings.filter.delay.min, settings.filter.delay.max);
		setTimeout(settings.filter.cycle, delay);
	},
};

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

settings.setup = () => {
	settings.videos = settings.paths.map(path => new Video(path));
	settings.videos.forEach(video => video.play());
	settings.tint.cycle();
	settings.filter.cycle();

	setTimeout(settings.cover.show, 0);
	settings.cover.setTransitionDurations();
	settings.cover.title.onclick = settings.cover.play;

	document.onkeydown = event => {
		if (event.key == 'Escape') {
			settings.cover.stop();
		}
	};
}

settings.setup();