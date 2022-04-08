
// import the user schema
const User = require('../models/UserModel');

// report model

const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
  },

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

    location: {
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
  },

  peopleInfo: [
    {
      
    }
  ],

  hospitalInfo: {
    injured: false,
    treated: false,
    hospital: "",
    transportedBy: "",
    emsNo: 0,
    treatmentReasons: "",
    patientCondition: "",
    patientDispo: "",
    attendingPhysician: "",
  },

  synopsis: "",
});

export default mongoose.model('Report', ReportSchema);