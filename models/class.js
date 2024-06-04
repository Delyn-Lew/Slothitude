const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 1 },
    description: { type: String, required: true, trim: true, minlength: 1 },
    date: { type: Date, required: true },
    duration: { type: Number, required: true, min: 1 }, // min: 1 -> duration must be at least 1 minutes
    instructor: { type: String, required: true, trim: true, minlength: 1 },
    location: { type: String, required: true, trim: true, minlength: 1 },
    capacity: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
  }
);

// sort classes by date in ascending order
classSchema.pre(/^find/, function (next) {
  this.sort({ date: 1 });
  next();
});

module.exports = mongoose.model("Class", classSchema);
