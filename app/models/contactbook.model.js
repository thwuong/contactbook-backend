const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');
const {Schema} = mongoose;

const contactSchema = new Schema({
    name : {
        type : String,
        required : [true, "Contact name is required"]
    },
    email : {
        type : String,
        trim : true,
        lowercase : true,
    },
    address : String,
    phone : String,
    favorite : Boolean,
    },
    { timestamps : true }  
);

// replace id with _id remove __vd
contactSchema.method("toJSON", function () {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

//  plugin
contactSchema.plugin(mongoose_delete);
contactSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('Contact', contactSchema);