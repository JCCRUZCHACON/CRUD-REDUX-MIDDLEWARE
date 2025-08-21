import { useDispatch } from "react-redux";
import { deleteStudentThunk } from "../store/slices/students.slice";
import { setStudentSelected } from "../store/slices/studentSelected.slice";

const StudentCard = ({ student }) => {
  const dispatch = useDispatch(); 
  // Hook de Redux para poder enviar acciones (dispatch)

  // Función para editar un estudiante
  const handleEdit = () => {
    dispatch(setStudentSelected(student)); 
    // Guardamos el estudiante seleccionado en el estado de Redux

    const form = document.getElementById("form-student"); 
    // Buscamos el formulario en el DOM
    if (form) {
      form.scrollIntoView({ behavior: "smooth" }); 
      // Hacemos scroll suave hacia el formulario para que esté visible
    }
  };

  // Función para eliminar un estudiante
  const handleDelete = () => {
    if (confirm(`¿Eliminar a "${student.name}"?`)) {
      dispatch(deleteStudentThunk(student.id)); 
      // Llamamos al thunk de Redux para eliminarlo del backend y del estado
    }
  };

  return (
    <article className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      {/* Card del estudiante: fondo blanco, borde redondeado, sombra, padding, layout flexible */}
      {/* En móvil: columna; en sm y superiores: fila con items alineados arriba y separados */}

      {/* Info del estudiante */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
        <p className="text-sm text-gray-600">{student.email}</p>
        {student.username ? (
          <p className="text-xs text-gray-500">@{student.username}</p>
          // Mostramos username si existe
        ) : null}
      </div>

      {/* Botones Edit y Delete */}
      <div className="flex gap-2 sm:self-start">
        <button
          onClick={handleEdit}
          className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition"
        >
          Edit
          {/* Botón para editar */}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
        >
          Delete
          {/* Botón para eliminar */}
        </button>
      </div>
    </article>
  );
};

export default StudentCard;
