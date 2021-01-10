import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

import Home from "../pages/Home";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import AddItemModal from "../components/AddItemModal";

import { initialState } from "../hooks/useTodos";

describe("Page & Components Renders", () => {
  it("Home", () => {
    shallow(<Home />);
  });
  it("Header", () => {
    let toggleModalVisible = jest.fn();
    shallow(<Header toggleModalVisible={toggleModalVisible} />);
  });
  it("ListItem", () => {
    let setValueByKey = jest.fn();
    let deleteItem = jest.fn();
    shallow(
      <ListItem
        item={initialState[0]}
        setValueByKey={setValueByKey}
        deleteItem={deleteItem}
      />
    );
  });
  it("AddItemModal", () => {
    let toggleModalVisible = jest.fn();
    let addItem = jest.fn();
    shallow(
      <AddItemModal toggleModalVisible={toggleModalVisible} addItem={addItem} />
    );
  });
});

describe("Functions", () => {
  it("toggleModalVisible", () => {
    let toggleModalVisible = jest.fn();
    let wrapper = shallow(<Header toggleModalVisible={toggleModalVisible} />);
    wrapper.find("button").simulate("click");
    expect(toggleModalVisible).toHaveBeenCalled();
  });
  it("addItem", () => {
    let toggleModalVisible = jest.fn();
    let addItem = jest.fn();
    let wrapper = shallow(
      <AddItemModal toggleModalVisible={toggleModalVisible} addItem={addItem} />
    );

    wrapper
      .find(".container")
      .find(".buttonWrapper")
      .find("button")
      .last()
      .simulate("click");
    expect(addItem).toHaveBeenCalled();
  });

  let setValueByKey = jest.fn();
  let deleteItem = jest.fn();
  let wrapper = shallow(
    <ListItem
      item={initialState[0]}
      setValueByKey={setValueByKey}
      deleteItem={deleteItem}
    />
  );

  it("setValueByKey", () => {
    wrapper.find("button").first().simulate("click");
    expect(setValueByKey).toHaveBeenCalled();
  });
  it("deleteItem", () => {
    console.log(wrapper.find("button").last().simulate("click"));
    expect(deleteItem).toHaveBeenCalled();
  });
});
