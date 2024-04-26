import { useEffect } from "react";
import viteLogo from "/vite.svg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import { useImageStore } from "../stores/ImageStore";

function Start() {
  const navigate = useNavigate();
  const currentEmail = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
  const getSessionToken = useAuthStore((state) => state.getSessionToken);
  const resetResult = useImageStore((state) => state.resetResult);
  const fetchMyImages = useAuthStore((state) => state.fetchMyImages);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    setEmail(email);

    getSessionToken()
      .then(() => {
        fetchMyImages().then((images) => {
          if (images.length === 3) {
            alert(
              "Ya has alcanzado el límite de imágenes generadas, por favor espera unos 10 minutos para volver utilizar Imagine",
            );
            navigate("/my-images");
          } else {
            navigate("/prompts");
          }
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    resetResult();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center items-center pb-3">
          <img src={viteLogo} className="w-32" alt="Vite logo" />
          <h1 className="text-5xl pb-3 text-white">Imagina y crea tu arte</h1>
          <h2 className="text-2xl pb-2 text-white">Ingresa tu email para continuar</h2>
        </div>
        <form className="flex flex-col gap-3 justify-center" action="#" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              defaultValue={currentEmail}
              autoComplete="off"
              autoCapitalize="off"
              required
            />
          </label>
          <button className="btn btn-accent" type="submit">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Start;
