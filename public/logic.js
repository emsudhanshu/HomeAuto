import { switchDevice, capturePic } from "./modules/features.js";	

window.addEventListener("DOMContentLoaded", () => {
	// DOM ready! Images, frames, and other subresources are still downloading.
	capturePic();
});

// DESK CONTROLS
document.querySelector('#d1_on').addEventListener('click', function(){switchDevice(1,1)})
document.querySelector('#d1_off').addEventListener('click', function(){switchDevice(0,1)})

// CAMERA CONTROLS
document.querySelector('#c1_capture').addEventListener('click', capturePic)


