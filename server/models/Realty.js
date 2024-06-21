const mongoose = require('../db/conn')

const realtySchema = new mongoose.Schema({
  listing_id: { type: String, required: true },
  title: { type: String, required: true },
  transaction_type: { type: String, required: true },
  //location_type: { type: String, required: true },
  country: { type: String, required: true, default: 'Brasil' },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zone: { type: String },
  neighborhood: { type: String, required: true },
  address: { type: String, required: true },
  street_number: { type: String, required: true },//Se precisar depois troca para Number
  complement: { type: String },
  postal_code: { type: String, required: true },//Se precisar depois troca para Number
  images: {type:[String]},
  video: { type: String },
  publication_type: { type: String, required: true },
  list_price: { type: Number, required: true, default: 0 },
  rental_price: { type: Number, required: true, default: 0 },
  admin_fee: { type: Number },
  iptu: { type: Number },
  description: { type: String, required: true },
  property_type: { type: String, required: true },
  area: { type: Number, required: true },
  features: Array,
  warranties: Array,
  bathroom: { type: Number, required: true },
  bedroom: { type: Number, required: true },
  garage: { type: Number },
  floors: { type: Number },
  unit_floor: { type: Number },
  buildings: { type: Number },
  suite: { type: Number },
  year_built: { type: Number },
  usage_type: { type: String, required: true },
  status: { type: String, default: "Disponível" },
  owner: Object,
  renter: Object
}, { timestamps: true })

const Realty = mongoose.model('Realty', realtySchema)

module.exports = Realty