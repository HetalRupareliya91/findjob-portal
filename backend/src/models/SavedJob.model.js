const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, trim: true },
    note: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

savedJobSchema.index({ createdAt: -1 });

module.exports = mongoose.model('SavedJob', savedJobSchema);
