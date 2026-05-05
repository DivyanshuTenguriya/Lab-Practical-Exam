import data from "../../Data/data.js";

let students = data;
let nextId = Math.max(...students.map((s) => s.id)) + 1;

const getAllStudents = (req, res) => {
  res.status(200).json(students);
};

const getStudentById = (req, res) => {
  const { id } = req.params;
  const studentId = parseInt(id, 10);
  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
};

const addStudent = (req, res) => {
  const { name, marks } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  if (marks === undefined || marks === null) {
    return res.status(400).json({ message: "Marks is required" });
  }

  if (typeof marks !== "number" || marks < 0) {
    return res
      .status(400)
      .json({ message: "Marks must be a non-negative number" });
  }

  const newStudent = {
    id: nextId++,
    name: name.trim(),
    marks: marks,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, marks } = req.body;
  const studentId = parseInt(id, 10);
  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (name !== undefined && (name === null || name.trim() === "")) {
    return res.status(400).json({ message: "Name cannot be empty" });
  }

  if (
    marks !== undefined &&
    (marks === null || typeof marks !== "number" || marks < 0)
  ) {
    return res
      .status(400)
      .json({ message: "Marks must be a non-negative number" });
  }

  if (name !== undefined) {
    student.name = name.trim();
  }
  if (marks !== undefined) {
    student.marks = marks;
  }

  res.status(200).json(student);
};

const deleteStudent = (req, res) => {
  const { id } = req.params;
  const studentId = parseInt(id, 10);
  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);
  res
    .status(200)
    .json({ message: "Student deleted", student: deletedStudent[0] });
};

export {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
