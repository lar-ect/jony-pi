const five = require("johnny-five");
const firmata = require("firmata").Board;
const EtherPortClient = require("etherport-client").EtherPortClient;

const boardHandler = function(){
  console.log('board ready');
  
  let rgb = new five.Led.RGB({
    pins: {
      red: 15,
      green: 12,
      blue: 13
    }
  })

  this.on('exit', function(){       console.log('exit')});
  this.on('close', function(){      console.log('close')});
  this.on('disconnect', function(){ console.log('disconnect')});

  rgb.color("#ff00ff");
//  rgb.red.blink(250);
//  rgb.green.blink(1000);
//  rgb.blue.blink(500);
}

const ESP = new five.Board({
  io: new firmata(new EtherPortClient({
    host: '192.168.137.70',
    port: 3030
    // mac: "5c:cf:7f:c1:7b:ab"
  }))
})



ESP.on("ready", boardHandler)