
var canvas = document.querySelector('canvas');
console.log("CONNECTION!!!!!")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

var c = canvas.getContext('2d');
// c stands for context, returning a drawing context. Creating a super object to draw things width.
// c.fillStyle = "rgba(255, 0, 0, 0.5"
// c.fillRect(80, 100, 100, 100)
// c.fillStyle = "rgba(0, 0, 255, 0.5"
// c.fillRect(200, 40, 100, 100)
// c.fillStyle = "rgba(0, 255, 0, 0.5"
// c.fillRect(500, 200, 100, 100)
// console.log(canvas)

// // This is where we will begin drawing lines

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a2";
// c.stroke()

// circle
// c.beginPath();
// c.arc(300, 300,30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (var i = 0; i < 200; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue";
//   c.stroke();
// }
var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event) {
  // console.log("event")
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight

  init();
});

// var maxRadius = 40
// var minRadius = 2

var colorArray = [
  "#33333",
  "#00e8DC",
  "#ff0071",
  "#0032E8",
  "#b5b4b3",
];


function Circle(x, y, dx, dy, radius, minRadius, maxRadius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
  this.minRadius = radius
  this.maxRadius = 10
  this.draw = function() {

    c.beginPath();
    c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = "blue";
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
   }

   this.update = function(){
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
   if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      this.radius += 1;
      if (this.radius < this.maxRadius) {
        this.radius += 1
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

// x velocity

// var circle = new Circle(200, 200, 3, 3, 30);

var circleArray = [];

function init() {
  circleArray = [];
  for (var i = 0; i < 2000; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2 ) + radius ;
    var y = Math.random() * (innerHeight - radius * 2 ) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x , y, dx, dy, radius));
  }
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  // console.log(circleArray)
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();