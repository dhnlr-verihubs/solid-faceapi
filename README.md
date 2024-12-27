# Face-api Explore

## About Faceapi

Face-api.js is library to detect face and face landmark. This library support browser and NodeJS. Built on top of Tensorflow.js (tfjs).

## Background
Currently, we use [justadudewhohacks/face-api.js](https://github.com/justadudewhohacks/face-api.js) that use `webgl` backend. Unfortunately, we get complaint by client about our warming up model time that take too long on mobile device. Sometimes this warmup process also blocking painting/rendering that cause zoom-in and zoom-out on mobile device (need further diagnose).

## Benchmarks
This benchmarks show two different library [justadudewhohacks/face-api.js](https://github.com/justadudewhohacks/face-api.js) and [vladmandic/face-api](https://github.com/vladmandic/face-api) for same models `tinyfacedetector`.

### Bundle size

|  | Bundle size | On Disk |
| :---         |     :---:      |  :---: |
| justadudewhohacks/face-api.js   | 799 KB     | 1.3 MB    |
| vladmandic/face-api webgl     | 1.28 MB       | 2 MB     |
| vladmandic/face-api wasm     | 1.28 MB       | 3 MB (include wasm file)    |

### Performance

|  | Desktop | Mobile |
| :---         |     :---:      |  :---: |
| justadudewhohacks/face-api.js   | 12     | 15    |
| vladmandic/face-api webgl     | 15       | 23     |
| vladmandic/face-api wasm     | 22       | 28     |

### Warmup

|  | Desktop | Mobile |
| :---         |     :---:      |  :---: |
| justadudewhohacks/face-api.js   | -     | -    |
| vladmandic/face-api webgl     | -       | -     |
| vladmandic/face-api wasm     | -       | -     |

* Need further detection method
