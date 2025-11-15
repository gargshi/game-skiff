const banner = document.querySelector('.banner');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarBrand = document.querySelector('.navbar-brand');

function loadBanner() {
	// alert('Welcome to GK_SKIFF!');
	master_color_change_dur_s = 1;
	master_animation_timeout = 1000;
	banner.style.opacity = '0';
	setTimeout(() => {
		banner.style.opacity = '1';
		banner.style.transform = 'translateZ(0px)';
	}, master_animation_timeout);

	setTimeout(() => {
		banner.style.color = 'var(--primary-color)';
		banner.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out, color ' + master_color_change_dur_s + 's ease-in-out';
	}, master_animation_timeout * 2);
}

function NavbarMenuAnimation() {
	// alert('Welcome to GK_SKIFF!');
	master_color_change_dur_s = 1;
	master_animation_timeout = 1000;
	navbarMenu.style.opacity = '0';
	navbarBrand.style.opacity = '0';
	setTimeout(() => {
		navbarMenu.style.opacity = '1';
		navbarBrand.style.opacity = '1';
		navbarMenu.style.transform = 'translateX(0%)';
	}, master_animation_timeout * 0.01);
	navbarBrand.style.transform = 'rotateY(75deg)';
}

// alert('Welcome to GK_SKIFF!');

// NavbarMenuAnimation();

// function revealCard(card, cardList){	
// 	card.style.width = '500px';

// 	for(var i = 0; i < cardList.length; i++){
// 		if(cardList[i] != card){
// 			cardList[i].style.transform = 'translateX(100%)';
// 		}
// 	}
// }

// featuredNovels = document.getElementById('feat-novels');
// // console.log(featuredNovels);
// featuredNovels.addEventListener('click', function(e){
// 	// console.log(e.target);
// 	card = e.target.parentElement.classList.contains('card') ? e.target.parentElement : e.target;
// 	revealCard(card, featuredNovels);
// })

// alert('Welcome to GK_SKIFF!');	
function glitchReveal(element, finalText, duration = 700) {
	let chars = "!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	chars = "|01|";
	let frame = 0;
	const totalFrames = Math.floor(duration / 30);

	const original = finalText.split("");
	const origCol = element.style.color;
	let display = new Array(original.length).fill("");

	let colorList = [
		"#ff4d4d",
		"#4db8ff",
		"#66ff99",
		"#ffcc00",
		"#b84dff"
	];

	colorList=[
		"#b2b2b2ff",
		"#ff4d4d",
		"#ffffff",
		"#4db8ff",
		"#66ff99",
	];


	const interval = setInterval(() => {
		frame++;

		for (let i = 0; i < original.length; i++) {
			if (frame < totalFrames * (i / original.length)) {
				// Still glitching here → random characters
				display[i] = chars[Math.floor(Math.random() * chars.length)];
				// Random color
				let col = colorList[Math.floor(Math.random() * colorList.length)];
				element.style.color = col;
			} else {
				// Reveal actual character
				display[i] = original[i];
				element.style.color = origCol;
			}
		}

		element.textContent = display.join("");

		if (frame >= totalFrames + original.length) {
			clearInterval(interval);
		}
	}, 40);
}