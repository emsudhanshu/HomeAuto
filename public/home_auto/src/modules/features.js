import GATEWAY from '../config/gateway.js';
import {CHANGE_STATE_ENDPOINT, CAPTURE_PIC_ENDPOINT} from '../config/endpoints.js';
 
export function showLoader(val){
    document.querySelector('#loader').style.display = val ? 'flex' : 'none'
}   

export function switchDevice(val, deviceId,setShowLoader) {

    setShowLoader(true);
    
	fetch(`${GATEWAY}${CHANGE_STATE_ENDPOINT}`,
		{
			method: 'POST', body: JSON.stringify({ val, deviceId }),
			headers: { 'Content-Type': 'application/json' }
			
			})
		.then(res=>{setShowLoader(false); return res.json()}).then(data => {console.log(data);alert(`success - device 1 turned ${val==1?'on':'off'}`)}).catch(()=>setShowLoader(false));

}

export function capturePic(cameraId,setShowLoader) {

    setShowLoader(true);

	fetch(`${GATEWAY}${CAPTURE_PIC_ENDPOINT}`,
		{
			method: 'POST', body: JSON.stringify({ cameraId }),
			headers: { 'Content-Type': 'application/json' }
			}).then(res=>{setShowLoader(false); return res.json()}).then(data => {console.log(data.body); document.querySelector('#c1_view').src=`data:image/png;base64,${data.imageData}`}).catch(()=>setShowLoader(false));

}
