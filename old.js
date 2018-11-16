const five = require("johnny-five");
const firmata = require("firmata").Board;
const EtherPortClient = require("etherport-client").EtherPortClient;

 var board = new five.Board({
  io: new firmata(new EtherPortClient({
    host: "192.168.137.95",
    port: 3030
  }))
})
 
board.on("ready", function () {
  console.log("READY!");
  var rgb = new five.Led.RGB({
    pins: {
      red: 15,
      green: 12,
      blue: 13
    }
  })
  
  rgb.color(`#FA0000`)
   var sensor = new five.Sensor({
    pin: "A0",
    freq: 250,
    threshold: 5
  })
   sensor.on("change", function () {
    console.log(this.scaleTo(0, 1023));
  });
})