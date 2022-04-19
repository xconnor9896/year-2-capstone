

const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  // The case number will be the mongoose _id

  personType: {
    enum: ['Complainant', 'Victim', 'Reporting Person', 'Finder', 'Witness', 'Suspect'],
    type: String,
    required: true,
  },

  race: {
    enum: ['White', 'Black/African American', 'Asian', 'American Indian/Alaska Native', 'Native Hawaiian/Pacific Islander', 'Hispanic/Latino'],
    type: String,
    required: true,
  },

  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    otherNames: [
      {
        type: String,
        required: false,
      }
    ],
  },

  // DOB: {
  //   type: Date,
  //   required: true,
  // },

  age: {
    type: Number,
    required: true,

    // let age equal the difference between the current date and the date of birth
    // get: function () {
    //   return new Date().getFullYear() - this.DOB.getFullYear();
    // },
  },

  // juvenile: {
  //   type: Boolean,
  //   required: true,
  // },

  sex: {
    type: String,
    required: true,
  },

  occupation: {
    type: String,
    required: true,

    // if juvenile is true, then default to 'school attending'

  },

  homeAddress: {

    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },

  workAddress: {
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    county: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zip: {
      type: Number,
      required: false,
    },
  },

  phoneNumbers: {
    primary: {
      type: String,
      required: true,
    },
    secondary: {
      type: String,
      required: false,
    },
    work: {
      type: String,
      required: false,
    },
  },

  email: {
    type: String,
    required: true,

  },


  SID: {
    type: String,
    required: false,
  },

  // victim relationships to suspect
  victimRelationship: {
    type: String,
    required: true,
  },

  // who described the person
  reportingPerson: {
    type: String,
    required: true,
  },

  // will prosecute the person
  isProsecuting: {
    type: Boolean,
    required: true,
  },

  // blood achool content
  bacTest: {
    isUsed: {
      type: Boolean,
      required: true,
    },
    results: {
      type: Number,
      required: false,
    },
  },

  Characteristics: {
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    build: {
      type: String,
      required: true,
    },
    hairColor: {
      type: String,
      required: true,
    },
    hairCharacteristics: {
      type: String,
      required: true,
    },
    complexion: {
      type: String,
      required: true,
    },
    voiceType: {
      type: String,
      required: true,
    },
    eyeColor: {
      type: String,
      required: true,
    },
    facialHairColor: {
      type: String,
      required: true,
    },
    facialHairCharacteristics: {
      type: String,
      required: true,
    },
    clothing: {
      type: String,
      required: true,
    },
  },



});



module.exports = mongoose.model('Person', PersonSchema);