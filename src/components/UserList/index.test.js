import React from "react";
import { mount } from "enzyme";
import UserList from "./index";
import { DataContext, DataContextProvider } from "../../context/data-context";

const dataSet = [
  { id: 1, name: "name1", username: "username1" },
  { id: 2, name: "name2", username: "username2" },
  { id: 3, name: "name3", username: "username3" },
  { id: 4, name: "name4", username: "username4" },
  { id: 5, name: "name5", username: "username5" },
];

const dataSet2 = [
  { id: 1, name: "name1", username: "username1" },
  { id: 2, name: "name2", email: "aaa@aaa.com", username: "username2" },
  { id: 3, name: "name3", username: "username3" },
  { index: 4, name: "name4", surname: "username4" },
  { id: 5, email: "name5", username: "username5" },
];

describe("UserList component", () => {
  describe("Rendering table", () => {
    it("table has 10 rows after fetching the data from API", () => {
      const wrapper = mount(
        <DataContextProvider>
          <UserList />
        </DataContextProvider>
      );
      const promise = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            wrapper.update();
            resolve(wrapper);
          }, 3000);
        });
      };
      return promise().then((res) => {
        expect(res.find("tr").length).toBe(10);
      });
    });

    it("table has 5 rows after passing custom dataSet", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );
      expect(wrapper.find("tr").length).toBe(5);
    });

    it("table doesnt render after passing empty dataSet", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: null,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );
      expect(wrapper.find("tr").length).toBe(0);
    });

    it("table has 5 rows after passing dataSet with custom properties", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet2,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );
      expect(wrapper.find("tr").length).toBe(5);
    });
  });

  describe("useSearch custom hook", () => {
    it("useSearch hook with letter contained in dataset works", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "m" } });
      expect(wrapper.find("tr").length).toBe(5);
    });

    it("useSearch hook with letter not contained in dataset works", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "p" } });
      expect(wrapper.find("tr").length).toBe(0);
    });

    it("useSearch hook with different object received in dataset and letter contained works", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet2,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "m" } });
      expect(wrapper.find("tr").length).toBe(4);
    });

    it("useSearch hook with different object received in dataset and letter not contained works", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet2,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "p" } });
      expect(wrapper.find("tr").length).toBe(0);
    });

    it("useSearch hook with special character works", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet2,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "?" } });
      expect(wrapper.find("tr").length).toBe(0);
    });

    it("useSearch hook with irregular expression works", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: dataSet2,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "abc?" } });
      expect(wrapper.find("tr").length).toBe(0);
    });

    it("useSearch hook works when dataset is empty", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: [],
          }}
        >
          <UserList />
        </DataContext.Provider>
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "a" } });
      expect(wrapper.find("tr").length).toBe(0);
    });
  });

  describe("error handling for API calls", () => {
    it("it shows spinner on render before fetching data", () => {
      const wrapper = mount(<UserList />);
      expect(wrapper.find(".loader").exists()).toEqual(true);
    });

    it("input with useSearch hook is not rendered when error is catched for failed API call", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: null,
            errorValue: true,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );
      expect(wrapper.find("input").exists()).not.toBeTruthy();
    });

    it("table is not rendered and error is catched for failed API call", () => {
      const wrapper = mount(
        <DataContext.Provider
          value={{
            fetchData: jest.fn,
            data: null,
            errorValue: true,
          }}
        >
          <UserList />
        </DataContext.Provider>
      );
      expect(wrapper.find("tr").length).toBe(0);
      expect(wrapper.find(".error")).toBeTruthy();
    });
  });
});
