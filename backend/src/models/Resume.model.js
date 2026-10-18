const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    fileUrl: { type: String, trim: true },
    summary: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

resumeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
