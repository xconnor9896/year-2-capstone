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
      dates: [
        {
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
        },
      ],
      comment: {
        type: String,
        default: "Enter any other information",
      },
    },
  ],
  personInfo: [
    {
      person: {
        // possible values are complainant, victim, reportingPerson, finder, witness, suspect
      },
      name: [
        {
          firstName: {
            type: String,
            required: true,
          },
          middleInitial: {
            type: String,
          },
          lastName: {
            type: String,
            required: true,
          },
        },
      ],
      dateOfBirth: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      age: {
        type: Number,
        required: true,
        // probably make it so if age < 18, mark as juvenile
      },
      sex: {
        // radio for male/female, again idk how to do this
      },
      address: [
        {
          street: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
          zipcode: {
            type: Number,
            required: true,
          },
        },
      ],
      physicalDescription: [
        {
          height: {
            type: Number,
            required: true,
          },
          weight: {
            type: Number,
            required: true,
          },
          build: {
            type: String,
          },
          hair: [
            facial_hair = {
              color: {
                type: String,
              },
              type: {
                type: String,
              },
              required: true
            },
            {
              color: {
                type: String,
              },
              type: {
                type: String,
              }
            },
            required = true,
          ],
          eyes: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Report", ReportSchema);
