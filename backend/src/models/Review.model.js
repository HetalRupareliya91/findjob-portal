const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
