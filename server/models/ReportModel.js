// import the user schema
// const User = require('../models/UserModel');

// report model

const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  // The case number will be the mongoose _id

  basicInfo: {
    incidentType: {
      type: String,
      required: false,
    },

    code: {
      type: String,
      required: false,
    },

    reportType: {
      // keyRpt: false,
      // fu: false,

      enum: ["keyRpt", "fu"],
      type: String,
      required: false,
    },

    importance: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
      default: 3,
    },

    verified: {
      type: Boolean,
      required: true,
      default: false,
    },

    disposition: {
      type: String,
      required: false,
    },

    arsSectionNumber: {
      type: String,
      required: false,
    },

    locationOfOffense: {
      type: String,
      required: false,
    },

    responsibleOfficer: {
      // name: {
      //   firstName: "",
      //   middleName: "",
      //   lastName: "",
      // },
      // rank: "",
      // badgeNumber: "",
      // division: "",

      // use the user model
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    beatOfOffense: {
      type: String,
      required: false,
    },

    domesticViolence: {
      type: Boolean,
      required: false,
    },

    incidentReportedAt: {
      date: {
        month: {
          type: String,
          required: false,
        },
        day: {
          type: String,
          required: false,
        },
        year: {
          type: String,
          required: false,
        },
      },
      day: {
        type: String,
        required: false,
      },
      time: {
        hour: {
          type: String,
          required: false,
        },
        minute: {
          type: String,
          required: false,
        },
      },
    },

    incidentOccurredAt: {
      from: {
        date: {
          month: {
            type: String,
            required: false,
          },
          day: {
            type: String,
            required: false,
          },
          year: {
            type: String,
            required: false,
          },
        },

        time: {
          hour: {
            type: String,
            required: false,
          },
          minute: {
            type: String,
            required: false,
          },
        },
      },
      to: {
        date: {
          month: {
            type: String,
            required: false,
          },
          day: {
            type: String,
            required: false,
          },
          year: {
            type: String,
            required: false,
          },
        },

        time: {
          hour: {
            type: String,
            required: false,
          },
          minute: {
            type: String,
            required: false,
          },
        },
      },
    },

    relatedComments: {
      type: String,
      required: false,
    },
    synopsis: {
      type: String,
      required: false,
      maxCount: 300,
    },

    reportNarrative: {
      type: String,
      required: false,
      maxCount: 500,
    },
  },

  peopleInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      // makes there be at least one person
      required: false,
    },
  ],

  hospitalInfo: {
    injuryOccurred: {
      type: Boolean,
      required: false,
    },
    injuryTreated: {
      type: Boolean,
      required: false,
    },
    hospital: {
      type: String,
      required: false,
    },
    transportedBy: {
      type: String,
      required: false,
    },
    emsNumber: {
      type: Number,
      required: false,
    },
    treatmentReasons: {
      mental: {
        type: Boolean,
        required: false,
      },
      suicide: {
        type: Boolean,
        required: false,
      },
      icf: {
        type: Boolean,
        required: false,
      },
      scf: {
        type: Boolean,
        required: false,
      },
      intox: {
        type: Boolean,
        required: false,
      },
      drugs: {
        type: Boolean,
        required: false,
      },
      indust: {
        type: Boolean,
        required: false,
      },
      uncon: {
        type: Boolean,
        required: false,
      },
      resisted: {
        type: Boolean,
        required: false,
      },
      other: {
        type: Boolean,
        required: false,
      },
    },
    patientCondition: {
      type: String,
      required: false,
    },
    patientDispo: {
      type: String,
      required: false,
    },
    attendingPhysician: {
      type: String,
      required: false,
    },
  },

  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  submittedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },

  ApprovedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,

    // make it so that only captains can approve
  },

  ApprovedAt: {
    date: {
      month: {
        type: String,
        required: false,
      },
      day: {
        type: String,
        required: false,
      },
      year: {
        type: String,
        required: false,
      },
    },
    time: {
      hour: {
        type: String,
        required: false,
      },
      minute: {
        type: String,
        required: false,
      },
    },
  },
});

module.exports = mongoose.model("Report", ReportSchema);
