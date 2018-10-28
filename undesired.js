class Video {

	constructor(source) {
		this.source = source;

		this.zIndex = {
			randomize : () => this.zIndex.value = f.randomIntegerInRange(settings.video.zIndex),
			update    : () => this.video.style.zIndex = this.zIndex.value,
			cycle     : () => {
				this.zIndex.randomize();
				this.zIndex.update();

				const delay = f.randomIntegerInRange(settings.video.zIndex.delay);
				setTimeout(this.zIndex.cycle, delay);
			},
		};

		this.opacity = {
			randomize : () => this.opacity.value = f.randomFloatInRange(settings.video.opacity),
			update    : () => this.video.style.opacity = this.opacity.value,
			cycle     : () => {
				this.opacity.randomize();
				this.opacity.update();

				const delay = f.randomIntegerInRange(settings.video.opacity.delay);
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

				const delay = f.randomIntegerInRange(settings.video.blendMode.delay);
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

	randomIntegerInRange : range => f.randomIntegerInclusive(range.min, range.max),
	randomFloatInRange   : range => f.randomFloat(range.min, range.max),

	randomItem : array => array[Math.floor(Math.random() * array.length)],

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
			hue        : f.randomIntegerInRange(settings.tint.hue),
			saturation : settings.tint.saturation,
			lightness  : f.randomIntegerInRange(settings.tint.lightness),
			alpha      : f.randomFloatInRange(settings.tint.alpha),
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

		const delay = f.randomIntegerInRange(settings.tint.delay);
		settings.tint.div.style.transitionDuration = delay / 1000 + 's';
		setTimeout(settings.tint.cycle, delay);
	},
};

settings.filter = {
	...settings.filter,

	div : document.getElementById('filter'),

	randomize : () => {
		settings.filter.value = {
			brightness : f.randomIntegerInRange(settings.filter.brightness),
			contrast   : f.randomIntegerInRange(settings.filter.contrast),
			hueRotate  : f.randomIntegerInRange(settings.filter.hueRotate),
			saturate   : f.randomIntegerInRange(settings.filter.saturate),
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

		const delay = f.randomIntegerInRange(settings.filter.delay);
		setTimeout(settings.filter.cycle, delay);
	},
};


settings.setup = () => {
	settings.videos = settings.paths.map(path => new Video(path));
	settings.videos.forEach(video => video.play());
	settings.tint.cycle();
	settings.filter.cycle();
}

settings.setup();