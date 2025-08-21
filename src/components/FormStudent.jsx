import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createStudentThunk,
  updateStudentThunk,
} from "../store/slices/students.slice";
import { setStudentSelected } from "../store/slices/studentSelected.slice";

const FormStudent = () => {
  const { register, handleSubmit, reset } = useForm();
  // useForm de react-hook-form nos permite manejar los inputs de manera sencilla
  const dispatch = useDispatch(); 
  // Hook de Redux para enviar acciones
  const studentSelected = useSelector((s) => s.studentSelected);
  // Traemos del estado el estudiante seleccionado para editar

  // Cuando cambia el estudiante seleccionado, llenamos el formulario o lo reseteamos
  useEffect(() => {
    reset(studentSelected || { name: "", email: "" });
  }, [studentSelected]);

  // Función para enviar el formulario
  const submit = (data) => {
    if (studentSelected) {
      // Si hay estudiante seleccionado, actualizamos
      dispatch(updateStudentThunk(studentSelected.id, data));
      dispatch(setStudentSelected(null)); // Limpiamos selección
    } else {
      // Si no, creamos un nuevo estudiante
      dispatch(createStudentThunk(data));
    }
    reset({ name: "", email: "" }); // Limpiamos el formulario después
  };

  return (
    <form
      id="form-student"
      onSubmit={handleSubmit(submit)}
      className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full max-w-md"
    >
      {/* Título del formulario cambia según si estamos editando o creando */}
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        {studentSelected ? "Edit Student" : "Add Student"}
      </h2>

      {/* Input para nombre */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter user name"
          {...register("name", { required: true })} 
          // react-hook-form registra este input y lo hace obligatorio
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Input para email */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter user email"
          {...register("email", { required: true })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Botón submit cambia color y texto según si editamos o creamos */}
      <button
        className={`w-full py-2 rounded-lg text-white font-semibold transition ${
          studentSelected
            ? "bg-yellow-500 hover:bg-yellow-600" // Amarillo para editar
            : "bg-blue-500 hover:bg-blue-600" // Azul para crear
        }`}
      >
        {studentSelected ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default FormStudent;
