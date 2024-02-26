import { useState } from "react";

const useDisclosure = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  return { closeModal, openModal, isModalOpen };
};

export default useDisclosure;
