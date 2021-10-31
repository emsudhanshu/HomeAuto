import React, { useEffect, useState } from 'react';
import './DeskController.css';
import { switchDevice, capturePic } from '../../../modules/features';

// import { io } from "socket.io-client";
// const socket = io("ws://192.168.1.21:8080/");

export default function DeskController() {

    const [showLoader, setShowLoader] = useState(true);
    const [renderer, setRenderer] = useState(true);

    const refreshImage = function () {
        setInterval(() => { 
            var timestamp = new Date().getTime();
            var image = document.getElementById("c1_view");
            image.src = "http://192.168.1.21:8080/logo1.png?t=" + timestamp;
        }, 500)
    }

    useEffect(() => {
        // capturePic(1, setShowLoader);

        setShowLoader(false);
        refreshImage();

        // socket.on("connect", () => {
        //     console.log(socket); // x8WIv7-mJelg7on_ALbx
        // });

        // socket.on("image", (data) => {
        //       console.log('data from socket',data)
        //     //   document.querySelector('#c1_view').src=`data:image/png;base64, ${data}`;
        //     setRenderer(new Date());
        // });


        // socket.on("disconnect", () => {
        //     console.log(socket); // undefined
        // });

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
                <button onClick={() => switchDevice(1, 1, setShowLoader)}>ON</button>
                <button onClick={() => switchDevice(0, 1, setShowLoader)}>OFF</button>
            </div>
            <hr />
            <h3 className="feature_heading">Straight from the desk</h3>
            <div>

                {
                    renderer &&
                    <img id="c1_view" src="http://192.168.1.21:8080/logo1.png" alt="My desk from some distance." />
                }
                {/* <div>
                    <button onClick={() => capturePic(1,setShowLoader)}>Capture now</button>
                </div> */}
            </div>
        </React.Fragment>
    )
}
