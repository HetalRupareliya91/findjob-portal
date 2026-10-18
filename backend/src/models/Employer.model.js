const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    phone: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

employerSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Employer', employerSchema);
