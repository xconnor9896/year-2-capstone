

const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({});

export default mongoose.model('Person', PersonSchema);