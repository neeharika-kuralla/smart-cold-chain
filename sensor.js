const http = require("http");

function generateSensorData() {

    const temperature = Number((Math.random() * 10).toFixed(1));
    const humidity = Math.floor(Math.random() * 21) + 50;

    const latitude = Number((17.3850 + (Math.random() - 0.5) * 0.01).toFixed(6));
    const longitude = Number((78.4867 + (Math.random() - 0.5) * 0.01).toFixed(6));

    const doorStatus = Math.random() > 0.8 ? "OPEN" : "CLOSED";

    return {
        temperature,
        humidity,
        latitude,
        longitude,
        doorStatus
    };
}

function sendSensorData() {

    const data = generateSensorData();

    const postData = JSON.stringify(data);

    const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/sensor",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    const request = http.request(options, (response) => {

        let responseData = "";

        response.on("data", (chunk) => {
            responseData += chunk;
        });

        response.on("end", () => {
            console.log("Sensor data sent:", data);
        });
    });

    request.on("error", (error) => {
        console.log("Error:", error.message);
    });

    request.write(postData);
    request.end();
}

// Send data every 5 seconds
setInterval(sendSensorData, 5000);

console.log("Sensor simulator started...");