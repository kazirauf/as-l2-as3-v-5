import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse/sendResponse';
import { FacilityServices } from './facility.service';

const createFacility: RequestHandler = async (req, res, next) => {
  try {
    const result = await FacilityServices.createFacility(req.body);

    sendResponse(res, result, 'Facility added succesfully');
  } catch (error) {
    next(error);
  }
};

const updateFacility: RequestHandler = async (req, res, next) => {
  try {
    const result = await FacilityServices.updateFacility(
      req.params.id,
      req.body,
    );

    sendResponse(res, result, 'Facility updated succesfully');
  } catch (error) {
    next(error);
  }
};

const deleteFacility: RequestHandler = async (req, res, next) => {
  try {
    const result = await FacilityServices.deleteFacility(req.params.id);

    sendResponse(res, result, 'Facility deleted succesfully');
  } catch (error) {
    next(error);
  }
};

const getAllFacility: RequestHandler = async (req, res, next) => {
  try {
    const result = await FacilityServices.getAllFacility();

    return res.status(result.length === 0 ? 404 : 200).json({
      success: result.length === 0 ? false : true,
      statusCode: result.length === 0 ? 404 : 200,
      message:
        result.length === 0
          ? 'No Data Found'
          : 'Facilities retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
};
