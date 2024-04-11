const fs = require("fs");
const http = require("http");
const requests = require('requests');

const mainfile = fs.readFileSync("index.html", "utf-8");

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("http://api.openweathermap.org/data/2.5/weather?q=bagodar&appid=0033afcc66c2c259fb486d2f82a311a0")
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrdata = [objdata];
                console.log(arrdata[0].name)

                console.log((arrdata[0].main.temp - 273.15).toFixed(1) + "°C");
                
                let realtime = mainfile.replace(
                    "{%temperature%}", ((arrdata[0].main.temp - 273.15).toFixed(1) + "°C")).replace("{%city%}", arrdata[0].name)
                
                    res.write(realtime,"utf-8")
                // console.log(realtime);
                res.end(realtime); // Send modified content back to the client
            })
            .on("end", function (err) {
                // if (err) throw err;
                console.log("ended successfully");
            })
    }
});

server.listen(3000, () => {
    console.log("server is running at port ", 3000);
});
