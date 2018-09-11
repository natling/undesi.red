class Video {

	constructor(source) {
		this.source = source;

		this.zIndex = {
			randomize : () => this.zIndex.value = f.randomIntegerInclusive(settings.zIndex.value.min, settings.zIndex.value.max),
			update    : () => this.video.style.zIndex = this.zIndex.value,
			cycle     : () => {
				this.zIndex.randomize();
				this.zIndex.update();

				const delay = f.randomIntegerInclusive(settings.zIndex.delay.min, settings.zIndex.delay.max);
				setTimeout(this.zIndex.cycle, delay);
			},
		};

		this.blendMode = {
			randomize : () => this.blendMode.value = f.randomItem(settings.blendMode.value),
			update    : () => this.video.style.mixBlendMode = this.blendMode.value,
			cycle     : () => {
				this.blendMode.randomize();
				this.blendMode.update();

				const delay = f.randomIntegerInclusive(settings.blendMode.delay.min, settings.blendMode.delay.max);
				setTimeout(this.blendMode.cycle, delay);
			},
		};

		this.filter = {
			randomize : () => {
				this.filter.value = {
					brightness : f.randomIntegerInclusive(settings.filter.value.brightness.min, settings.filter.value.brightness.max),
					contrast   : f.randomIntegerInclusive(settings.filter.value.contrast.min,   settings.filter.value.contrast.max),
					hueRotate  : f.randomIntegerInclusive(settings.filter.value.hueRotate.min,  settings.filter.value.hueRotate.max),
					saturate   : f.randomIntegerInclusive(settings.filter.value.saturate.min,   settings.filter.value.saturate.max),
					opacity    : f.randomIntegerInclusive(settings.filter.value.opacity.min,    settings.filter.value.opacity.max),
				};
			},

			update : () => {
				const brightness = 'brightness(' + this.filter.value.brightness + '%)';
				const contrast   = 'contrast('   + this.filter.value.contrast   + '%)';
				const hueRotate  = 'hue-rotate(' + this.filter.value.hueRotate  + 'deg)';
				const saturate   = 'saturate('   + this.filter.value.saturate   + '%)';
				const opacity    = 'opacity('    + this.filter.value.opacity    + '%)';

				const filter = f.shuffleArray([brightness, contrast, hueRotate, saturate, opacity]).join(' ');
				this.video.style.filter = filter;
			},

			cycle : () => {
				this.filter.randomize();
				this.filter.update();

				const delay = f.randomIntegerInclusive(settings.filter.delay.min, settings.filter.delay.max);
				setTimeout(this.filter.cycle, delay);
			},
		};
	}

	createVideo() {
		this.video = document.createElement('video');
		document.body.appendChild(this.video);

		const source = document.createElement('source');
		this.video.appendChild(source);
		source.src = this.source;

		this.video.poster = settings.paths.poster;
		this.video.loop   = true;
		this.video.muted  = true;
	}

	play(position) {
		this.zIndex.cycle();
		this.blendMode.cycle();
		this.filter.cycle();

		this.video.currentTime = position * this.video.duration;
		this.video.autoplay = true;
	}
}

const settings = {
	paths : {
		videos : [
			'25004936_496318364071693_8757687119704489984_n.mp4',
			'25028375_1935891253118370_7867467903937806336_n.mp4',
			'26881144_779335842252297_560437019596029952_n.mp4',
			'27063132_154915628500991_975729841376591872_n.mp4',
			'27531178_2031479350463132_2907359690188914688_n.mp4',
			'27679305_152723948855490_457664791574478848_n.mp4',
			'29002521_1687530844640841_8282464596313243648_n.mp4',
			'30040565_218742602040378_1773007807398805504_n.mp4',
		],

		poster : 'DSC_9544.jpg',
	},

	zIndex : {
		value : {
			min :  0,
			max : 63,
		},

		delay : {
			min :  1000,
			max : 10000,
		},
	},

	blendMode : {
		value : [
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
			min :  1000,
			max : 10000,
		},
	},

	filter : {
		value : {
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

			opacity : {
				min :  50,
				max : 100,
			},
		},

		delay : {
			min :  1000,
			max : 10000,
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

f.createVideos = () => {
	settings.videos = settings.paths.videos.map(path => {
		const video = new Video(path);
		video.createVideo();
		return video;
	});

	const play = () => {
		if (settings.videos.some(video => isNaN(video.video.duration))) {
			setTimeout(play, 10);
		} else {
			const position = 0;
			settings.videos.forEach(video => video.play(position));
		}
	}

	play();
}

f.createVideos();