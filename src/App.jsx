import { onMount } from "solid-js";
import * as faceapi from "face-api.js";

import "./App.css";

const App = () => {
  let videoRef;
  let startTime;

  onMount(() => {
    (async () => {
      await loadModel();
      await webCam();
      await detectionLoop();
    })().catch((e) => {
      throw e;
    });
  });

  async function loadModel() {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    ]);
  }

  async function webCam() {
    const cameraOptions = {
      audio: false,
      video: {
        facingMode: "user",
        resizeMode: "none",
        width: { ideal: document.body.clientWidth },
      },
    };
    const stream = await navigator.mediaDevices.getUserMedia(cameraOptions);
    const ready = new Promise((resolve) => {
      videoRef.onloadeddata = () => resolve(true);
    });
    videoRef.srcObject = stream;
    void videoRef.play();
    await ready;
  }

  async function detectionLoop() {
    // main detection loop
    if (!videoRef.paused) {
      const t0 = performance.now();
      const detections = await faceapi
        .detectSingleFace(
          videoRef,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 224,
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks();
      console.log("FPS: ", 1000 / (performance.now() - t0));
      const landmarks = detections.landmarks;
      const mouthTop = landmarks.positions[62];
      const mouthBottom = landmarks.positions[66];
      const mouthDistance = mouthBottom.y - mouthTop.y;

      if (mouthDistance > 30) {
        if (startTime == null) {
          startTime = Date.now();
        }
        const elapsedTime = (Date.now() - startTime) / 1000;
        console.log(elapsedTime);

        if (elapsedTime >= 2) {
          videoRef.pause()
          return detections;
        }
      }
      return new Promise((resolve) => {
        setTimeout(async () => {
          await detectionLoop(); // run validation loop until conditions are met
          resolve(detections); // recursive promise resolve
        }, 30); // use to slow down refresh from max refresh rate to target of 30 fps
      });
    }
  }

  return (
    <div class="content">
      <video playsInline ref={videoRef} />
    </div>
  );
};

export default App;
