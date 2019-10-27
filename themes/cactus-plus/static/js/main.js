// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image. Assumes jquery is loaded.

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
document.addEventListener(
	"DOMContentLoaded",
	function() {
		retina;
	},
	false
);
