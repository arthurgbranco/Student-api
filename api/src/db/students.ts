import { Student } from "../types/Student";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Updates an existing student
 * @returns updated student
 */
function updateStudent(id: number, student: Student) {
  const oldStudent = students.find((s) => s.id === id);
  const studentIndex = students.findIndex((s) => s.id === id);

  const updatedStudent = {
    ...oldStudent,
    ...student,
  };

  students[studentIndex] = updatedStudent;
  return Promise.resolve(updatedStudent);
}

/**
 * Deletes an existing student
 * @returns deletes a student
 */
function deleteStudent(id: number) {
  const studentIndex = students.findIndex((s) => s.id === id);
  const student = {
    ...students[studentIndex],
  };

  students.splice(studentIndex, 1);

  return Promise.resolve(student);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

const getStudent = (id: number) =>
  Promise.resolve(students.find((s) => s.id === id));

export { addStudent, getStudents, getStudent, updateStudent, deleteStudent };
