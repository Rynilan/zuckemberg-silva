const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
require('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors({
  origin: ['https://zuckemberg-silva.onrender.com', 'https://zuckemberg-silva.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
const contatoRoutes = require('./routes/contatoRoutes');
app.use('/api', contatoRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando com sucesso!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

