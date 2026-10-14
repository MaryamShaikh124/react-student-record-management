
import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    email: "",
    department: "",
    semester: ""
  });

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      student.rollNo.trim() === "" ||
      student.name.trim() === "" ||
      student.email.trim() === "" ||
      student.department.trim() === "" ||
      student.semester.trim() === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (editId === null) {
      const newStudent = {
        ...student,
        id: Date.now()
      };

      setStudents([...students, newStudent]);
    } else {
      const updatedStudents = students.map((item) =>
        item.id === editId
          ? { ...student, id: editId }
          : item
      );

      setStudents(updatedStudents);
      setEditId(null);
    }

    setStudent({
      rollNo: "",
      name: "",
      email: "",
      department: "",
      semester: ""
    });

    setError("");
  }

  function editStudent(item) {
    setStudent({
      rollNo: item.rollNo,
      name: item.name,
      email: item.email,
      department: item.department,
      semester: item.semester
    });

    setEditId(item.id);
    setError("");
  }

  function deleteStudent(id) {
    setStudents(students.filter((item) => item.id !== id));

    if (editId === id) {
      cancelEdit();
    }
  }

  function cancelEdit() {
    setEditId(null);

    setStudent({
      rollNo: "",
      name: "",
      email: "",
      department: "",
      semester: ""
    });

    setError("");
  }

  return (
    <div className="app">
      <h1>Student Record Management System</h1>
      <p className="subtitle">
        Manage student information easily.
      </p>

      <div className="form-box">
        <h2>
          {editId === null ? "Add Student" : "Update Student"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={student.rollNo}
            onChange={handleChange}
          />

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={student.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={student.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={student.department}
            onChange={handleChange}
          />

          <input
            type="number"
            name="semester"
            placeholder="Semester"
            min="1"
            value={student.semester}
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          <div className="form-buttons">
            <button type="submit">
              {editId === null ? "Add Student" : "Update Student"}
            </button>

            {editId !== null && (
              <button
                type="button"
                className="cancel-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="records-box">
        <h2>Student Records</h2>
        <p>Total Students: {students.length}</p>

        {students.length === 0 ? (
          <p>No student records available.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((item) => (
                  <tr key={item.id}>
                    <td>{item.rollNo}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>{item.semester}</td>
                    <td>
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => editStudent(item)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => deleteStudent(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
