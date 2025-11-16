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