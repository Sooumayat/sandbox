let W = window.innerWidth;
let H = window.innerHeight;
let circles = [15];
let xoff = 0.0;

function setup() 
{
   createCanvas(W, H);

   V1 = new VerticalLine();
   H1 = new HorizontalLine();
   R1 = new CenterRect(300);
   R2 = new CenterRect(900);
   for (let i = 0; i < 15 ; i++)
   {
     circles[i] = new WanderingCircle(random(100));
   }
}


function draw() 
{
  xoff += 0.01;
  blendMode(BLEND);
  greyBackground();
  blendMode(DIFFERENCE);
  for (let i in circles)
  {
    if (i == 7) {blendMode(ADD);}
    circles[i].display();
  }
  H1.display();
  R1.display();
  blendMode(EXCLUSION);
}

class VerticalLine
{
  constructor()
  {
    this.xoff = random(5556987);
    this.lineX = noise(this.xoff) * W;
    this.R = random(255);
    this.V = random(255);
    this.B = random(255);
  }
  
  display()
  {
    this.move();
    stroke(this.R, this.V, this.B);
    strokeWeight(1);
    line(this.lineX, 0, this.lineX, H);
  }
  move()
  {
   this.xoff += 0.01;
   this.lineX = noise(this.xoff) * W;
  }
}

class HorizontalLine
{
  constructor()
  {
    this.xoff = random(5556987);
    this.lineY = noise(this.xoff) * H;
    this.R = random(255);
    this.V = random(255);
    this.B = random(255);
  }
  
  display()
  {
    this.move();
    stroke(this.R, this.V, this.B);
    strokeWeight(1);
    line(0, this.lineY, W, this.lineY);
  }
  move()
  {
   this.xoff += 0.01;
   this.lineY = noise(this.xoff) * H;
  }
}

class WanderingCircle
{
  constructor(size)
  {
    this.size = size;
    this.xoff = random(574000);
    this.yoff = this.xoff + 20;
    this.zoff = random(87510);
    this.Xpos = noise(this.xoff)*W;
    this.Ypos = noise(this.yoff)*H;
    this.R = 255;
    this.V = 255;
    this.B = 255;
  }
  
  move()
  {
    this.xoff += 0.01;
    this.yoff += 0.01;
    this.zoff += 0.01;
    this.Xpos = noise(this.xoff)*W;
    this.Ypos = noise(this.yoff)*H;
  }
  vary()
  {
    this.size += noise(this.zoff);
    this.size -= noise(this.yoff);
  }
  display()
  {
    this.move();
    this.vary();
    noStroke();
    fill(noise(this.xoff)*this.R, noise(this.yoff)*this.V, noise(this.zoff)*this.B);
    circle(this.Xpos, this.Ypos, this.size);
  }
}

class CenterRect
{
  constructor(thesize)
  {
    this.xoff = random(456789132);
    this.yoff = random(123456);
    this.R = 255;
    this.V = 255;
    this.B = 255;
    this.size = 0;
    this.originalSize = thesize;
  }
  
  vary()
  {
    this.xoff += 0.01;
    this.yoff += 0.01;
    this.size = noise(this.xoff)*this.originalSize;
  }
  display()
  {
    this.vary();
    rectMode(CENTER);
    noStroke();
    fill(int(noise(this.yoff)*255), int(noise(this.xoff)*155), 255 - int(noise(this.xoff) * 255));
    rect(W/2, H/2, this.size * W / H, this.size);
  }
}

function greyBackground()
{
  background(noise(xoff) * 255);
}

function yellowBackground()
{
  background(255, 255, noise(xoff) * 255);
}


 