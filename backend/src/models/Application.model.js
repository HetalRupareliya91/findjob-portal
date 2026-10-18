const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    coverLetter: { type: String, required: true, trim: true },
    status: { type: String, trim: true },
    expectedSalary: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

applicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Application', applicationSchema);
