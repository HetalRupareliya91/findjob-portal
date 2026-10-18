const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

benefitSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Benefit', benefitSchema);
