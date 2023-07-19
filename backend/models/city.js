"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: { type: String, trim: true, required: true },
    area: { type: String, trim: true, required: false },
    coordinates: { type: String, trim: true, required: false }
});

module.exports = mongoose.model("city", citySchema);