import mongoose, { Schema } from 'mongoose';
import { TFacility } from './facility.interface';

const FacilitySchema: Schema = new Schema<TFacility>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

const FacilityModel = mongoose.model<TFacility>('Facility', FacilitySchema);

export default FacilityModel;
