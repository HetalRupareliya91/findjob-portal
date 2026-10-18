const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    scheduledAt: { type: Date, required: true },
    mode: { type: String, trim: true },
    notes: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

interviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Interview', interviewSchema);
