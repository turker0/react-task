import { FC } from "react";

interface Props {
  toggleModalVisible: () => void;
}

const Header: FC<Props> = ({ toggleModalVisible }) => {
  return (
    <div className="header">
      <h1>To do</h1>
      <button onClick={toggleModalVisible}>Add New Task</button>
    </div>
  );
};

export default Header;
