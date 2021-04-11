// https://answers.opencv.org/question/222770/hsv-white-color-range-in-js/
let video = document.getElementById("videoInput"); // video is the id of video tag
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("An error occurred! " + err);
        });
let height = video.videoHeight
let width = video.videoWidth;

video.addEventListener( "loadedmetadata", function (e) {
    width = this.videoWidth,
    height = this.videoHeight;
    console.log(width, height)
}, false );
        
function onOpenCvReady() {

    let height = video.videoHeight;
    let width = video.videoWidth;
    video.style.display = 'none';

    let canvasFrame = document.getElementById("canvasFrame"); // canvasFrame is the id of <canvas>
    canvasFrame.width = width
    canvasFrame.height = height
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(height, width, cv.CV_8UC4);
    let dst = new cv.Mat(height, width, src.type());
    const FPS = 30;
    // canvasFrame.style.display = 'none'
    
    let kernel = cv.Mat.ones(5, 5, src.type());

    x = 0
    y = 0
    noiseth = 800
    function processVideo() {
        let begin = Date.now();
        context.drawImage(video, 0, 0, width, height);
        src.data.set(context.getImageData(0, 0, width, height).data);
        // console.log(src.data)
        cv.cvtColor(src, dst, cv.COLOR_BGR2HSV);
    
        cv.inRange(dst, lower_range, upper_range, dst)
        console.log(dst.data)
        // mask = cv.erode(mask, kernel, iterations=1)
        // mask = cv.dilate(mask, kernel, iterations=2)

        cv.imshow("canvasOutput", dst); // canvasOutput is the id of another <canvas>;
        
        // schedule next frame.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }
    // schedule first one.
    setTimeout(processVideo, 0);
}

function start() {
    try {
        onOpenCvReady();
    }
    catch(e) {
        
    }
}


