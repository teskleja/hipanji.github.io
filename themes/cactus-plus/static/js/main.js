// To make images retina, add a class "2x" to the img element

function isRetina() {
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
					  (min--moz-device-pixel-ratio: 1.5),\
					  (-o-min-device-pixel-ratio: 3/2),\
					  (min-resolution: 1.5dppx)";

	if (window.devicePixelRatio > 1)
		return true;

	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;

	return false;
};


function retina() {

	if (!isRetina())
		return;

	let retina = document.querySelectorAll("img[class='2x']");
	retina.forEach(element => {
		let path = element.getAttribute("src");

		path = path.replace(".png", "@2x.png");
		path = path.replace(".jpg", "@2x.jpg");
		element.setAttribute("src", path);
	});
};

function setDarkMode(isDark) {
	var darkBtn = document.getElementById("darkBtn");
	var lightBtn = document.getElementById("lightBtn");
	if (isDark) {
		lightBtn.style.display = "block";
		darkBtn.style.display = "none";
		localStorage.setItem("preferredTheme", "dark");
	} else {
		lightBtn.style.display = "none";
		darkBtn.style.display = "block";
		localStorage.removeItem("preferredTheme");
	}
	document.body.classList.toggle("dark-mode");
}

document.addEventListener(
	"DOMContentLoaded",
	function() {
		retina();
		if (localStorage.getItem("preferredTheme") == "dark") {
			setDarkMode(true);
		}
	},
	false
);
