const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

// Store the latest sensor reading
let sensorData = {
    temperature: 5.5,
    humidity: 60,
    latitude: 17.3850,
    longitude: 78.4867,
    doorStatus: "CLOSED",
    timestamp: new Date()
};

// Get latest sensor data
app.get("/api/sensor", (req, res) => {
    res.json(sensorData);
});

// Receive new sensor data
app.post("/api/sensor", (req, res) => {

    sensorData = {
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        doorStatus: req.body.doorStatus,
        timestamp: new Date()
    };

    res.json({
        message: "Sensor data received successfully",
        data: sensorData
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});