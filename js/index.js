//gacha machine

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var ball1 = document.getElementById('ball1');//圖片對象
var ball2 = document.getElementById('ball2');//圖片對象
var ball3 = document.getElementById('ball3');//圖片對象
var ball4 = document.getElementById('ball4');//圖片對象
var ballList = [ball1, ball2, ball3, ball4];//圖片對象數組
var ballNum = 20;//扭蛋機裏面的小球數
var awardList = [];//扭蛋機中的小球集合
var timer;//計時器
var award = document.getElementById('awardBall');
var message = document.getElementById('message');

function Ball(index, img) {
  this.r = 30;//小球半徑
  this.x = this.rand(canvas.width - this.r * 2);//小球初始橫坐標
  this.y = this.rand(canvas.height - this.r * 2);//小球初始縱坐標
  this.color = index;//小球顏色，以下標表示
  this.img = img;//小球素材
  do {
      this.speedX = this.rand(20) - 10;
  } while (this.speedX < 5);//小球橫坐標改變速度
  do {
      this.speedY = this.rand(20) - 10;
  } while (this.speedY < 5);//小球縱坐標改變速度
}

Ball.prototype = {
  rand: function (num) {//隨機數
      return Math.random() * num;
  },
  run: function () {//小球運動函數
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width - this.r * 2) {//小球碰到右邊界，橫坐標速度變為負
          this.speedX = -this.speedX;
      }
      if (this.x < 0) {//小球碰到左邊界，橫坐標速度變為正
          this.speedX = Math.abs(this.speedX);
      }
      if (this.y > canvas.height - this.r * 2) {//小球碰到下邊界，縱坐標速度變為負
          this.speedY = -this.speedY;
      }
      if (this.y < 0) {//小球碰到上邊界，縱坐標速度變為正
          this.speedY = Math.abs(this.speedY);
      }
      ctx.drawImage(this.img, this.x, this.y, 60, 60);//繪制小球
  }
}

function init() {//初始化
  for (let i = 0; i < ballNum; i++) {//隨機生成各色小球
      let index = Math.floor(4 * Math.random());
      awardList[i] = new Ball(index, ballList[index]);//新建小球對象
  }
  window.clearInterval(timer);//清除計時器
  timer = setInterval(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);//清空畫布
      for (let i = 0; i < awardList.length; i++) {
          awardList[i].run();
      }//使小球運動
  }, 15);
}

function play() {
  if (awardList.length === 0) {//獎池中沒有小球
			init();
      message.innerText = '點擊抽獎';
  } else {
      window.clearInterval(timer);//清除計時器
      let r = awardList.pop();//將獎池中的小球減少
      timer = setInterval(function () {
          ctx.clearRect(0, 0, canvas.width, canvas.height);//清空畫布
          for (let i = 0; i < awardList.length; i++) {
              awardList[i].run();
          }//使小球運動
      }, 15);
      switch (r.color) {//小球掉落動畫
          case 0:
              award.setAttribute('class', 'dropBall1');
              break;
          case 1:
              award.setAttribute('class', 'dropBall2');
              break;
          case 2:
              award.setAttribute('class', 'dropBall3');
              break;
          case 3:
              award.setAttribute('class', 'dropBall4');
              break;
      }
      setTimeout(function () {//扭蛋成功提示
          award.setAttribute('class', '');
          switch (r.color) {
              case 0:
                  message.innerText = '紫球！';
                  break;
              case 1:
                  message.innerText = '綠球！';
                  break;
              case 2:
                  message.innerText = '黃球！';
                  break;
              case 3:
                  message.innerText = '紅球！';
                  break;
          }
      }, 1100);
  }
}
