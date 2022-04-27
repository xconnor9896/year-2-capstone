
// import the user schema
// const User = require('../models/UserModel');

// report model



const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  // The case number will be the mongoose _id

  basicInfo: {
    incidentType: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    reportType: {
      // keyRpt: false,
      // fu: false,

      enum: ['keyRpt', 'fu'],
      type: String,
      required: true,
    },

    status: {
      enum: ['open', "verified"],
      type: String,
      required: true,
      default: 'open',
    },

    disposition: {
      type: String,
      required: true,
    },

    arsSectionNumber: {
      type: String,
      required: true,
    },

    locationOfOffense: {
      type: String,
      required: true,
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
      ref: 'User',
      required: true,
    },

    beatOfOffense: {
      type: String,
      required: true,
    },

    domesticViolence: {
      type: Boolean,
      required: true,
    },

    incidentReportedAt: {
      date: {
        month: {
          type: String,
          required: true,
        },
        day: {
          type: String,
          required: true,
        },
        year: {
          type: String,
          required: true,
        },
      },
      day: {
        type: String,
        required: true,
      },
      time: {
        hour: {
          type: String,
          required: true,
        },
        minute: {
          type: String,
          required: true,
        },
      },
    },

    incidentOccurredAt: {
      from: {
        date: {
          month: {
            type: String,
            required: true,
          },
          day: {
            type: String,
            required: true,
          },
          year: {
            type: String,
            required: true,
          },
        },

        time: {
          hour: {
            type: String,
            required: true,
          },
          minute: {
            type: String,
            required: true,
          },
        },
      },
      to: {
        date: {
          month: {
            type: String,
            required: true,
          },
          day: {
            type: String,
            required: true,
          },
          year: {
            type: String,
            required: true,
          },
        },

        time: {
          hour: {
            type: String,
            required: true,
          },
          minute: {
            type: String,
            required: true,
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
      ref: 'Person',
      // makes there be at least one person
      required: true,
    },
  ],

  hospitalInfo: {
    injuryOccurred: {
      type: Boolean,
      required: true,
    },
    injuryTreated: {
      type: Boolean,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    transportedBy: {
      type: String,
      required: true,
    },
    emsNumber: {
      type: Number,
      required: true,
    },
    treatmentReasons: {
      mental: {
        type: Boolean,
        required: true,
      },
      suicide: {
        type: Boolean,
        required: true,
      },
      icf: {
        type: Boolean,
        required: true,
      },
      scf: {
        type: Boolean,
        required: true,
      },
      intox: {
        type: Boolean,
        required: true,
      },
      drugs: {
        type: Boolean,
        required: true,
      },
      indust: {
        type: Boolean,
        required: true,
      },
      uncon: {
        type: Boolean,
        required: true,
      },
      resisted: {
        type: Boolean,
        required: true,
      },
      other: {
        type: Boolean,
        required: true,
      },
    },
    patientCondition: {
      type: String,
      required: true,
    },
    patientDispo: {
      type: String,
      required: true,
    },
    attendingPhysician: {
      type: String,
      required: true,
    },
  },


  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  submittedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  ApprovedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,

    // make it so that only captains can approve
  },

  ApprovedAt: {
    date: {
      month: {
        type: String,
        required: true,
      },
      day: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
    },
    time: {
      hour: {
        type: String,
        required: true,
      },
      minute: {
        type: String,
        required: true,
      },
    },
  }



});

export default mongoose.model('Report', ReportSchema);