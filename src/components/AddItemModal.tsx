import dayjs from "dayjs";
import { FC, useRef } from "react";

interface TodoItem {
  date: number;
  text: string;
  isDone: boolean;
}

interface Props {
  toggleModalVisible: () => void;
  addItem: (item: TodoItem) => void;
}

const AddItemModal: FC<Props> = ({ toggleModalVisible, addItem }) => {
  const textRef = useRef<any>();
  const dateRef = useRef<any>();

  return (
    <div className="modal">
      <div className="bgdrop" onClick={toggleModalVisible} />
      <div className="container">
        <div className="row">
          <h1>Title</h1>
          <input ref={textRef} type="text" defaultValue="" />
        </div>
        <div className="row">
          <h1>Date</h1>
          <input
            ref={dateRef}
            type="text"
            style={{ width: "240px" }}
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div className="buttonWrapper">
          <button onClick={toggleModalVisible}>cancel</button>
          <button
            onClick={() => {
              if (
                textRef.current?.value !== "" &&
                dateRef.current?.value !== ""
              ) {
                addItem({
                  date:
                    dayjs(
                      dayjs(dateRef.current?.value).format("DD/MM/YYYY")
                    ).unix() *
                      1000 +
                    dayjs().diff(dayjs().startOf("day")),
                  isDone: false,
                  text: textRef.current?.value,
                });
                toggleModalVisible();
              }
            }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
