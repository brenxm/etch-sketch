const gridContainer = document.querySelector('.grid-container');
let grids;
let onMouseDown = false;
const sliderContainer = document.getElementById('slider-container');
const pixelButton = document.querySelector('#pixel');
const pixelSlider = document.querySelector('#pxl-slider');
const textPxl = document.querySelector('#current-pxl');
const opcButton = document.querySelector('#opacity');
const sliderOpcContainer = document.getElementById('slider-container-opc');
const textOpc = document.querySelector('#opacity-text');
const opcSlider = document.querySelector('#opc-slider');
const eraserButton = document.querySelector('#eraser');
const colorButton = document.querySelector('#color');
const rainbowButton = document.querySelector('#rainbow');
let currentPxl = 36;
let rainbowMode = false;
let rainbowBrush;
let intervalID;
const newCanvasButton = document.querySelector('#new-canvas-button');

//on start up
generateGrids(currentPxl);
eventListenersFunction();
document.getElementById('color-indicator').style.display = 'block';
const activeBrush = { r: 0, g: 0, b: 0, a: opcSlider.value };
const colorBrush = { r: 0, g: 0, b: 0, a: 0.5 };

//generate grids and also will delete pre-exising grids if there is any
function generateGrids(count) {
    gridContainer.replaceChildren();
    for (let i = 0; i < count * count; i++) {
        let temp = document.createElement('div');
        temp.setAttribute('id', 'grid');
        gridContainer.appendChild(temp);
    }

    grids = document.querySelectorAll('#grid');
    updateGridsSize(grids);
};

function drawingMode(trueOrFalse) {
    if (trueOrFalse) {
        grids.forEach(
            (x) => {
                x.addEventListener('mouseover', paint)
            }
        )

        return;
    }

    grids.forEach(
        (x) => {
            x.removeEventListener('mouseover', paint)
        }
    )


}


//update grid size
function updateGridsSize(nodeList) {
    const containerSize = gridContainer.clientHeight / Math.sqrt(nodeList.length);
    nodeList.forEach(element => {
        element.setAttribute('style', `height: ${containerSize}px; width: ${containerSize}px; box-sizing: border-box; background-color: rgb(255, 255, 255);`)
    });

};


//function to draw colors
function paint(event) {
    if (!rainbowMode) {
        const currentRGB = event.target.style.getPropertyValue('background-color');

        const rgb = currentRGB.match(/rgb[(](\d+), (\d+), (\d+)[)]/);

        event.target.setAttribute('style', `${event.target.getAttribute('style')} background-color: rgb(${(rgb[1] - (rgb[1] * activeBrush.a)) + (activeBrush.r * activeBrush.a)}, ${(rgb[2] - (rgb[2] * activeBrush.a)) + (activeBrush.g * activeBrush.a)}, ${(rgb[3] - (rgb[3] * activeBrush.a)) + (activeBrush.b * activeBrush.a)});`);
    }

    else {
        console.log('being called');
        event.target.setAttribute('style', `${event.target.getAttribute('style')} background-color: ${rainbowBrush}`);
    }
}


function changeBrush(r, g, b, a) {
    activeBrush.r = r;
    activeBrush.g = g;
    activeBrush.b = b;
    activeBrush.a = a;
}

//initializing event listeners


document.body.onmousedown = (event) => {
    onMouseDown = true;
    console.log(onMouseDown);
    drawingMode(true);
    if (event.target.getAttribute('id') != 'pxl-slider' && event.target.getAttribute('id') != 'opc-slider') {
        sliderOpcContainer.style.display = 'none';
        sliderContainer.style.display = 'none';
        drawingMode(true);
    }
}

document.body.onmouseup = () => {
    onMouseDown = false;
    drawingMode(false);
    console.log(onMouseDown);
}


//function referenced to slider and text input upon submit
function changePxl(event, sliderInput) {
    if (event != null) {
        event.preventDefault();

        if (/^\d+$/.test(textPxl.value)) {
            if (textPxl.value > 0 && textPxl.value < 101) {
                pixelSlider.value = textPxl.value;
                textPxl.blur();
                generateGrids(textPxl.value);
                updatePxlText(textPxl.value);
            }

            else {
                alert('out of accepted value')
                console.log(textPxl.value);
            }
        }

        else if (/^\d+\s?[xX]\s?\d+$/.test(textPxl.value)) {
            const match = textPxl.value.match(/(\d+)\s?[xX]\s?(\d+)/);
            if (match[1] === match[2]) {
                if (match[1] > 0 && match[1] < 101) {
                    pixelSlider.value = match[1];
                    textPxl.blur();
                    generateGrids(match[1]);
                    updatePxlText(match[1]);
                }
                else {
                    alert('out of accepted value');
                }
            }

            else {
                alert('invalid pixel input');
            }
        }
    }

    else if (sliderInput != undefined) {
        updatePxlText(sliderInput);
        generateGrids(sliderInput);
    }

    function updatePxlText(pxl) {
        textPxl.value = `${pxl}x${pxl}`;
    }
}



function changeOpacity(event) {
    event.preventDefault();
    if (textOpc.value > 0 && textOpc.value <= 1) {
        textOpc.blur();
        opcSlider.value = textOpc.value;
        changeBrush(activeBrush.r, activeBrush.g, activeBrush.b, opcSlider.value);
    }

    else {
        alert(`unaccepted value, enter only from 0.0 to 1.0`);
    }
}



function toggleButton(event) {
    document.getElementById('color-indicator').style.display = 'none';
    document.getElementById('rainbow-indicator').style.display = 'none';
    document.getElementById('eraser-indicator').style.display = 'none';
    switch (event.target.getAttribute('id')) {
        case 'color':
            rainbowMode = false;
            clearInterval(intervalID);
            drawingMode(false);
            document.getElementById('color-indicator').style.display = 'block'; activeBrush.r = colorBrush.r;
            activeBrush.g = colorBrush.g;
            activeBrush.b = colorBrush.b;
            activeBrush.a = colorBrush.a;
            opcSlider.value = colorBrush.a;
            textOpc.value = colorBrush.a;
            return;
        case 'rainbow':
            rainbowMode = true;
            toggleRainbowBrush();
            document.getElementById('rainbow-indicator').style.display = 'block';
            return;
        case 'eraser':
            rainbowMode = false;
            clearInterval(intervalID);
            document.getElementById('eraser-indicator').style.display = 'block';
            activeBrush.r = 255;
            activeBrush.g = 255;
            activeBrush.b = 255;
            activeBrush.a = 1;
            opcSlider.value = 1;
            textOpc.value = 1;
            return;
    }

}

function eventListenersFunction(event) {
    colorButton.addEventListener('click', toggleButton);
    colorButton.addEventListener('input', (x) => {
        console.log(x.target.value);
        hexToRGB(x.target.value, colorBrush);
    })
    rainbowButton.addEventListener('click', toggleButton);
    eraserButton.addEventListener('click', toggleButton);
    document.getElementById('pxl-form').addEventListener('submit', (event) => {
        changePxl(event, null);

    });
    document.getElementById('opacity-form').addEventListener('submit', changeOpacity);
    opcSlider.addEventListener('change', () => {
        textOpc.value = opcSlider.value;
        changeBrush(activeBrush.r, activeBrush.g, activeBrush.b, opcSlider.value);
    })

    pixelSlider.addEventListener('input', (event) => {
        changePxl(null, event.target.value);
    })

    opcButton.addEventListener('click', () => {
        drawingMode(false);
        sliderOpcContainer.style.display == 'none' ? sliderOpcContainer.style.display = 'block' : sliderOpcContainer.style.display = 'none'
    })

    pixelButton.addEventListener('click', () => {
        drawingMode(false);
        sliderContainer.style.display == 'none' ?
            sliderContainer.style.display = 'block' : sliderContainer.style.display = 'none';
    })

    newCanvasButton.addEventListener('click',()=>{
        updateGridsSize(grids);
    });
}


//media queries updating the size each grid 
window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
    updateGridsSize(grids);
});

Math.Clamp = (value, min, max) => {
    if (value < min) {
        return min;
    }

    else if (value > max) {
        return max;
    }

    return value;
}

function hexToRGB(hex, colorBrush) {
    const rgb = hex.match(/#([a-z0-9][a-z0-9])([a-z0-9][a-z0-9])([a-z0-9][a-z0-9])/);
    const red = parseInt(rgb[1], 16);
    const green = parseInt(rgb[2], 16);
    const blue = parseInt(rgb[3], 16);
    colorBrush.r = red;
    colorBrush.g = green;
    colorBrush.b = blue;
    activeBrush.r = colorBrush.r;
    activeBrush.g = colorBrush.g;
    activeBrush.b = colorBrush.b;
}

function toggleRainbowBrush() {
    let tick = 0;
    intervalID = setInterval(() => {
        tick++;
        tick > 360 ? tick = 0 :
        rainbowBrush = `hsl(${tick}, 100%, 50%);`;
        console.log(tick);
    }, 10)
}

