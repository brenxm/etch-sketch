const gridContainer = document.querySelector('.grid-container');
let grids;

generateGrids(16);

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

//media queries updating the each grid 
window.matchMedia('(min-width: 768px)').addEventListener('change',()=>{
    updateGridsSize(grids);
});

//function to draw colors
function paint(event){
    console.log('hovering');
    event.target.setAttribute('style',`${event.target.getAttribute('style')} background-color: red;`)
}

grids.forEach(
    (x) => {
        x.addEventListener('mouseover', paint)
    }
)