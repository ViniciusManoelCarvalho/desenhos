

function drawHeart() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorSelect = document.getElementById('colorSelect');
    const drawButton = document.getElementById('drawButton');
    const color = colorSelect.value;
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    const minDim = Math.min(width, height);
    const scale = 0.9 * minDim / 32;  // Adjust scale based on the smaller dimension
    const centerX = width / 2;
    const centerY = height / 2.2;
    const maxSteps = 100;
    let step = 0;
    let fillStep = 0;

    drawButton.disabled = true;

    ctx.clearRect(0, 0, width, height);

    function drawStep() {
        const t = step / maxSteps * 2 * Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3) * scale;
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;

        if (step === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + x, centerY + y);
        } else {
            ctx.lineTo(centerX + x, centerY + y);
        }

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;

        step++;

        if (step <= maxSteps) {
            requestAnimationFrame(drawStep);
        } else {
            ctx.closePath();
            fillHeart();
        }
    }

    function fillHeart() {
        ctx.globalAlpha = 0;
        fillStep = 0;

        function fillStepFunc() {
            ctx.globalAlpha = fillStep / maxSteps;
            ctx.fill();
            fillStep++;
            if (fillStep <= maxSteps) {
                requestAnimationFrame(fillStepFunc);
            } else {
                ctx.globalAlpha = 1;
                drawButton.disabled = false;
            }
        }

        fillStepFunc();
    }

    drawStep();
}

function clearCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
