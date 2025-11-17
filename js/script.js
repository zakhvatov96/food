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
	  modal = document.querySelector('.modal'),
	  closeBtn = document.querySelector('[data-close]');


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

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
	if(e.target === modal) {
		closeModal();
	}
});

document.addEventListener('keydown', (e) => {
	if(e.code === 'Escape' && modal.classList.contains('show')) {
		closeModal();
	}
});

const modalId = setTimeout(openModal, 5000);

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

new MenuCard('img/tabs/vegy.jpg',
	'vegy',
	'Меню "Фитнес"',
	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	9,
	'.menu .container').render();

	new MenuCard('img/tabs/elite.jpg',
	'elite',
	'Меню "Премиум"',
	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	11,
	'.menu .container').render();

	new MenuCard('img/tabs/post.jpg',
	'post',
	'Меню "Постное"',
	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	13,
	'.menu .container').render();