import { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePromptStore } from "../stores/PromptStore";
import PrompsList from "../components/PromptList";

interface CustomPromptProps {
  open: boolean;
  onClose: () => void;
}

const CustomPrompt = ({ open, onClose }: CustomPromptProps) => {
  const customPrompt = usePromptStore((state) => state.customPrompt);
  const setCustomPrompt = usePromptStore((state) => state.setCustomPrompt);
  let completeButtonRef = useRef(null);

  const handleComplete = () => {
    onClose();
  };

  return (
    <Transition
      show={open}
      enter="ease-out duration-400"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => onClose()}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 gap-2">
            <Dialog.Panel className="w-full max-w-xl rounded bg-white p-4">
              <Dialog.Title className="text-xl pb-2">
                Ingresa tu prompt o el texto que desees para crear tu nueva obra de arte!
              </Dialog.Title>
              <div className="w-full pb-2">
                <textarea
                  placeholder="Describe tu nueva obra de arte"
                  className="textarea textarea-bordered textarea-lg w-full"
                  defaultValue={customPrompt.text}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full justify-center">
                <button className="btn" onClick={() => onClose()}>
                  Cancel
                </button>
                <button className="btn btn-accent" ref={completeButtonRef} onClick={() => handleComplete()}>
                  Continuar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const Prompts = () => {
  const [open, setOpen] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex justify-center p-4 w-full">
        <div className="hero h-1/8 bg-base-200 w-1/2">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Bienvenido</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
                deleniti eaque aut repudiandae et a id nisi. lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptas.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-4">
        <h2 className="flex text-2xl justify-center items-center pb-4">Escoge un prompt para comenzar:</h2>
        <div className="grid grid-cols-3 gap-4">
          <PrompsList selectedPromptIndex={selectedPromptIndex} setSelectedPromptIndex={setSelectedPromptIndex} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button className="btn btn-accent m-auto w-1/3" onClick={() => setOpen(true)}>
          Custom Prompt
        </button>
        <button className="btn btn-primary m-auto w-1/3 text-white">Continuar</button>
      </div>
      <CustomPrompt open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Prompts;
