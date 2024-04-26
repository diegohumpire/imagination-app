import { usePromptStore } from "../stores/PromptStore";
import PrompsList from "../components/PromptList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HttpError } from "../errors";
import { useAuthStore } from "../stores/AuthStore";

const Prompts = () => {
  const navigate = useNavigate();
  const selectedPrompt = usePromptStore((state) => state.prompt);
  const setPrompt = usePromptStore((state) => state.setPrompt);
  const selectDefaultPromptIndex = usePromptStore((state) => state.selectDefaultPromptIndex);
  const fetchDefaultPrompts = usePromptStore((state) => state.fetchDefaultPrompts);
  const getImages = useAuthStore((state) => state.fetchMyImages);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchDefaultPrompts(signal)
      .then((_) => {
        console.info("Prompts fetched");
        getImages().then((images) => {
          console.info("Images fetched");
          if (images.length === 3) {
            alert(
              "Ya has alcanzado el límite de imágenes generadas, por favor espera unos 10 minutos para volver utilizar Imagine",
            );
            navigate("/start");
          }
        });
      })
      .catch((error: HttpError) => {
        console.error(error.message, error.status);
        if (error.status && error.status === 401) {
          navigate("/start");
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    selectDefaultPromptIndex(-1);
    setPrompt("");
  }, []);

  const handleContinue = () => {
    console.log("Continue");

    if (!selectedPrompt.text || selectedPrompt.text === "") {
      alert("Debes ingresar un prompt para continuar");
      return;
    }

    navigate("/result");
  };

  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex justify-center p-4 pb-0 w-full">
        <div className="hero bg-transparent w-[70%] text-white max-sm:w-[95%]">
          <div className="hero-content text-center pb-0">
            <div className="max-w-xl">
              <h1 className="text-3xl font-bold">
                Bienvenido a <span className="font-bold text-accent">Imagine</span>
              </h1>
              <p className="py-6 max-sm:text-xl">
                {/* Texto donde explicamos lo que vamos a realizar, rapido */}
                <span className="font-bold text-accent">Imagine</span> es una herramienta de IA que{" "}
                <span>
                  <span className="underline font-bold text-secondary">convierte descripciones textuales</span> en{" "}
                  <span className="underline font-bold text-secondary">obras de arte</span> visuales
                </span>
                . Ingresa un prompt detallado y la IA creará automáticamente una imagen artística única y creativa.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-4 max-sm:pt-0">
        <h2 className="flex text-xl justify-center items-center pb-4 text-white max-sm:text-center max-sm:text-base">
          Elige o escribe un prompt para continuar:
        </h2>
        <div className="grid grid-cols-2 gap-6 mx-4 max-sm:mx-0 max-sm:grid-cols-1 max-sm:gap-2">
          <div>
            {/* Estoy poniendo prompts por defecto para que sea mas rapido la demostracion para el usuario, e igual puede editar el prompt y continuar */}
            <PrompsList />
          </div>
          <div className="flex flex-col">
            <textarea
              className="w-full h-full p-2 border-2 border-solid border-cyan-500 rounded-md"
              placeholder="O escribe uno personalizado"
              value={selectedPrompt.text}
              onChange={(e) => setPrompt(e.target.value)}></textarea>
            <div className="flex justify-center items-center gap-2 pt-4">
              <button
                className="btn btn-grap text-black text-bold m-auto w-1/2"
                onClick={() => {
                  selectDefaultPromptIndex(-1);
                  setPrompt("");
                }}>
                Borrar
              </button>
              <button className="btn btn-accent m-auto w-1/2 text-black font-bold" onClick={handleContinue}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
