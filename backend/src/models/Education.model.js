const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    institute: { type: String, required: true, trim: true },
    degree: { type: String, trim: true },
    passingYear: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

educationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Education', educationSchema);
