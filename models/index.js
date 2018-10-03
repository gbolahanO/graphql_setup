import mongoose from 'mongoose'
let Schema = mongoose.Schema

const dummySchema = new Schema({
  // Schema definition goes here
});

const dummyModel = mongoose.model('dummyModel', dummySchema);

export default dummyModel;