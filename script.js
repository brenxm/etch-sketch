const gridContainer = document.querySelector('.grid-container');
let grids;
let onMouseDown = false;
const sliderContainer = document.getElementById('slider-container');
const pixelButton = document.querySelector('#pixel');
const pixelSlider = document.querySelector('#pxl-slider');

//generateGrids(16);

function generateGrids(count){
    for(let i = 0; i < count * count; i++){
        let temp = document.createElement('div');
        temp.setAttribute('id','grid');
        gridContainer.appendChild(temp);
        grids = document.querySelectorAll('#grid');
    }

    updateGridsSize(grids);
};


//update grid size
function updateGridsSize(nodeList){
    const containerSize = gridContainer.clientHeight / Math.sqrt(nodeList.length);
    nodeList.forEach(element => {
        element.setAttribute('style',`height: ${containerSize}px; width: ${containerSize}px; box-sizing: border-box;`)
    });
   
};

//update grid count


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
/*
grids.forEach(
    (x) => {
        x.addEventListener('mouseover', paint)
    }
)
*/

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
pixelSlider.addEventListener('change',()=>{
    console.log(`changing! and the current value is ${event.target.value}` );
})

