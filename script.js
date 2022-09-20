const canvas = document.getElementById('myCanvas');
const svgobj = document.getElementById('svgGraph');
const slider = document.getElementById("customRange1");
import anime from './anime/lib/anime.es.js';

let width = screen.width;

const point = (x, y) => ({x,y});

var depth=1;
let allvert = [];
let pt = ``;


slider.oninput = function() { 
    console.log(this.value);
    depth = this.value;
    allvert = [];
    pt=''

    drawShapes(depth,1, 50,50,1050,1050)
    pt += `M${allvert[0].x} ${allvert[0].y} `;

    for(var i=1; i< allvert.length; i++){
        pt += `L${allvert[i].x} ${allvert[i].y} `;
        console.log(allvert[i].x);
    }



    svgobj.setAttribute("d", pt);
    console.log(svgobj.getTotalLength());
    anime({
        targets: '#svgC path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500 * depth ** 2,
        delay: function(el, i) { return i * 250 },

      });
    
}


function drawShapes(n,s,x1,y1,x2,y2) { 
     var dx = x2 - x1;
     var dy = y2 - y1;
     if (n>1) {  
        if(s>0) {
            drawShapes(n-1,-1,x1,y1,(x1+x2)/2,(y1+y2)/2);
            drawShapes(n-1,1,x1,(y1+y2)/2,(x1+x2)/2,y2);
            drawShapes(n-1,1,(x1+x2)/2,(y1+y2)/2,x2,y2);
            drawShapes(n-1,-1,x2,(y1+y2)/2,(x1+x2)/2,y1);
        }

        else {
            drawShapes(n-1,1,x1,y1,(x1+x2)/2,(y1+y2)/2);
            drawShapes(n-1,-1,(x1+x2)/2,y1,x2,(y1+y2)/2);
            drawShapes(n-1,-1,(x1+x2)/2,(y1+y2)/2,x2,y2);
            drawShapes(n-1,1,(x1+x2)/2,y2,x1,(y1+y2)/2);
        }
     }
     if (n==1) {
         let p = [point(x1+dx/4,y1+dy/4), point(x1+(2-s)*dx/4,  y1+(2+s)*dy/4), point(x1+3*dx/4, y1+3*dy/4), point(x1+(2+s)*dx/4,y1+(2-s)*dy/4)];
         for (let i = 0; i<4; i++){
            allvert.push(p[i]);
         }
     }
}