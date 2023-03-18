const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];

function mandel(iterations, x_val, y_val, center){
    loadPixels();
    colorMode(HSB, 1);
    for (let n = 0; n < iterations; n++) {
        // Gosh, we could make fancy colors here if we wanted
        let hu = sqrt(n / iterations);
        let col = color(hu, 255, 150);
        colorsRed[n] = red(col);
        colorsGreen[n] = green(col);
        colorsBlue[n] = blue(col);
      
    }
    for (let x = 0; x < width; x++) {

        for (let y = 0; y < height; y++) {

            let xi = map(x, 0, width, center.x-x_val, center.x+x_val);
            let yi =  map(y, 0, height, center.y-y_val, center.y+y_val);
            let cx = xi;
            let cy = yi;
            let n = 0;
            let brigth = 0;

            while (n<iterations && xi*xi + yi*yi <= 2*2) {
                
                var aa = xi  *xi - yi * yi;
                var bb = 2 * xi * yi;

                //print(aa, xi, yi)
                //print(bb)
                xi = aa + cx;
                yi = bb + cy;

                if((xi+yi)>16){
                    break
                }
                
                n++;
            }
            //print("--------");
            //print(n)
            
            brigth = map(n, 0, iterations, 255, 0);



            let pix = (x + y * width) * 4;

            if(n == iterations ){
                pixels[pix + 0] = 0;
                pixels[pix + 1] = 0;
                pixels[pix + 2] = 0;
                pixels[pix + 3] = 255;
            }
            else if(n%1 == 0){
                
                pixels[pix + 0] = colorsRed[n];
                pixels[pix + 1] = colorsGreen[n];
                pixels[pix + 2] = colorsBlue[n];
                pixels[pix + 3] = 255;
            }


        }
    
    }
    updatePixels();
}
var iter = 0;
var sign = 1;
var delta_x = 5;
var delta_y = 2;
var deatail = 30;
var previus;
var c;
var position;


function setup(){
    
    c = createCanvas(1350,600);
    pixelDensity(1);
    position = createVector(-1.78,0.0001);
    previus = createVector(0,0);
    mandel(500, 4, 2, position);
    
    
}
var alph = .9
var a = 2;
/*
function mouseClicked(){
    mouse = createVector(map(mouseX,0,1350,-a*2,a*2),map(mouseX,0,600,-a,a))
    print(mouse)
    //position.add(mouse) p5.Vector.add(mouse,position
    position.x = mouse.x
    position.y = mouse.y
    
}*/

function draw(){
    frameRate(0);
    a *= alph
    mandel(200, 2*a, a, position)
    //print(a)
}

/*
function mouseWheel(event) {

    if(!(event.delta > 0)){
        previus.x = map(mouseX,0,width,previus.x-delta_x,previus.x+delta_x);
        previus.y = map(mouseY,0,height,previus.y-delta_y,previus.y+delta_y);
        
        delta_x = delta_x*.8;
        delta_y = delta_y*.8;
        //print(delta_x,delta_y);
        deatail+=deatail;
        //saveCanvas(c, 'myCanvas', 'jpg');
    }
    
    if(!(event.delta < 0)){
        previus.x = map(mouseX,0,width,previus.x-delta_x,previus.x+delta_x);
        previus.y = map(mouseY,0,height,previus.y-delta_y,previus.y+delta_y);
        
        delta_x *= 2;
        delta_y *= 2;
        deatail-=deatail;
    }
    //print(x,y);

    mandel(500, delta_x, delta_y,previus);
    
    
}*/

