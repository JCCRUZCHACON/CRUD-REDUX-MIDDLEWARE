import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentsThunk } from "./store/slices/students.slice";
import FormStudent from "./components/FormStudent";
import StudentCard from "./components/StudentCard";

function App() {
  const dispatch = useDispatch();
  const students = useSelector((s) => s.students);

  useEffect(() => {
    dispatch(getStudentsThunk());
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-10">
        📚 Students CRUD
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Formulario a la izquierda */}
        <div className="md:col-span-1">
          <FormStudent />
        </div>

        {/* Lista de estudiantes */}
        <section className="md:col-span-2 space-y-4">
          {students.length > 0 ? (
            students.map((s) => <StudentCard key={s.id} student={s} />)
          ) : (
            <p className="text-center text-gray-500">
              No students found. Try adding one!
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
