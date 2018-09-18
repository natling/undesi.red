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
			randomize : () => this.opacity.value = f.randomIntegerInclusive(settings.video.opacity.min, settings.video.opacity.max),
			update    : () => this.video.style.opacity = this.opacity.value,
			cycle     : () => {
				this.opacity.randomize();
				this.opacity.update();

				const delay = f.randomIntegerInclusive(settings.video.opacity.delay.min, settings.video.opacity.delay.max);
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

		this.filter = {
			randomize : () => {
				this.filter.value = {
					brightness : f.randomIntegerInclusive(settings.video.filter.brightness.min, settings.video.filter.brightness.max),
					contrast   : f.randomIntegerInclusive(settings.video.filter.contrast.min,   settings.video.filter.contrast.max),
					hueRotate  : f.randomIntegerInclusive(settings.video.filter.hueRotate.min,  settings.video.filter.hueRotate.max),
					saturate   : f.randomIntegerInclusive(settings.video.filter.saturate.min,   settings.video.filter.saturate.max),
				};
			},

			update : () => {
				const brightness = 'brightness(' + this.filter.value.brightness + '%)';
				const contrast   = 'contrast('   + this.filter.value.contrast   + '%)';
				const hueRotate  = 'hue-rotate(' + this.filter.value.hueRotate  + 'deg)';
				const saturate   = 'saturate('   + this.filter.value.saturate   + '%)';

				const filter = f.shuffleArray([brightness, contrast, hueRotate, saturate]).join(' ');
				this.video.style.filter = filter;
			},

			cycle : () => {
				this.filter.randomize();
				this.filter.update();

				const delay = f.randomIntegerInclusive(settings.video.filter.delay.min, settings.video.filter.delay.max);
				setTimeout(this.filter.cycle, delay);
			},
		};
	}

	play() {
		this.video = document.createElement('video');
		settings.container.appendChild(this.video);

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
			min :  0,
			max : 63,

			delay : {
				min :  8000,
				max : 16000,
			},
		},

		opacity : {
			min :  0,
			max : 50,

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
	},

	body : {
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
	},
};

const f = {
	randomIntegerInclusive : (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

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

settings.bodyFilter = {
	randomize : () => {
		settings.bodyFilter.value = {
			brightness : f.randomIntegerInclusive(settings.body.filter.brightness.min, settings.body.filter.brightness.max),
			contrast   : f.randomIntegerInclusive(settings.body.filter.contrast.min,   settings.body.filter.contrast.max),
			hueRotate  : f.randomIntegerInclusive(settings.body.filter.hueRotate.min,  settings.body.filter.hueRotate.max),
			saturate   : f.randomIntegerInclusive(settings.body.filter.saturate.min,   settings.body.filter.saturate.max),
		};
	},

	update : () => {
		const brightness = 'brightness(' + settings.bodyFilter.value.brightness + '%)';
		const contrast   = 'contrast('   + settings.bodyFilter.value.contrast   + '%)';
		const hueRotate  = 'hue-rotate(' + settings.bodyFilter.value.hueRotate  + 'deg)';
		const saturate   = 'saturate('   + settings.bodyFilter.value.saturate   + '%)';

		const filter = f.shuffleArray([brightness, contrast, hueRotate, saturate]).join(' ');
		document.body.style.filter = filter;
	},

	cycle : () => {
		settings.bodyFilter.randomize();
		settings.bodyFilter.update();

		const delay = f.randomIntegerInclusive(settings.body.filter.delay.min, settings.body.filter.delay.max);
		setTimeout(settings.bodyFilter.cycle, delay);
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
		settings.cover.card.style.opacity = 1;
		settings.cover.title.style.filter = 'blur(0px)';
		settings.cover.title.style.transitionTimingFunction = 'ease';

		if (settings.playing) {
			setTimeout(() => {
				settings.playing = false;
				settings.cover.title.style.cursor = 'pointer';
			}, settings.cover.transitionDuration * 1000);
		}
	},

	hide : () => {
		settings.cover.card.style.opacity = 0;
		settings.cover.title.style.filter = 'blur(16px)';
		settings.cover.title.style.cursor = 'default';
		settings.cover.title.style.transitionTimingFunction = 'ease-out';
	},

	play : () => {
		if (! settings.playing) {
			settings.playing = true;
			settings.cover.hide();
			settings.cover.music.play();
			setTimeout(settings.cover.show, (settings.cover.music.duration - settings.cover.transitionDuration) * 1000);
		}
	},
};

f.setup = () => {
	setTimeout(settings.cover.show, 0);
	settings.cover.setTransitionDurations();
	settings.cover.title.onclick = settings.cover.play;
	settings.bodyFilter.cycle();
	settings.container = document.getElementById('container');
	settings.paths.forEach(path => new Video(path).play());
}

f.setup();