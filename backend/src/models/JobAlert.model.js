const mongoose = require('mongoose');

const jobAlertSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, trim: true },
    frequency: { type: String, trim: true },
    active: { type: Boolean },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

jobAlertSchema.index({ createdAt: -1 });

module.exports = mongoose.model('JobAlert', jobAlertSchema);
