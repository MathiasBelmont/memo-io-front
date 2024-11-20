import { useEffect, useState } from "react";
import { FaAt, FaKey, FaMoon, FaSun, FaUser } from "react-icons/fa6";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nome:", username, "Email:", email, "Senha:", password);
  };

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-base-200 gap-4">
        <div className="card bg-base-100 w-96 shadow-lg p-8 gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">memo.io</h1>
          </div>
          <form className="flex flex-col gap-4 items-center">
          <label className="input input-bordered flex items-center gap-2 w-full">
              <FaUser className="text-neutral-content" />
              <input
                type="text"
                className="grow"
                placeholder="Nome"
                value={username}
                onChange={(e) =>{setUsername(e.target.value)}}
                required
              />
            </label>
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
              Criar conta
            </button>
          </form>
          <div>
            <p className="text-sm text-center">
              Já possui uma conta? <a className="link link-primary">Faça login</a>
            </p>
          </div>
        </div>
      </div>
      <button onClick={toggleTheme} className="btn btn-ghost btn-circle fixed top-4 right-4">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </>
  );
}
