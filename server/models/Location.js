import mongoose, { Schema, SchemaTypes } from 'mongoose';
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

export const LocationSchema = new Schema({
    name: String,
    address:String,
    latitude: {
        type:SchemaTypes.Double
    },
    longitude: {
        type:SchemaTypes.Double
    },

    image: String,

    sector:{
        type: String,
        enum : ['public','private'],
        default: 'public'
    },
    createdAt: String
});

export const LocationModel = mongoose.model('Location', LocationSchema);