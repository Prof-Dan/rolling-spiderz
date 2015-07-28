var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var Logitech = require('logitech-dual-action-controller');
var controller = new Logitech();
var rollingSpider = new RollingSpider();

var fwd = true;
var bwd = true;
var left = true;
var right = true;

process.setMaxListeners(0);

rollingSpider.connect(function () {
  rollingSpider.setup(function () {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();
    console.log('Ready.');
    controller.on('4:press', function() {

      console.log('Take Off!')
      rollingSpider.calibrate();
      rollingSpider.takeOff();
      rollingSpider.flatTrim();

    })
    controller.on('2:press', function() {

      console.log('Land!');
      rollingSpider.land(function(){console.log('Landed!');});

    })
    controller.on('1:press', function() {

      console.log('Trim');
      rollingSpider.calibrate(function(){console.log('done');});

    })
    controller.on('3:press', function() {

      console.log('EMERGANCY');
      rollingSpider.emergancy();

    })
    controller.on('10:press', function() {

      console.log('Disconnect.');
      rollingSpider.disconnect();

    })
    controller.on('5:press', function() {

      console.log('Front Flip');
      rollingSpider.frontFlip();

    })
    controller.on('6:press', function() {

      console.log('Back Flip');
      rollingSpider.backFlip();

    })
    controller.on('9:press', function() {

      console.log('up');
      rollingSpider.up({speed:1})

    })
    controller.on('left:move', function(data) {

      if(data.y >= 90 && fwd) {

        console.log('Forward!');
        rollingSpider.forward();
        fwd = false;

      }
      else if(data.y <= -90 && bwd) {

        console.log('Backward!');
        rollingSpider.backward();
        bwd = false;

      }
      else if(data.x >= 90 && right) {

        console.log('Right!');
        rollingSpider.right();
        right = false;

      }
      else if(data.x <= -90 && left) {

        console.log('Left!');
        rollingSpider.left();
        left = false;

      }

      if(data.x > -50 && data.x < 50 && data.y > -50 && data.y < 50) {

        fwd = true;
        bwd = true;
        left = true;
        right = true;

      }

    });
    controller.on('right:move', function(data) {

      if(data.y > 5)rollingSpider.up({speed:data.y,steps:1});
      if(data.y < -5)rollingSpider.down({speed:-data.y,steps:1});
      if(data.x > 20)rollingSpider.turnLeft({speed:data.y,steps:10});
      if(data.x < -20)rollingSpider.turnRight({speed:-data.y,steps:10});

    })
  });
});
