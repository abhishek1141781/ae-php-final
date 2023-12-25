import { myAxios, privateAxios } from "./helper";

// create post function
export const writePost = (postData) => {
  console.log("postData recieved by the writePost func, which'll hit data to the mapped url: ", postData);
  return privateAxios
    .post(`/private/addEvent.php?userId=${postData.user_id}`, postData)
    .then((response) => response.data)
    .catch((error) => {
      console.log("console.log from => PostService => servicesArea: " + error);
    });
};

// get all posts
// since all get methods are public we don't need privateAxios
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/public/getAllEvents.php?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
    // .then((response) => response);
};

// load single post of given id
export const loadPost = (eventId) => {
  // console.log("postId from loadPost of PostService: ", id)
  return myAxios
    .get(`/public/getSingleEvent.php?eventId=${eventId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

// //post Comment for older project
// export const createComment = (comment, pid) => {
//   return privateAxios.post(`/post/${pid}/comment`, comment);
// };

//upload post banner image

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);

  return privateAxios
    .post(`/private/utils/uploadImage.php?event_id=${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// // get category wise data for older project
// export function loadPostCategoryWise (categoryId) {
//     return privateAxios.get(`/category/${categoryId}/posts`).then(response => response.data);
// }

//get category wise data
export const loadPostCategoryWise = (categoryName) => {
  return privateAxios
    // .get(`/filter/${categoryId}/posts`)
    .get(`/public/filter/getEventsCategoryWise.php?categoryName=${categoryName}`)
    .then((response) => response.data);
};

//get location wise data
export const loadPostLocationWise = (locationName) => {
  return privateAxios
    // .get(`/filter/${locationId}/posts`)
    .get(`/public/filter/getEventsLocationWise.php?locationName=${locationName}`)
    .then((response) => response.data);
  };

//get posts userwise
export function loadPostsUserWise(userId) {
  return privateAxios
  // .get(`/user/${userId}/posts`)
    .get(`/public/filter/getEventsUserWise.php?userId=${userId}`)
    .then((response) => response.data);
}

// load posts by date
export const loadPostsByDate = (date) => {
  return myAxios
    .get(`/public/filter/getEventsDateWise.php?date=${date}`)
    .then((response) => response.data);
  // return Promise.resolve([]); // Replace with actual implementation
};

//delete post
export function deletePostService(eventId) {
  // return privateAxios
  return myAxios
    .delete(`/private/deleteEvent.php?eventId=${eventId}`)
    .then((response) => response.data);
}

//update post
export function updatePostService(event, eventId) {
  console.log("post from update post service: ", event);
  return privateAxios.put(`/private/updateEvent.php?eventId=${eventId}`, event).then((resp) => resp.data);
}
