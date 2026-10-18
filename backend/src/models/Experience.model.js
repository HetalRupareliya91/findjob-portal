const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    years: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

experienceSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Experience', experienceSchema);
