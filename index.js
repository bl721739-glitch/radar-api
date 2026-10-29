const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Almacenamiento temporal para los servidores activos
let liveServers = [
    {
        name: "Gargoyle (Golden)",
        value: "$31.98B/s x12.12",
        timeAgo: "10m ago",
        placeId: 0,
        jobId: ""
    }
];

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Radar activa y funcionando correctamente.');
});

// Endpoint GET: Tu script en Roblox consultará aquí
app.get('/api/servers', (req, res) => {
    res.json(liveServers);
});

// Endpoint POST: Para registrar o actualizar servidores
app.post('/api/report', (req, res) => {
    const { name, value, timeAgo, placeId, jobId } = req.body;

    if (!name || !placeId || !jobId) {
        return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    liveServers.unshift({ name, value, timeAgo: timeAgo || "Just now", placeId, jobId });

    if (liveServers.length > 20) {
        liveServers.pop();
    }

    return res.status(200).json({ success: true, message: "Servidor registrado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});