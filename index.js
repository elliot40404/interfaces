const { networkInterfaces } = require("os");
const interfaces = networkInterfaces();
const { spawn, exec } = require("child_process");

let IP = "127.0.0.1";
let PORT = process.argv[2] || 3000;

function check(dev) {
    const ip = Object.keys(dev);
    if (ip.includes("Ethernet")) {
    IP = dev.Ethernet[1].address;
    } else {
        IP = dev["Wi-Fi"][1].address;
    }
}
check(interfaces);

const ls = exec(`npx http-server -p ${PORT} -a ${IP}`);
console.log(`⚡ SERVER RUNNING ON http://${IP}:${PORT}`);
ls.stdout.on('data', (data) => {
    console.log(data);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: \n${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});