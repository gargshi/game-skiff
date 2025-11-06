const banner = document.querySelector('.banner');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarBrand = document.querySelector('.navbar-brand');

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
		banner.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out, color '+master_color_change_dur_s+'s ease-in-out';		
	},master_animation_timeout*2);

}

function NavbarMenuAnimation(){
	// alert('Welcome to GK_SKIFF!');
	master_color_change_dur_s=1;
	master_animation_timeout=1000;
	navbarMenu.style.opacity = '0';
	navbarBrand.style.opacity = '0';
	setTimeout(() => {
		navbarMenu.style.opacity = '1';
		navbarBrand.style.opacity = '1';
		navbarMenu.style.transform = 'translateX(0%)';
	},master_animation_timeout*0.01);
	navbarBrand.style.transform = 'rotateY(75deg)';
}
// setTimeout(NavbarMenuAnimation, 1000);
NavbarMenuAnimation();
// document.addEventListener('mousemove', rotateTowardCursor);

// setTimeout(loadBanner, 1000);
// loadBanner();