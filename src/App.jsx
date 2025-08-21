import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentsThunk } from "./store/slices/students.slice";
import FormStudent from "./components/FormStudent";
import StudentCard from "./components/StudentCard";

function App() {
  const dispatch = useDispatch(); 
  // Hook de Redux para poder enviar acciones (dispatch)

  const students = useSelector((s) => s.students); 
  // Hook de Redux para leer el estado "students" del store

  useEffect(() => {
    dispatch(getStudentsThunk());
    // Cuando el componente se monta, hacemos la petición para traer los estudiantes
  }, []); 
  // Array vacío significa que esto solo se ejecuta una vez al montar el componente

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Contenedor principal de la app con fondo gris y padding */}

      <h1 className="text-3xl font-bold text-center text-gray-700 mb-10">
        📚 Students CRUD
        {/* Título principal de la app */}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Grid responsivo: 1 columna en móvil, 3 columnas en desktop, con gap entre columnas */}

        {/* Formulario a la izquierda */}
        <div className="md:col-span-1">
          <FormStudent />
          {/* Componente del formulario para agregar/editar estudiantes */}
        </div>

        {/* Lista de estudiantes */}
        <section className="md:col-span-2 space-y-4">
          {students.length > 0 ? (
            // Si hay estudiantes, los mostramos con map
            students.map((s) => <StudentCard key={s.id} student={s} />)
          ) : (
            <p className="text-center text-gray-500">
              No students found. Try adding one!
              {/* Mensaje cuando no hay estudiantes */}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
