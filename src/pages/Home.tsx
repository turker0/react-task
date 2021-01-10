import React from "react";
import "../App.scss";
import dayjs from "dayjs";
import { CalendarAlt } from "@styled-icons/boxicons-regular";
import ListItem from "../components/ListItem";
import AddItemModal from "../components/AddItemModal";
import Header from "../components/Header";

import useModal from "../hooks/useModal";
import useTodos from "../hooks/useTodos";

const Home = () => {
  const { renderedTodos, addItem, setValueByKey, deleteItem } = useTodos();
  const { modalVisible, toggleModalVisible } = useModal();

  return (
    <>
      {modalVisible && (
        <AddItemModal
          toggleModalVisible={toggleModalVisible}
          addItem={addItem}
        />
      )}
      <div className="container">
        <Header toggleModalVisible={toggleModalVisible} />
        {renderedTodos &&
          Array.from(renderedTodos.keys())
            .sort()
            .map((key: any, index: any) => (
              <div key={index} className="listContainer">
                <div className="listHeader">
                  <CalendarAlt size={32} color="#0029FF" />
                  <h1>{dayjs(key * 1000).format("dddd, MMMM DD")}</h1>
                </div>
                {renderedTodos.get(key).map((item: any) => (
                  <ListItem
                    key={item.date}
                    item={item}
                    setValueByKey={setValueByKey}
                    deleteItem={deleteItem}
                  />
                ))}
              </div>
            ))}
      </div>
    </>
  );
};

export default Home;
