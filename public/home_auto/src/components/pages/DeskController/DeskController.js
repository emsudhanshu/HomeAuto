import React, { useEffect, useState } from 'react';
import './DeskController.css';
import GATEWAY from '../../../config/gateway.js';
import { CHANGE_STATE_ENDPOINT, CAPTURE_PIC_ENDPOINT } from '../../../config/endpoints.js';

export default function DeskController() {

    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        capturePic(1)
    }, [])

    function switchDevice(val, deviceId) {
        setShowLoader(true);
        fetch(`${GATEWAY}${CHANGE_STATE_ENDPOINT}`,
            {
                method: 'POST', body: JSON.stringify({ val, deviceId }),
                headers: { 'Content-Type': 'application/json' }

            })
            .then(res => { setShowLoader(false); return res.json() }).then(data => { console.log(data); alert(`success - device 1 turned ${val == 1 ? 'on' : 'off'}`) }).catch(() => setShowLoader(false));
    }

    function capturePic(cameraId) {

        setShowLoader(true);

        fetch(`${GATEWAY}${CAPTURE_PIC_ENDPOINT}`,
            {
                method: 'POST', body: JSON.stringify({ cameraId }),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => { setShowLoader(false); return res.json() }).then(data => { console.log(data.body); document.querySelector('#c1_view').src = `data:image/png;base64,${data.imageData}` }).catch(() => setShowLoader(false));

    }
    return (
        <React.Fragment>
            {showLoader &&
                <div className="loader">
                    <h3>Loading ...</h3>
                </div>
            }
            <h3 className="feature_heading">Desk Controls</h3>
            <div>
                Turn Device 1
                <button onClick={() => switchDevice(1, 1)}>ON</button>
                <button onClick={() => switchDevice(0, 1)}>OFF</button>
            </div>
            <hr />
            <h3 className="feature_heading">Straight from the desk</h3>
            <div>
                <img id="c1_view" src="image.jpg" alt="My desk from some distance." />
                <div>
                    <button onClick={() => capturePic(1)}>Capture now</button>
                </div>
            </div>
        </React.Fragment>
    )
}