/*
 * @Author: your name
 * @Date: 2021-10-12 09:49:32
 * @LastEditTime: 2021-12-12 11:25:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\ball\ball.js
 */
const startSize = 100;
const growSpeed = 0.1;
const maxSize = 200;
const minCount = 10;
var time = new Date().getTime();
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
var birds = [];
var raf;
var img = new Image();
img.src = "images/atlas.png";
class bird {
  constructor(x, y, vx, vy, size) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
  }
  draw() {
    ctx.save();
    if (this.vx > 0) {
      ctx.translate(this.x - this.size / 2, this.y - this.size / 2)
      ctx.scale(1, 1);
    }
    else {
      ctx.translate(this.x + this.size / 2, this.y - this.size / 2)
      ctx.scale(-1, 1);
    }
    // bird0_0 48 48 0.0 0.9472656 0.046875 0.046875
    // bird0_1 48 48 0.0546875 0.9472656 0.046875 0.046875
    // bird0_2 48 48 0.109375 0.9472656 0.046875 0.046875

    if (Math.abs(this.vy) < 3) {

      ctx.drawImage(img, 0.0546875 * 1024, 0.9472656 * 1024, 48, 48, 0, 0, this.size, this.size)
    }
    else {
      if (this.vy > 0) {
        ctx.drawImage(img, 0, 0.9472656 * 1024, 48, 48, 0, 0, this.size, this.size)
      }
      else {
        ctx.drawImage(img, 0.109375 * 1024, 0.9472656 * 1024, 48, 48, 0, 0, this.size, this.size)
      }
    }

    ctx.restore();
  }
};
function clear() {
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clear();
  if (birds.length == 0) {
    birds.push(new bird(Math.random() * (canvas.width - startSize) + startSize / 2, (Math.random() * 0.5 + 0.25) * canvas.height, Math.random() * 10 - 5, -1, startSize));
  }
  birds.forEach(function (ball, index) {
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy *= .9995;
    ball.vy += .25;
    ball.size += growSpeed;
    if (ball.y + ball.vy > canvas.height - ball.size / 2) {
      ball.vy = -ball.vy;
    }
    if( ball.y + ball.vy < 0 + ball.size / 2){
      ball.vy=0;
    }
    if ((ball.x + ball.vx > canvas.width - ball.size / 2 || ball.x + ball.vx < 0 + ball.size / 2)) {
      ball.vx = -ball.vx;
    }
    if (ball.size > maxSize) {
      if (birds.length > minCount) {
        birds.splice(index, 1);
      } else {
        ball.size *= .5;
        ball.vx = -5 * Math.random();
        ball.vy = -(1 + Math.random() * 0.5) * Math.abs(ball.vy);
        birds.push(new bird(ball.x, ball.y, 5 * Math.random(), ball.vy, ball.size));
      }
    }
  });
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.font = "48px SquareFont Outline"

  ctx.fillText("FPS "+Math.floor(1000/(new Date().getTime()-time)), 20, 40)
  time=new Date().getTime();
  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function (e) {
  // if (!running) {
  //   clear();
  //   ball.x = e.offsetX;
  //   ball.y = e.offsetY;
  //   ball.draw();
  // }
});

canvas.addEventListener('click', function (e) {
  // if (!running) {
  //   raf = window.requestAnimationFrame(draw);
  //   running = true;
  // }
  birds.forEach(function (ball) {
    if (e.offsetX < (ball.x + ball.size / 2) && e.offsetX > (ball.x - ball.size / 2) && e.offsetY < (ball.y + ball.size / 2) && e.offsetY > (ball.y - ball.size / 2)) {
      ball.size *= .5;
      ball.vx = -5 * Math.random();
      ball.vy = -(1 + Math.random() * 0.5) * Math.abs(ball.vy);
      birds.push(new bird(ball.x, ball.y, 5 * Math.random(), ball.vy, ball.size));
    }
  });
});

canvas.addEventListener('mouseout', function (e) {
  // window.cancelAnimationFrame(raf);
  // running = false;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})
raf = window.requestAnimationFrame(draw);
// birds.draw();
