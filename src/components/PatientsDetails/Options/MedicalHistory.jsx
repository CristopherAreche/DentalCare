import { useState } from "react";
import MedicalHistoryForm from "./MedicalHistoryForm";
import ModalH from "./ModalH";

const MedicalHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white flex flex-col items-center justify-center gap-3 h-[600px] text-lg text-white font-bold py-4 overflow-y-auto">
      <MedicalHistoryForm isModalOpen={isModalOpen} />
      <div className="justify-center flex">
        <button
          onClick={handleOpenModal}
          className="bg-green-700 hover:bg-green-500 py-2 px-8 rounded-md uppercase"
        >
          Edit
        </button>
        <ModalH isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};
export default MedicalHistory;
