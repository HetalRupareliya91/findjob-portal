const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reason: { type: String, required: true, trim: true },
    status: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

reportSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Report', reportSchema);
