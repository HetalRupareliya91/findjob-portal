const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true },
    published: { type: Boolean },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

blogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
