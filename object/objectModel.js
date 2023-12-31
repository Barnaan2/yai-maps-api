const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    objId: {
        type: String,
        required: [true, "An identifier for your object should be added!"]
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // Ensure the type is 'Point'
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
//! for the project and the objId the unique together field should be added .
objectSchema.index({ objId: 1 , project: 1 }, { unique: true })

// Create a 2dsphere index for the 'location' field for geospatial queries
objectSchema.index({ location: '2dsphere' });

// AGGREGATION MIDDLEWARE
// objectSchema.pre('aggregate',function(next){
//     this.pipeline().unshift({$match:{ deleted:{$ne: true}}})
// })

const Object = mongoose.model('Object', objectSchema);

module.exports = Object;
