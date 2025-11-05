const banner = document.querySelector('.banner');

function loadBanner(){
	// alert('Welcome to GK_SKIFF!');
	master_color_change_dur_s=1;
	master_animation_timeout=1000;
	banner.style.opacity = '0';
	setTimeout(() => {
		banner.style.opacity = '1';
		banner.style.transform = 'translateZ(0px)';
	},master_animation_timeout);

	setTimeout(() => {	
		banner.style.color = 'var(--primary-color)';
		banner.style.transform = 'translateY(-50px)';
		banner.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out, color '+master_color_change_dur_s+'s ease-in-out';		
	},master_animation_timeout*2);

}

// setTimeout(loadBanner, 1000);
loadBanner();