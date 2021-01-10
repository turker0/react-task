import React, { FC, useRef, useState } from "react";
import { Check, EditAlt, Trash } from "@styled-icons/boxicons-regular";

interface Props {
  item: TodoItem;
  setValueByKey: (
    date: number,
    key: string,
    newValue: string | boolean
  ) => void;
  deleteItem: (date: number) => void;
}

interface TodoItem {
  date: number;
  text: string;
  isDone: boolean;
}

const ListItem: FC<Props> = ({ item, setValueByKey, deleteItem }) => {
  const inputRef = useRef<any>();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <div className="listItemContainer">
      <button
        className="listItemCell"
        //disabled={!item.isDone} optional
        onClick={() => setValueByKey(item.date, "isDone", !item.isDone)}
      >
        {item.isDone && <Check size={20} color="#B1B1B1" />}
      </button>
      <input
        className="listItemCell text"
        ref={inputRef}
        style={{ color: item.isDone ? "#B1B1B1" : "#000" }}
        type="text"
        defaultValue={item.text}
        onFocus={onFocus}
      />
      <button className="listItemCell">
        {!isFocused ? (
          <EditAlt size={20} onClick={onFocus} />
        ) : (
          <Check
            size={20}
            onClick={() => {
              setValueByKey(item.date, "text", inputRef.current?.value);
              onBlur();
            }}
          />
        )}
      </button>
      <button
        className="listItemCell delete"
        onClick={() => deleteItem(item.date)}
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default ListItem;
