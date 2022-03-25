const mongoose = reqiore("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  basicInfo: [
    {
      incident: {
        type: String,
        required: true,
      },
      code: {
        type: Number,
        required: true,
      },
      // on the report this is labeled reclass, key rpt, and f/u, this will probably be a checkbox but idk how to do this
      status: {
        // open or closed
      },
      dispatch: {
        type: Number,
        required: true,
      },
      hrsSection: {
        type: String,
        require: true,
      },
      location: {
        type: String,
        required: true,
      },
      officer: {
        type: Schema.Types.ObjectId,
        ref: "Officer",
        // might have to change this one
      },
      division: {
        type: String,
        required: true,
      },
      offenseBeat: {
        type: Number,
        required: true,
      },
      locationCode: {
        type: Number,
        required: true,
      },
      domesticViolence: {
        // type: Radio?
      },
      dateStart: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      dateEnd: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      comment: {
        type: String,
        default: "Enter any other information",
      },
    },
  ],
  personInfo: [
    {
      
    }
  ]
});

module.exports = mongoose.model("Report", ReportSchema);
