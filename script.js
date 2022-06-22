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
let currentPxl = 64;

//generateGrids(currentPxl);


//generate grids and also will delete pre-exising grids if there is any
function generateGrids(count){
    gridContainer.replaceChildren();
    for(let i = 0; i < count * count; i++){
        let temp = document.createElement('div');
        temp.setAttribute('id','grid');
        gridContainer.appendChild(temp);
        grids = document.querySelectorAll('#grid');
    }

    updateGridsSize(grids);

    /*grids.forEach(
        (x) => {
            x.addEventListener('mouseover', paint)
        }
    )
    */
};


//update grid size
function updateGridsSize(nodeList){
    const containerSize = gridContainer.clientHeight / Math.sqrt(nodeList.length);
    nodeList.forEach(element => {
        element.setAttribute('style',`height: ${containerSize}px; width: ${containerSize}px; box-sizing: border-box;`)
    });
   
};



//media queries updating the size each grid 
window.matchMedia('(min-width: 768px)').addEventListener('change',()=>{
    updateGridsSize(grids);
});

//function to draw colors
function paint(event){
    console.log('hovering');
    event.target.setAttribute('style',`${event.target.getAttribute('style')} background-color: red;`);

    console.log(event.target.getAttribute('style'));
}

//initializing event listeners

opcButton.addEventListener('click', ()=>{sliderOpcContainer.style.display == 'none' ? sliderOpcContainer.style.display = 'block' : sliderOpcContainer.style.display = 'none'})

pixelButton.addEventListener('click',()=>{sliderContainer.style.display == 'none' ? 
    sliderContainer.style.display = 'block' : sliderContainer.style.display = 'none'; 
    //if not on hover anymore, hide the slider   
        })

document.body.onmousedown = () => {
    onMouseDown=true;
}

document.body.onmouseup = () => {
    onMouseDown=false;
}


//pixel input value change
pixelSlider.addEventListener('change',(event)=>{
    changePxl(null, event.target.value);
})

//current pxl text updating fn
//input a number between 1 to 100 (inclusive)
    //alert if out of number
    //acceptable format
        //number <100>
        //number x number <100x100> or <100 x 100> (or with space)
            //first number and second number must be the same, otherwise it alert an error


//function referenced to slider and text input upon submit
function changePxl(event, sliderInput) {
    if(event != null){
        event.preventDefault();

        if(/^\d+$/.test(textPxl.value)){
            if(textPxl.value > 0 && textPxl.value < 101){
                pixelSlider.value = textPxl.value;
                textPxl.blur();
                generateGrids(textPxl.value);
                updatePxlText(textPxl.value);
            }

            else{
                alert('out of accepted value')
                console.log(textPxl.value);
            }
        }

        else if(/^\d+\s?[xX]\s?\d+$/.test(textPxl.value)){
            const match = textPxl.value.match(/(\d+)\s?[xX]\s?(\d+)/);
            if(match[1] === match[2]){
                if(match[1] > 0 && match[1] < 101){
                    pixelSlider.value = match[1];
                    textPxl.blur();
                    generateGrids(match[1]);
                    updatePxlText(match[1]);
                }
                else{
                    alert('out of accepted value');
                }
            }
            
            else{
                alert('invalid pixel input');
            }
        }
    }

    else if(sliderInput != undefined){
        updatePxlText(sliderInput);
        generateGrids(sliderInput);
    }

    function updatePxlText(pxl){
        textPxl.value = `${pxl}x${pxl}`;
    }
}

document.getElementById('opacity-form').addEventListener('submit',changeOpacity);
opcSlider.addEventListener('change', ()=>{
    textOpc.value = opcSlider.value;
})

function changeOpacity(event){
    event.preventDefault();
    if(textOpc.value > 0 && textOpc.value <= 1){
        textOpc.blur();
        opcSlider.value = textOpc.value;
    }

    else {
        alert(`unaccepted value, enter only from 0.0 to 1.0`);
    }
}

document.getElementById('pxl-form').addEventListener('submit',(event)=>{
    changePxl(event, null);
});
