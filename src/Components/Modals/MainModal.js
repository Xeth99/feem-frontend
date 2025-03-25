import React, { useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

function MainModal({ modalOpen, setModalOpen, children }) {
  const cancelButtonRef = useRef();

  return (
    <Transition show={modalOpen} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 flex items-center justify-center"
        initialFocus={cancelButtonRef}
        onClose={() => setModalOpen(false)}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        </Transition.Child>

        {/* Modal Content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative rounded-lg shadow-xl w-3/5 p-6 flex justify-center items-center">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              type="button"
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-subMain bg-white rounded-full hover:bg-subMain hover:text-white transition"
            >
              <IoClose />
            </button>

            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default MainModal;

// function MainModal({ modalOpen, setModalOpen, children }) {
//   const cancelButtonRef = useRef();

//   // Function to handle closing the modal
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   // Render the modal component conditionally based on modalOpen state
//   return (
//     <>
//       {modalOpen && (
//         <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60">
//         <div className="relativerounded-lg shadow-xl w-full p-6">
//           {children}

//           {/* Close button */}
//           <button
//             onClick={handleCloseModal}
//             type="button"
//             className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-subMain bg-white rounded-full hover:bg-subMain hover:text-white transition"
//           >
//             <IoClose />
//           </button>
//         </div>
//       </div>

//       )}
//     </>
//   );
// }

// export default MainModal;
