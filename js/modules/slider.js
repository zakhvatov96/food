function slider() {
	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prevBtn = document.querySelector('.offer__slider-prev'),
		nextBtn = document.querySelector('.offer__slider-next'),
		current = document.querySelector('#current'),
		total = document.querySelector('#total'),
		sliderWrapper = document.querySelector('.offer__slider-wrapper'),
		sliderField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(sliderWrapper).width;


	let slideIndex = 1,
		offset = 0;

	function deleteLetters (str) {
		return +str.replace(/\D/g, '');
	}


	function addZero () {
		if(slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;

	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}
	}

	addZero();

	sliderField.style.width = 100 * slides.length + '%';
	sliderField.style.display = 'flex';
	sliderField.style.transition = '0.5s all';

	sliderWrapper.style.overflow = 'hidden';

	console.log(width);


	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ul');
	let dots = [];

	indicators.classList.add('carousel-indicators');

	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;

	slider.append(indicators);

	for (let i = 0; i<slides.length; i++) {
		const dot = document.createElement('li');
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		dot.setAttribute('data-slide-to', i+1);

		indicators.append(dot);
		dots.push(dot);

		if(i === 0) {
			dot.style.opacity = 1;
		}
	};

	nextBtn.addEventListener('click', () => {
		if (offset == deleteLetters(width) * (slides.length-1)) {
			offset = 0;
		} else {
			offset +=  deleteLetters(width);
		}

		sliderField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex === slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		addZero();

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex-1].style.opacity = 1;
	});

	prevBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset =  deleteLetters(width) * (slides.length-1);
		} else {
			offset -=  deleteLetters(width);
		}

		sliderField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex === 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		addZero();

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex-1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			let slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;
			offset =  deleteLetters(width) * (slideTo-1);
			sliderField.style.transform = `translateX(-${offset}px)`;
			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex-1].style.opacity = 1;
			addZero();
		});
	});
}

module.exports = slider;