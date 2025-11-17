const banner = document.querySelector('.banner');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarBrand = document.querySelector('.navbar-brand');

navbarBrand.addEventListener('click', () => {
	window.location.href = '/';
});

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

	colorList = [
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

function createModal(options) {
	const {
		title = "Modal Title",
		content = "This is a modal dialog.",
		okText = "OK",
		cancelText = "Cancel",
		onOk = () => { },
		onCancel = () => { }
	} = options;

	// ---- Create wrapper ----
	const overlay = document.createElement("div");
	overlay.style.position = "fixed";
	overlay.style.top = "0";
	overlay.style.left = "0";
	overlay.style.width = "100vw";
	overlay.style.height = "100vh";
	overlay.style.background = "rgba(0,0,0,0.5)";
	overlay.style.display = "flex";
	overlay.style.alignItems = "center";
	overlay.style.justifyContent = "center";
	overlay.style.zIndex = "9999";
	overlay.className += " blur-bg";

	function closeModal() {
		if (overlay.parentElement) {
			overlay.parentElement.removeChild(overlay);
		}
	}

	overlay.onclick = (e) => {
		if (e.target === overlay) closeModal();
	};

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeModal();
	});


	// ---- Create modal box ----
	const box = document.createElement("div");
	box.style.color = "#fff";
	box.style.width = "350px";
	box.style.background = "var(--modal-bg-color)";
	box.style.border = "1px solid var(--border-color)";
	box.style.borderRadius = "10px";
	box.style.padding = "20px";
	box.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
	box.style.animation = "modalPop 0.3s ease";

	// ---- Header ----
	const header = document.createElement("h2");
	header.innerText = title;
	header.style.margin = "0 0 15px";
	header.style.fontSize = "20px";

	// ---- Body ----
	const body = document.createElement("div");

	body.innerHTML = content;
	body.style.marginBottom = "20px";

	// ---- Buttons container ----
	const actions = document.createElement("div");
	actions.style.display = "flex";
	actions.style.justifyContent = "flex-end";
	actions.style.gap = "10px";

	// ---- Cancel button ----
	const btnCancel = document.createElement("button");
	btnCancel.innerText = cancelText;
	btnCancel.style.padding = "8px 16px";
	btnCancel.style.border = "none";
	btnCancel.style.background = "#ccc";
	btnCancel.style.borderRadius = "6px";
	btnCancel.style.cursor = "pointer";

	btnCancel.onclick = () => {
		onCancel();
		closeModal();
	};

	// ---- OK button ----
	const btnOk = document.createElement("button");
	btnOk.innerText = okText;
	btnOk.style.padding = "8px 16px";
	btnOk.style.border = "none";
	btnOk.style.background = "#007bff";
	btnOk.style.color = "#fff";
	btnOk.style.borderRadius = "6px";
	btnOk.style.cursor = "pointer";

	btnOk.onclick = () => {
		onOk();
		closeModal();
	};

	// ---- Assemble modal ----
	actions.append(btnCancel, btnOk);
	box.append(header, body, actions);
	overlay.append(box);
	document.body.append(overlay);

	// ---- Add animation keyframes ----
	const style = document.createElement("style");
	style.textContent = `
        @keyframes modalPop {
            from { transform: scale(0.7); opacity: 0;}
            to { transform: scale(1); opacity: 1;}
        }
    `;
	document.head.appendChild(style);

	return overlay;
}
color_pool = [
	"#0A2647",
	"#144272",
	"#205295",
	"#2C74B3",
	"#3E1F47",
	"#1A1A40",
	"#301934",
	"#003566",
	"#1D3557",
	"#2B2D42"
];

function randInt(max) {
	return Math.floor(Math.random() * max);
}
function createGameCard({
	title,
	genre = "Unknown",
	rating = 0,
	year = 0,
	description = "",
	author = "Anon",
	publisher = "Anon",
	gradient = color_pool[randInt(color_pool.length)]
}) {
	const el = document.createElement("div");
	el.innerHTML = `
			<article class="cardd">
				<div class="thumb">
					<div class="title">
						${title}
						<p>${genre}</p>
					</div>
										
				</div>


				<div class="meta">
					<div class="rating">⭐ ${rating}</div>
					<div>${year}</div>
				</div>

				<div class="desc">${description}</div>

				<div class="actions">
					<button class="cardd-btn primary">More info</button>					
				</div>
				<div class="credits">
					<div class="credit-row">Developed by ${author}</div>
					<div class="credit-row">Published by ${publisher}</div>
				</div>	
			</article>
		`;
	const article = el.firstElementChild;
	const thumb = article.querySelector(".thumb");
	thumb.style.background = gradient;

	return article;
}