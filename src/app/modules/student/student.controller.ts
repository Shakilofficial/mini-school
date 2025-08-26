import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentService } from './student.service';
import { studentFilterableFields } from './student.constant';
import pick from '../../utils/pick';

const createStudent = catchAsync(async (req, res) => {
  const result = await studentService.createStudentIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await studentService.getAllStudentsFromDB(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Students retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getStudentDetailsById = catchAsync(async (req, res) => {
  const result = await studentService.getStudentDetailsByIdFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

export const studentController = {
  createStudent,
  getAllStudents,
  getStudentDetailsById,
};
