interface ICreateStudentPayload {
  email: string;
  password: string;
  name: string;
  student: {
    name: string;
    age: number;
    classId?: string;
  };
}
