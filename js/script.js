window.addEventListener('DOMContentLoaded', () => {


	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent () {
		tabsContent.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent (i = 0) {
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		if(e.target && e.target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i)=> {
				if (e.target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});



// Timer

const deadline = '2025-12-18';

function getTimeRemaining(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date());
	let days, hours, minutes, seconds;

	if (t <= 0) {
		days = 0;
		hours = 0;
		minutes = 0;
		seconds = 0;
	} else {
		  days = Math.floor(t/(1000*60*60*24)),
		  hours = Math.floor((t/(1000*60*60))%24),
		  minutes = Math.floor((t/1000/60)%60),
		  seconds = Math.floor((t/1000)%60);
	}

		  

	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
}

function getZero(num) {
	if(num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

function setClock(selector, endtime) {
	const timer = document.querySelector(selector),
		  days = timer.querySelector('#days'),
		  hours = timer.querySelector('#hours'),
		  minutes = timer.querySelector('#minutes'),
		  seconds =timer.querySelector('#seconds'),
		  timerId = setInterval(updateClock, 1000);

	updateClock();

	function updateClock() {
		const t = getTimeRemaining(endtime);
		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);

		if(t.total <= 0) {
			clearInterval(timerId);
		}
	}
}

setClock('.timer', deadline);

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
	  modal = document.querySelector('.modal');


function openModal() {
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	clearInterval(modalId);
}

function closeModal() {
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

modalTrigger.forEach(item => {
	item.addEventListener('click', () => {
		openModal();
	});
});


modal.addEventListener('click', (e) => {
	if(e.target === modal || e.target.getAttribute('data-close') === '') {
		closeModal();
	}
});

document.addEventListener('keydown', (e) => {
	if(e.code === 'Escape' && modal.classList.contains('show')) {
		closeModal();
	}
});

const modalId = setTimeout(openModal, 50000);

function showModalByScroll () {
	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
		openModal();
		window.removeEventListener('scroll', showModalByScroll);
	}
}

window.addEventListener('scroll', showModalByScroll);

class MenuCard {
	constructor (src, alt, title, descr, price, parentElement, ...classes) {
		this.src = src;
		this.alt = alt;
		this.title = title;
		this.descr = descr;
		this.price = price;
		this.classes = classes;
		this.parentElement = document.querySelector(parentElement);
		this.transfer = 27;
		this.changeToUAH();
	}

	changeToUAH() {
			this.price*=this.transfer;
	}

	render() {
		const div = document.createElement('div');
		if(this.classes.length === 0) {
			this.classes.push('menu__item');
		}
		this.classes.forEach((item) => {
			div.classList.add(item);
		});
		div.innerHTML = `
			<img src=${this.src} alt=${this.alt}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
`;
		this.parentElement.append(div);
	}
}

const getResource = async (url) => {
	const res = await fetch(url);

	if(!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}

	return await res.json();
};

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price})=>{
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	axios.get('http://localhost:3000/menu')
		.then(res=>{
			res.data.forEach(({img, altimg, title, descr, price})=> {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// Forms

const forms = document.querySelectorAll('form');

forms.forEach(form => {
	bindPostData(form);
});

const message = {
	loading: 'img/form/spinner.svg',
	success: 'Данные отправлены',
	failed: 'Что-то пошло не так'
};


const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
			body: data,
			headers: {
				'Content-type': 'application/json'
			}
	});

	return await res.json();
};


function bindPostData (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const statusMessage = document.createElement('img');
		statusMessage.src = message.loading;
		statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
		`;
		form.insertAdjacentElement('afterend', statusMessage);

		
		const formData = new FormData(form);


		const json = JSON.stringify(Object.fromEntries(formData.entries()));

		postData('http://localhost:3000/requests', json)
		.then(data => {
			console.log(data);
			showThanksModal(message.success);
			statusMessage.remove();
		}).catch(()=>{
			showThanksModal(message.failed);
		}).finally(()=>{
			form.reset();
		});

	});
	}

function showThanksModal(message) {
	const prevModalDialog = document.querySelector('.modal__dialog');
	prevModalDialog.classList.add('hide');
	openModal();
	const thanksModal = document.createElement('div');
	thanksModal.classList.add('modal__dialog');
	thanksModal.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">×</div>
			<div class="modal__title">${message}</div>
		</div>
	`;
	document.querySelector('.modal').append(thanksModal);

	setTimeout(()=>{		
		thanksModal.remove();
		prevModalDialog.classList.remove('hide');
		prevModalDialog.classList.add('show');
		closeModal();
	}, 4000);
}

	fetch('http://localhost:3000/menu')
		.then(data=>data.json())
		.then(res=>console.log(res));

});

// Slider

const slides = document.querySelectorAll('.offer__slide'),
	  prevBtn = document.querySelector('.offer__slider-prev'),
	  nextBtn = document.querySelector('.offer__slider-next'),
	  current = document.querySelector('#current'),
	  total = document.querySelector('#total'),
	  sliderWrapper = document.querySelector('.offer__slider-wrapper'),
	  sliderField = document.querySelector('.offer__slider-inner'),
	  width = window.getComputedStyle(sliderWrapper).width;


let slideIndex = 1,
	offset = 0;


if(slides.length < 10) {
	total.textContent = `0${slides.length}`;
	current.textContent = `0${slideIndex}`;

} else {
	total.textContent = slides.length;
	current.textContent = slideIndex;
}

sliderField.style.width = 100 * slides.length + '%';
sliderField.style.display = 'flex';
sliderField.style.transition = '0.5s all';

sliderWrapper.style.overflow = 'hidden';

console.log(width);


slides.forEach(slide => {
	slide.style.width = width;
});

nextBtn.addEventListener('click', () => {
	if (offset == parseInt(width) * (slides.length-1)) {
		offset = 0;
	} else {
		offset += parseInt(width);
	}

	sliderField.style.transform = `translateX(-${offset}px)`;

	if(slideIndex === slides.length) {
		slideIndex = 1;
	} else {
		slideIndex++;
	}

	if(slides.length < 10) {
		current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}
});

prevBtn.addEventListener('click', () => {
	if (offset == 0) {
		offset = parseInt(width) * (slides.length-1);
	} else {
		offset -= parseInt(width);
	}

	sliderField.style.transform = `translateX(-${offset}px)`;

	if(slideIndex === 1) {
		slideIndex = slides.length;
	} else {
		slideIndex--;
	}

	if(slides.length < 10) {
		current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}
});




// showSlides(slideIndex);

// if(slides.length < 10) {
// 	total.textContent = `0${slides.length}`;
// } else {
// 	total.textContent = slides.length;
// }


// function showSlides(n) {
// 	if(n > slides.length) {
// 		slideIndex = 1;
// 	}

// 	if(n<1) {
// 		slideIndex = slides.length;
// 	}

// 	slides.forEach(slide => slide.style.display = 'none');
// 	slides[slideIndex-1].style.display = 'block';

// 	if (slideIndex < 10) {
// 		current.textContent = `0${slideIndex}`;
// 	} else {
// 		current.textContent = slideIndex;
// 	}

// }

// function plusSlide(n) {
// 	showSlides(slideIndex+=n);
// }

// prevBtn.addEventListener('click', () => {
// 	plusSlide(-1);
// });

// nextBtn.addEventListener('click', () => {
// 	plusSlide(1);
// });


