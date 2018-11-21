const netList = require('network-list');

// netList.scanEach({ip:'192.168.137'}, (err, obj) => {
//     if(obj.alive)
//         console.log(obj); // device object
    
// });


// let devices = await netList.scan({ip:'192.168.137'}, (err, arr) => {
//     let macList = []
//     macList.push('5c:cf:7f:c1:7b:ab');
//     let lives = arr.filter((device) =>{
//         return device.alive && macList.includes(device.mac)
//     })
//     console.log(lives)
//     return lives // array with all devices alive
// });

// function saySomething(msg){ console.log(msg) }

// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
// wait(2000).then(
//         () => saySomething("sometime passed")
//     ).catch(
//         () =>{console.log("failure")}
//     );
///////////////////////////////////////////////////////////////

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

let devices 
// wait(20000).then(
//     netList.scan({ip:'192.168.137'}, (err, arr) => {
//             let macList = []
//             macList.push('5c:cf:7f:c1:7b:ab');
//             let lives = arr.filter((device) =>{
//                 return device.alive && macList.includes(device.mac)
//             })
//             // console.log(lives)
//             return lives // array with all devices alive
//         })
//     ).catch(
//         () =>{console.log("failure")}
//     );

// const myPromise = (conf) => Promise(
    
//     netList.scan({ip: conf.ip}, (err, arr) => {
//         let lives = arr.filter((device) =>{
//             return device.alive && conf.macs.includes(device.mac)
//         })
//         // console.log(lives)
//         return lives // array with all devices alive
//     })
// );

actualConf = {
    ip:'192.168.137',
    macs: ['5c:cf:7f:c1:7b:ab']
}

var {err, arr} = await netList.scan({ip:'192.168.137'}, (err, arr) => {
    let macList = []
    macList.push('5c:cf:7f:c1:7b:ab');
    var lives = arr.filter((device) =>{
        return device.alive && macList.includes(device.mac)
    })
    // console.log(lives)
    return lives // array with all devices alive
})



// function getAliveDevices(conf){
//     return new Promise((resolve, reject) =>{
//         resolve(netList.scan({ip: conf.ip}, (err, arr) => {
//             let lives = arr.filter((device) =>{
//                 return device.alive && conf.macs.includes(device.mac)
//             })
//             console.log(lives)
//             return lives // array with all devices alive
//         })),
//         reject(()=>{console.log('deu ruim')})
//     });
// }


// async function getAll(conf){
//     devs = await getAliveDevices(conf)
//     console.log('sucesso!')
//     return devs
// }