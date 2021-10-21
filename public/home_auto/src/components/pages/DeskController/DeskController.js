import React, { useEffect, useState } from 'react';
import './DeskController.css';
import {switchDevice, capturePic} from '../../../modules/features';

export default function DeskController() {

    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        capturePic(1,setShowLoader)
    }, [])

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
                <button onClick={() => switchDevice(1, 1,setShowLoader)}>ON</button>
                <button onClick={() => switchDevice(0, 1,setShowLoader)}>OFF</button>
            </div>
            <hr />
            <h3 className="feature_heading">Straight from the desk</h3>
            <div>
                <img id="c1_view" src="image.jpg" alt="My desk from some distance." />
                <div>
                    <button onClick={() => capturePic(1,setShowLoader)}>Capture now</button>
                </div>
            </div>
        </React.Fragment>
    )
}