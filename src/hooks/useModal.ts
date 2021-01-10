import { useState } from "react";

const useModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return { modalVisible, toggleModalVisible };
};

export default useModal;
