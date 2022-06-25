let tick = 0;
setInterval(()=>{
    tick++;
    tick > 360 ? tick = 0 :
    console.log(tick);
},10);

