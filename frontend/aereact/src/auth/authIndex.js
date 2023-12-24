//isLoggedIn => checking if login data is set in local storage or not
export const isLoggedIn = () => {
    let data = localStorage.getItem("data")
    if (data != null)
        return true;
    else
        return false;
}

//doLogin => data =>save data to localstorage at the key named "data"
export const doLogin = (data, next) => {

    // // Check if data is a valid JSON string
    // if (typeof data === 'string') {
    //     // Parse the JSON string to an object
    //     // data = JSON.parse(data);
    //     console.log("Yes it's a string")
    // }else{
    //     console.log("No, it's not a string, it's a JSON object")
    // }

    // localStorage.setItem("data", JSON.stringify(data.loginData))
    // if(data !== null)
    // console.log("wrong pass word data.user_data: ", data.user_data)
    // if(data.user_data !== undefined){
        console.log("wrong pass word data.user_data: ", data.user_data)
        localStorage.setItem("data", JSON.stringify(data))
        next();
    // }else{
    // }
}

//doLogout => remove value set at key "data" from localstorage
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next();
}

//getCurrentUserDetail when he's logged in to be shown on userDashboard
export const getCurrentUserDetail = () => {
    if (isLoggedIn())
        return JSON.parse(localStorage.getItem("data"));
        // return JSON.parse(localStorage.getItem("data")).user;
    else
        return undefined
}

//getToken when he's logged in to be used for authentication of api calls
export const getToken = () => {
    if (isLoggedIn()) {
        // const token = JSON.parse(localStorage.getItem('data')).token
        // console.log("token from getToken from authIndex: "+token)
        return JSON.parse(localStorage.getItem('data')).token
    }
    else
        return null;
}
