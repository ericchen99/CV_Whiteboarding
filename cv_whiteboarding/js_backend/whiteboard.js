// https://answers.opencv.org/question/222770/hsv-white-color-range-in-js/
let video = document.getElementById("videoInput"); // video is the id of video tag
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            console.log("the mediastreamtrack is ", stream)
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

    let canvasDraw = document.getElementById("canvasDraw")
    canvasDraw.width = width
    canvasDraw.height = height

    let canvasOutput = document.getElementById("canvasOutput")
    canvasOutput.width = width
    canvasOutput.height = height

    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(height, width, cv.CV_8UC4);
    let mask = new cv.Mat(height, width, src.type());
    const FPS = 30;

    // uncomment if we want to hide displays
    canvasOutput.style.display = 'none'
    
    // dst.type() = 16 in runtime
    // console.log("before creation")
    let lower_range = new cv.matFromArray(height, width, 16, [].concat(...[86, 119, 110]))
    let upper_range = new cv.matFromArray(height, width, 16, [].concat(...[179, 255, 255]))
    // console.log("after creation")

    // Canvas 1: all the input
    // Canvas 2: all the output
    x1 = 0
    y1 = 0
    noiseth = 800
    function processVideo() {
        // console.log("ProcessVideo Running")
        let begin = Date.now();
        context.drawImage(video, 0, 0, width, height);
        src.data.set(context.getImageData(0, 0, width, height).data);
        // console.log(src.data)
        // console.log("before calling cvtColor")
        cv.cvtColor(src, mask, cv.COLOR_RGBA2BGR);
        cv.cvtColor(mask, mask, cv.COLOR_BGR2HSV);

        // console.log(`after calling cvtColor`)

        var ctx = document.getElementById("canvasDraw").getContext("2d");
        ctx.fillStyle = "#ff2626"; // Red color
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.fillStyle = "#ff2626"; // Red color
        ctx.beginPath();
        ctx.arc(640, 480, 5, 0, Math.PI * 2, true);
        ctx.fill();
        // return



        // console.log(src.size(), mask.size(), lower_range.size(), upper_range.size())
        // console.log(src.type(), mask.type(), lower_range.type(), upper_range.type())

        // console.log("before inRange")
        cv.inRange(mask, lower_range, upper_range, mask)
        // console.log("after inRange")


        let M = cv.Mat.ones(5, 5, cv.CV_8U);
        let anchor = new cv.Point(-1, -1);
        cv.erode(mask, mask, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
        cv.dilate(mask, mask, M, anchor, 2, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(mask, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

        let max_area = -1;
        let max_contour = null
        for (var i = 0; i < contours.size(); i++) {
            let area = cv.contourArea(contours.get(i))
            if (area > max_area) {
                max_area = area
                max_contour = contours.get(i)
            }
        }
        // console.log(max_contour)
        if (max_contour && max_area > noiseth) {
            // console.log("before boundingRect")

            let bounding_rect = cv.boundingRect(max_contour)
            let x2 = bounding_rect.x
            let y2 = bounding_rect.y
            console.log(`About to draw ${x2}, ${y2}`)

            var ctx = document.getElementById("canvasDraw").getContext("2d");
            ctx.fillStyle = "#ff2626"; // Red color
            ctx.beginPath();
            ctx.arc(x2, y2, 10, 0, Math.PI * 2, true);
            ctx.fill();

            x1,y1 = x2,y2
        } else{
            x1,y1 = 0,0
        }
        cv.imshow("canvasOutput", mask); // canvasOutput is the id of another <canvas>;
        
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


