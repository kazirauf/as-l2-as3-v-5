import { TFacility } from './facility.interface';
import FacilityModel from './facility.model';

const createFacility = async (payload: TFacility) => {
  const result = await FacilityModel.create(payload);
  return result;
};

const updateFacility = async (id: string, payload: Partial<TFacility>) => {
  const result = await FacilityModel.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new Error('Facility not found'!);
  }

  return result;
};

const deleteFacility = async (id: string) => {
  const result = await FacilityModel.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

const getAllFacility = async () => {
  const result = await FacilityModel.find();
  return result;
};

export const FacilityServices = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
};
