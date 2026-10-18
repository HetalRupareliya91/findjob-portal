const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    headline: { type: String, trim: true },
    experienceYears: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

candidateSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Candidate', candidateSchema);
