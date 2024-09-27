// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaEdit, FaTrash, FaSync, FaDatabase } from 'react-icons/fa';

// const App = () => {
//   const [spreadsheetId, setSpreadsheetId] = useState(localStorage.getItem('spreadsheetId') || '');
//   const [connected, setConnected] = useState(!!spreadsheetId);
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({ name: '', email: '', course: '', grade: '' });
//   const [editingStudent, setEditingStudent] = useState(null);

//   useEffect(() => {
//     if (connected) {
//       fetchStudents();
//     }
//   }, [connected]);

//   const connectToSheet = async () => {
//     try {
//       const response = await axios.post('http://localhost:5100/students/connect', { spreadsheetId });
//       if (response.data.success) {
//         localStorage.setItem('spreadsheetId', spreadsheetId);
//         setConnected(true);
//         fetchStudents();
//       }
//     } catch (error) {
//       console.error('Error connecting to sheet:', error);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:5100/students');
//       if (Array.isArray(response.data)) {
//         setStudents(response.data);
//       } else {
//         console.error('Unexpected data format:', response.data);
//         setStudents([]); // Clear state if data format is unexpected
//       }
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const addStudent = async () => {
//     try {
//       await axios.post('http://localhost:5100/students', newStudent);
//       fetchStudents(); // Refresh student list
//       setNewStudent({ name: '', email: '', course: '', grade: '' });
//     } catch (error) {
//       console.error('Error adding student:', error);
//     }
//   };

//   const deleteStudent = async (email) => {
//     try {
//       await axios.delete(`http://localhost:5100/students/${email}`);
//       fetchStudents(); // Refresh student list
//     } catch (error) {
//       console.error('Error deleting student:', error);
//     }
//   };

//   const updateStudent = async () => {
//     try {
//       await axios.put(`http://localhost:5100/students/${editingStudent.email}`, editingStudent);
//       fetchStudents(); // Refresh student list
//       setEditingStudent(null);
//     } catch (error) {
//       console.error('Error updating student:', error);
//     }
//   };

//   const syncToSheet = async () => {
//     try {
//       await axios.get('http://localhost:5100/sync');
//       alert('Synced to db successfully');
//     } catch (error) {
//       alert('Error syncing to db:', error);
//     }
//   };

//   const syncToDb = async () => {
//     try {
//       await axios.get('http://localhost:5100/sync-db');
//       alert('Synced to sheet successfully');
//     } catch (error) {
//       alert('Error syncing to sheet:', error);
//     }
//   };

//   const connectNewSheet = async () => {
//     try {
//       setConnected(false)
//       console.log('connect to new sheet successfully');
//     } catch (error) {
//       console.error('Error connect to new sheet:', error);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
//         <h1 className="text-4xl font-bold text-gray-900 text-center mb-8 border-b-2 border-gray-300 pb-4">Superjoin Assignment by Piyush Kumar </h1>

//         {!connected ? (
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect to Google Sheets</h2>
//             <input
//               type="text"
//               className="border border-gray-300 p-4 rounded-lg w-full max-w-md mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               placeholder="Enter Google Sheet ID"
//               value={spreadsheetId}
//               onChange={(e) => setSpreadsheetId(e.target.value)}
//             />
//             <button
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
//               onClick={connectToSheet}
//             >
//               Connect
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Student</h2>
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                   placeholder="Name"
//                   value={newStudent.name}
//                   onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
//                 />
//                 <input
//                   type="email"
//                   className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                   placeholder="Email"
//                   value={newStudent.email}
//                   onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                   placeholder="Course"
//                   value={newStudent.course}
//                   onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                   placeholder="Grade"
//                   value={newStudent.grade}
//                   onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
//                 />
//                 <button
//                   className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
//                   onClick={addStudent}
//                 >
//                   Add Student
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student List</h2>
//               {Array.isArray(students) && students.length > 0 ? (
//                 <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
//                   <thead className="bg-gray-100 text-gray-700">
//                     <tr>
//                       <th className="border-b py-2 px-4 text-left">Name</th>
//                       <th className="border-b py-2 px-4 text-left">Email</th>
//                       <th className="border-b py-2 px-4 text-left">Course</th>
//                       <th className="border-b py-2 px-4 text-left">Grade</th>
//                       <th className="border-b py-2 px-4 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {students.map((student) => (
//                       <tr key={student.email} className="hover:bg-gray-50 transition duration-300">
//                         <td className="border-b py-2 px-4">{student.name}</td>
//                         <td className="border-b py-2 px-4">{student.email}</td>
//                         <td className="border-b py-2 px-4">{student.course}</td>
//                         <td className="border-b py-2 px-4">{student.grade}</td>
//                         <td className="border-b py-2 px-4 flex gap-2 justify-center">
//                           <button
//                             className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
//                             onClick={() => setEditingStudent(student)}
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
//                             onClick={() => deleteStudent(student.email)}
//                           >
//                             <FaTrash />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p className="text-gray-600 text-center">No students found.</p>
//               )}
//             </div>

//             {editingStudent && (
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Student</h2>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                     placeholder="Name"
//                     value={editingStudent.name}
//                     onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
//                   />
//                   <input
//                     type="email"
//                     className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                     placeholder="Email"
//                     value={editingStudent.email}
//                     onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                     placeholder="Course"
//                     value={editingStudent.course}
//                     onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                     placeholder="Grade"
//                     value={editingStudent.grade}
//                     onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
//                   />
//                   <button
//                     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//                     onClick={updateStudent}
//                   >
//                     Update Student
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-around mt-8">
//               <button
//                 className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 flex items-center"
//                 onClick={syncToSheet}
//               >
//                 Sync to DB
//                 <FaDatabase className="ml-2" />
//               </button>
//               <button
//                 className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center"
//                 onClick={syncToDb}
//               >
//                 Sync to  Sheet
//                 <FaSync className="ml-2" />
//               </button>
//               <button
//                 className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center"
//                 onClick={connectNewSheet}
//               >
//                 Connect to new sheet
//                 <FaSync className="ml-2" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;




import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSync, FaDatabase } from 'react-icons/fa';

const App = () => {
  const [spreadsheetId, setSpreadsheetId] = useState(localStorage.getItem('spreadsheetId') || '');
  const [connected, setConnected] = useState(!!spreadsheetId);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', course: '', grade: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    if (connected) {
      fetchStudents();
    }
  }, [connected]);

  const connectToSheet = async () => {
    try {
      const response = await axios.post('http://localhost:5100/students/connect', { spreadsheetId });
      if (response.data.success) {
        localStorage.setItem('spreadsheetId', spreadsheetId);
        setConnected(true);
        fetchStudents();
      }
    } catch (error) {
      console.error('Error connecting to sheet:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5100/students');
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async () => {
    try {
      await axios.post('http://localhost:5100/students', newStudent);
      fetchStudents(); 
      setNewStudent({ name: '', email: '', course: '', grade: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const deleteStudent = async (email) => {
    try {
      await axios.delete(`http://localhost:5100/students/${email}`);
      fetchStudents(); 
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const updateStudent = async () => {
    try {
      await axios.put(`http://localhost:5100/students/${editingStudent.email}`, editingStudent);
      fetchStudents(); 
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const syncToSheet = async () => {
    try {
      await axios.get('http://localhost:5100/sync');
      alert('Synced to db successfully');
    } catch (error) {
      alert('Error syncing to db:', error);
    }
  };

  const syncToDb = async () => {
    try {
      await axios.get('http://localhost:5100/sync-db');
      alert('Synced to sheet successfully');
    } catch (error) {
      alert('Error syncing to sheet:', error);
    }
  };

  const connectNewSheet = async () => {
    try {
      setConnected(false);
      console.log('connect to new sheet successfully');
    } catch (error) {
      console.error('Error connect to new sheet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex justify-center items-center">
      <div className="bg-gray-800 shadow-xl rounded-xl w-full max-w-4xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-100 text-center mb-8">Sheet Database Task</h1>

        {!connected ? (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-300">Connect to Google Sheets</h2>
            <input
              type="text"
              className="border border-gray-600 p-4 rounded-lg w-full max-w-md mx-auto focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-700 text-gray-200"
              placeholder="Enter Google Sheet ID"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
            />
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={connectToSheet}
            >
              Connect
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Add New Student</h2>
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                  placeholder="Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <input
                  type="email"
                  className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
                <input
                  type="text"
                  className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                  placeholder="Course"
                  value={newStudent.course}
                  onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                />
                <input
                  type="text"
                  className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                  placeholder="Grade"
                  value={newStudent.grade}
                  onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                />
                <button
                  className="bg-indigo-600 text-white col-span-2 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                  onClick={addStudent}
                >
                  Add Student
                </button>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Student List</h2>
              {students.length > 0 ? (
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.email} className="flex justify-between items-center p-4 bg-gray-800 shadow-md rounded-lg">
                      <div className="space-y-1">
                        <p className="text-lg font-semibold">{student.name}</p>
                        <p className="text-gray-400">{student.email}</p>
                        <p className="text-gray-400">{student.course}</p>
                        <p className="text-gray-400">{student.grade}</p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                          onClick={() => setEditingStudent(student)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
                          onClick={() => deleteStudent(student.email)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center">No students found.</p>
              )}
            </div>

            {editingStudent && (
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">Edit Student</h2>
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                    placeholder="Name"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  />
                  <input
                    type="email"
                    className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                    placeholder="Email"
                    value={editingStudent.email}
                    onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  />
                  <input
                    type="text"
                    className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                    placeholder="Course"
                    value={editingStudent.course}
                    onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
                  />
                  <input
                    type="text"
                    className="border border-gray-600 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-gray-200"
                    placeholder="Grade"
                    value={editingStudent.grade}
                    onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                  />
                  <button
                    className="bg-green-600 text-white col-span-2 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={updateStudent}
                  >
                    Update Student
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
                onClick={syncToDb}
              >
                <FaSync className="mr-2" /> Sync to Sheet
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                onClick={syncToSheet}
              >
                <FaDatabase className="mr-2" /> Sync to DB
              </button>
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
                onClick={connectNewSheet}
              >
                <FaTrash className="mr-2" /> Connect New Sheet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
