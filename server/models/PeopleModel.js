

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

  DOB: {
    type: Date,
    required: true,
  },

  age: {
    type: Number,
    required: true,

    // let age equal the difference between the current date and the date of birth
    get: function() {
      return new Date().getFullYear() - this.DOB.getFullYear();
    },
  },

  juvenile: {
    type: Boolean,
    required: true,
  },

  sex: {
    type: String,
    required: true,
  },

  occupation: {
    type: String,
    required: true,

    // if juvenile is true, then default to 'school attending'

    
  },

  address: {
    
  }

});

export default mongoose.model('Person', PersonSchema);