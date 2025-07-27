const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/todos', authMiddleware, todoRoutes);
app.use('/login', authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

module.exports = app; // Export for testing
