import { useEffect, useState } from "react";
import { FaAt, FaKey, FaMoon, FaSun } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import UsersAPI from "../utils/UsersAPI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  // UseEffect para redirecionar para página principal caso o usuário esteja logado
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        const user = await UsersAPI.login(email, password);
        console.log("Usuário logado com sucesso:", user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Tente novamente.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-base-200 gap-4">
        <div className="card bg-base-100 w-96 shadow-lg p-8 gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">memo.io</h1>
          </div>
          <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaAt className="text-neutral-content" />
              <input
                type="email"
                className="grow"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaKey className="text-neutral-content" />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary w-1/3"
            >
              Entrar
            </button>
          </form>
          <div>
            <p className="text-sm text-center">
              Não possui uma conta? <Link to="/signup" className="text-primary">Registre-se</Link>
            </p>
          </div>
        </div>
      </div>
      <button onClick={toggleTheme} className="btn btn-ghost btn-circle fixed top-4 right-4">
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </>
  );
}
