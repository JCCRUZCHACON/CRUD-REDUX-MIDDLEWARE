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
  const dispatch = useDispatch();
  const studentSelected = useSelector((s) => s.studentSelected);

  useEffect(() => {
    reset(studentSelected || { name: "", email: "" });
  }, [studentSelected]);

  const submit = (data) => {
    if (studentSelected) {
      dispatch(updateStudentThunk(data));
      dispatch(setStudentSelected(null));
    } else {
      dispatch(createStudentThunk(data));
    }
    reset({ name: "", email: "" });
  };

  return (
    <form id="form-student"
      onSubmit={handleSubmit(submit)}
      className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        {studentSelected ? "Edit Student" : "Add Student"}
      </h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter user name"
          {...register("name", { required: true })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

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

      <button
        className={`w-full py-2 rounded-lg text-white font-semibold transition ${
          studentSelected
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {studentSelected ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default FormStudent;
