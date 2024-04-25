import { usePromptStore } from "../stores/PromptStore";
import PrompsList from "../components/PromptList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Prompts = () => {
  const navigate = useNavigate();
  const selectedPrompt = usePromptStore((state) => state.prompt);
  const setPrompt = usePromptStore((state) => state.setPrompt);
  const selectDefaultPromptIndex = usePromptStore((state) => state.selectDefaultPromptIndex);

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
      <div className="flex justify-center p-4 w-full">
        <div className="hero bg-transparent w-[70%] text-white">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-3xl font-bold">Bienvenido</h1>
              <p className="py-6">
                {/* Texto donde explicamos lo que vamos a realizar, rapido */}
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
                deleniti eaque aut repudiandae et a id nisi. lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptas.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-4">
        <h2 className="flex text-2xl justify-center items-center pb-4 text-white">
          Elige o escribe un prompt para continuar:
        </h2>
        <div className="grid grid-cols-2 gap-6 mx-4">
          <div>
            {/* Estoy poniendo prompts por defecto para que sea mas rapido la demostracion para el usuario, e igual puede editar el prompt y continuar */}
            <PrompsList />
          </div>
          <div>
            <textarea
              className="w-full h-full p-2 border-2 border-solid border-cyan-500 rounded-md"
              placeholder="O escribe uno personalizado"
              value={selectedPrompt.text}
              onChange={(e) => setPrompt(e.target.value)}></textarea>
            <div className="flex justify-center items-center gap-2 pt-4">
              <button
                className="btn btn-accent m-auto w-1/2"
                onClick={() => {
                  selectDefaultPromptIndex(-1);
                  setPrompt("");
                }}>
                Borrar
              </button>
              <button className="btn btn-primary m-auto w-1/2 text-white" onClick={handleContinue}>
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
