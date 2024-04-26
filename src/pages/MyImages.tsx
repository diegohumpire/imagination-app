import ConfettiExplosion from "react-confetti-explosion";
import { useAuthStore } from "../stores/AuthStore";
import { Link } from "react-router-dom";

const MyImages = () => {
  const myImages = useAuthStore((state) => state.myImages);
  const tries = useAuthStore((state) => state.tries);
  const email = useAuthStore((state) => state.email);

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-screen relative">
      <ConfettiExplosion
        force={0.8}
        duration={3000}
        particleCount={250}
        width={1600}
        zIndex={51}
        className="absolute left-1 top-3"
      />

      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="font-bold text-white text-3xl">Mis imágenes</h1>
        {myImages.length === 0 && <p className="text-white">No hay imágenes generadas</p>}
        {myImages.length > 0 && (
          <div className="grid grid-flow-col gap-4 m-4">
            {myImages.map((image: any, index: number) => (
              <div key={index} className="col gap-2">
                <img src={image.data.url} alt={`Imagen ${index}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 max-sm:flex-col max-sm:gap-2">
        {tries < 3 && (
          <Link className="btn btn-secondary text-black" to={"/choose-prompt"}>
            Volver a intentarlo
          </Link>
        )}
        <button
          type="button"
          className="btn btn-primary text-white"
          onClick={() => alert(`Enviaremos tus obras de arte a tu correo: ${email}`)}>
          Enviar a mi correo
        </button>
        <Link className="btn btn-accent text-black" to={"/"}>
          Volver al inicio
        </Link>
      </div>

      <ConfettiExplosion
        force={0.8}
        duration={3000}
        particleCount={250}
        width={1600}
        zIndex={51}
        className="absolute right-1 top-3"
      />
    </div>
  );
};

export default MyImages;
