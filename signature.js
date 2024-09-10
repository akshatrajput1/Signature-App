// Get references to the canvas and context
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// Get references to the controls
const colorPicker = document.getElementById('colorPicker');
const canvasPicker = document.getElementById('canvasPicker');
const fontSizeSelector = document.getElementById('fontSize');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const retrieveButton = document.getElementById('retrieveButton');

// Initialize drawing settings
context.strokeStyle = colorPicker.value;
context.lineWidth = parseInt(fontSizeSelector.value, 10);
context.lineCap = 'round';

// Track mouse events
let drawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Update color
colorPicker.addEventListener('input', (event) => {
    context.strokeStyle = event.target.value;
});

// Update background color
canvasPicker.addEventListener('input', (event) => {
    canvas.style.backgroundColor = event.target.value;
});

// Update line width
fontSizeSelector.addEventListener('change', (event) => {
    context.lineWidth = parseInt(event.target.value, 10);
});

function startDrawing(event) {
    drawing = true;
    draw(event);
}

function draw(event) {
    if (!drawing) return;
    
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
}

function stopDrawing() {
    drawing = false;
    context.beginPath();
}

// Clear the canvas
clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the signature
saveButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
});

// Retrieve a previously saved signature
retrieveButton.addEventListener('click', () => {
    const url = prompt('Enter the URL of the signature image:');
    if (url) {
        const image = new Image();
        image.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0);
        };
        image.src = url;
    }
});
