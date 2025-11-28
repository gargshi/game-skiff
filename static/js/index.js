const banner = document.querySelector('.banner');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarBrand = document.querySelector('.navbar-brand');
const platform_svgs={
	"Windows": `Windows`,	
	"Mac": `MAC`,	
	"Web": "🌐",
	"Android": "🤖",
	"Linux": "🐧",
	"iOS": "📱",
	"Playstation": "🎮",
	"Xbox": "🎮",
	"Nintendo": "🎮"
};

function returnPlatformSVG(platforms) {
	console.log(platforms);
	psvg=[];
	output_html=``;
	for (i=0;i<platforms.length;i++) {
		output_html+=platform_svgs[platforms[i]];		
	}
	
	return output_html;
}

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
		showOK = true,
		showCancel = true,
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
	box.style.minHeight = "200px";
	box.style.maxHeight = "400px";
	box.style.background = "var(--modal-bg-color)";
	box.style.border = "1px solid var(--border-color)";
	box.style.borderRadius = "10px";
	box.style.padding = "20px";
	box.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
	box.style.animation = "modalPop 0.3s ease";
	box.classList.add("overflow-y-scroll");

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
	if (showCancel) actions.append(btnCancel);
	if (showOK) actions.append(btnOk);
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
	imageurl = "https://picsum.photos/600/400", 
	rating = 0,
	year = 0,
	description = "",
	author = "Anon",
	publisher = "Anon",
	gradient = color_pool[randInt(color_pool.length)],
	game_id = -99,
	add_to_library = false,
	platform = "Unknown"
}) {
	const el = document.createElement("div");
	
	el.innerHTML = `
	<div class="game-card">
		<div class="game-thumb">
			<img src="${imageurl}" alt="Game Image">
			<div class="actions">
				<a class="game-card-btn play-btn" target="_blank" href='/seegame/${game_id}'">
					Info
				</a>
				<a class="game-card-btn report-btn" target="_blank" href='/report/game/${game_id}'">
					Report
				</a>
			</div>
		</div>

		<div class="game-info">
			<h3 class="game-title">${title}</h3>
			<p class="game-author">by ${author}</p>
			<p class="game-genre">${genre}</p>

			<div class="game-tags">
				<span class="tag">Play in browser</span>
				${platform.includes("Windows")?`
				<span class="icon">🖥️</span>
				`:``}
				${platform.includes("Mac")?`
				<span class="icon">🍎</span>
				`:``}
				${platform.includes("Linux")?`
				<span class="icon">🐧</span>
				`:``}
				${platform.includes("Android")?`
				<span class="icon">📱</span>
				`:``}           
			</div>
		</div>
	</div>`;
	const article = el.firstElementChild;
	const actions = article.querySelector('.actions');
	article.addEventListener('mouseenter', () => {
		article.style.boxShadow = `0 4px 20px #bababacd`;
		actions.style.transform = 'translate(-50%, -50%) scale(1.05)';
		actions.style.opacity = '1';
	});
	article.addEventListener('mouseleave', () => {
		article.style.boxShadow = `0 4px 12px #00000040`;
		actions.style.transform = 'translate(-50%, -50%) scale(1)';
		actions.style.opacity = '0';
	});
	

	return article;
}

