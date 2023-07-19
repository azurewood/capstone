"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    city: { type: String, trim: true, required: true },
    content: { type: Object, trim: false, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("weather", weatherSchema);