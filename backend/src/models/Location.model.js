const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

locationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Location', locationSchema);
