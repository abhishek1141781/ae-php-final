import { getCurrentUserDetail } from "../auth/authIndex";
import { myAxios } from "./helper";

export const manualSignUp = (user) => {
  return myAxios.post("/auth/manualSignup.php", user).then((response) => {
    console.log("full response from backend: ", response);
    return response.data.signupData.user_data;
  });
  // .then((response) => JSON.parse(response.config.data));
  // .then((response) => response.data); how it was before
};

export const manualLoginUser = (loginDetail) => {
  console.log("login maal is ready to be sent to backend", loginDetail);
  return (
    myAxios
      // .post("/auth/manualLogin.php", new URLSearchParams({
      //   email: loginDetail.username,
      //   password: loginDetail.password,
      // }))
      .post("/auth/manualLogin.php", loginDetail)
      .then((response) => {
        // Check if there is a 'data' property in the response
        if ("data" in response) {
          console.log("response.data from manualLoginUser: ", response.data);
          console.log("responsefrom manualLoginUser: ", response);
          return response.data;
        } else {
          console.log("No 'data' property found in the response: ", response);
          return response;
        }
      })
  );
};

// why is profileInfo is using this implementation of getUser where it's again sending a get request
// to backend to get users details, while the ProfilInfo page itself comes into picture only after a
// user logs in, so it should check if the local storage has data, if yes use it from there, if not
// then a user is not logged in anyways
export const getUser = (userId) => {

  // only send a get request if 
  // if(userId === getCurrentUserDetail.user_id){
    return (
      myAxios
      // data is sent in the request body only for post requests, to send data using get requests append data in query string itself
      // .get("/private/sendUserDataById.php", userId)
      // .get(`/private/sendUserDataById.php?userId=${userId}`)
      .get(`/private/sendUserDataById.php?userId=${getCurrentUserDetail().user_id}`)
      .then((res) => res.data)
    );
  // }
};

export const fetchAuthUrlFromPHPBackend = () => {

  return (
    myAxios
      .get("auth/googleOauth/getAuthUrl.php")
      .then((response) => {
        // console.log("full authUrl response: ",response)
        console.log("full.data authUrl response: ",response.data)
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // return response.json();
        return response.data;
      })
      // .then(data => data.authUrl)
      .catch(error => {
        console.error('Error fetching authentication URL:', error);
        throw error;
      })
  )
};


// Add a new function to fetch user data from the backend
export const fetchUserDataFromBackend = (code) => {
  return (
      myAxios
          .get(`auth/googleOauth/welcome.php?code=${code}`)
          // .then(response => response.json())
          .then(response => response.data)
          .catch(error => {
              console.error('Error fetching user data from backend:', error);
              throw error;
          })
  );
};

