import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { classService } from './class.service';
import pick from '../../utils/pick';
import { classFilterableFields } from './class.constant';

const getAllClasses = catchAsync(async (req, res) => {
  const filters = pick(req.query, classFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await classService.getAllClassesFromDB(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Classes retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const createClass = catchAsync(async (req, res) => {
  const result = await classService.createClassIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Class created successfully',
    data: result,
  });
});

const enrollStudent = catchAsync(async (req, res) => {
  const result = await classService.enrollStudentIntoClass(
    req.params.id,
    req.body.studentId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student enrolled successfully',
    data: result,
  });
});

const getStudentsOfClass = catchAsync(async (req, res) => {
  const result = await classService.getStudentsOfClassFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Class students retrieved successfully',
    data: result,
  });
});

export const classController = {
  getAllClasses,
  createClass,
  enrollStudent,
  getStudentsOfClass,
};
