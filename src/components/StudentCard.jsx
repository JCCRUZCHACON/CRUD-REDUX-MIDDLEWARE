import { useDispatch } from "react-redux";
import { deleteStudentThunk } from "../store/slices/students.slice";
import { setStudentSelected } from "../store/slices/studentSelected.slice";

const StudentCard = ({ student }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setStudentSelected(student));
    const form = document.getElementById("form-student");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDelete = () => {
    if (confirm(`¿Eliminar a "${student.name}"?`)) {
      dispatch(deleteStudentThunk(student.id));
    }
  };

  return (
    <article className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      {/* Info del estudiante */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
        <p className="text-sm text-gray-600">{student.email}</p>
        {student.username ? (
          <p className="text-xs text-gray-500">@{student.username}</p>
        ) : null}
      </div>

      {/* Botones */}
      <div className="flex gap-2 sm:self-start">
        <button
          onClick={handleEdit}
          className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default StudentCard;
