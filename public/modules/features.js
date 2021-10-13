import GATEWAY from '../config/gateway.js';
import {CHANGE_STATE_ENDPOINT, CAPTURE_PIC_ENDPOINT} from '../config/endpoints.js';
 
export function switchDevice(val, deviceId) {
	fetch(`${GATEWAY}${CHANGE_STATE_ENDPOINT}`,
		{
			method: 'POST', body: JSON.stringify({ val, deviceId }),
			headers: { 'Content-Type': 'application/json' }
			}).then(data => alert(`success - device 1 turned ${val==1?'on':'off'}`));

}

export function capturePic(cameraId) {

	fetch(`${GATEWAY}${CAPTURE_PIC_ENDPOINT}`,
		{
			method: 'POST', body: JSON.stringify({ cameraId }),
			headers: { 'Content-Type': 'application/json' }
			}).then(data => {alert(`success`);console.log(data.body); document.querySelector('#c1_view').src=`data:image/png;base64,${data.imageData}`});

}
