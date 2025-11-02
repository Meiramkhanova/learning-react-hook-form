import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ email: "", password: "" }); //because this is a new form submission

    //Manual validation
    if (!email.includes("@")) {
      setErrors({ ...errors, email: "Email must include @" });
      return;
    }

    if (password.length < 8) {
      setErrors({ ...errors, password: "Password must be at least" });
    }

    console.log("Form submitted");
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form className="tutorial flex flex-col gap-8" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          className="border py-4 rounded px-3 w-96 border-gray-400 outline-none text-gray-600 focus:border-lime-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {errors.email && <div className="text-red-500">{errors.email}</div>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border py-4 rounded px-3 w-96 border-gray-400 outline-none text-gray-600 focus:border-lime-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {errors.password && (
          <div className="text-red-500">{errors.password}</div>
        )}

        <button
          type="submit"
          className="border py-4 rounded px-3 w-96 outline-none text-white bg-lime-300 hover:bg-lime-500 cursor-pointer transition-colors duration-300 ease-in-out border-lime-300 hover:border-lime-500">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
