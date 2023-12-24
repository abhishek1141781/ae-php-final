import { myAxios } from "./helper";

export const loadAllCategories = () => {
  return myAxios.get("/public/getCategories.php").then((response) => {
    // console.log("response from loadAllCategories: response: ", response);
    // console.log("response from loadAllCategories: response.data: ", response.data);
    return response.data;
    // return response;
  });
};

export const loadAllLocations = () => {
  return myAxios.get("/public/getLocations.php").then((response) => {
    // console.log("response from loadAllLocations: response: ", response);
    // console.log("response from loadAllLocations: response.data: ", response.data);
    return response.data;
    // return response;
  });
};

