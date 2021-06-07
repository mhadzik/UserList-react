import { render, screen } from "@testing-library/react";
import UserList from "./index";

const dataSet = [
  { id: 1, name: "name1", username: "username1" },
  { id: 2, name: "name2", username: "username2" },
  { id: 3, name: "name3", username: "username3" },
  { id: 4, name: "name4", username: "username4" },
  { id: 5, name: "name5", username: "username5" },
];

describe("UserList component", () => {
  test("renders without crashing", () => {
    render(<UserList />);
  });

});
