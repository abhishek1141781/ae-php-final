import { myAxios, privateAxios } from "../src/servicesArea/helper";

// create event function
export const writeEvent = (eventData) => {
  console.log(
    "eventData recieved by the writeEvent func, which'll hit data to the mapped url" +
      eventData
  );

  return myAxios
    .post(
      `/user/${eventData.userId}/category/${eventData.categoryId}/events`,
      eventData
    )
    .then((response) => response.data)
    .catch((error) => {
      // console.error("console.error from => EventService => servicesArea: "+error)
      // if config.headers OR config.headers.common is not initialized to {} or even if it is, error
      // is thrown here

      //First Case: config.headers OR config.headers.common is not initialized to {}
      //TypeError: Cannot set properties of undefined (setting 'Authorization')

      //Second Case:
      //CORS error in second case
      // Access to XMLHttpRequest at 'http://localhost:5000/api/v1/user/$%7BeventData.userId%7D/category/$%7BeventData.id%7D/events' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

      console.log("console.log from => EventService => servicesArea: " + error);
    });
};

// get all events
// since all get methods are public we don't need privateAxios
export const loadAllEvents = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/events?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};

// load single event of given id
export const loadEvent = (id) => {
  // console.log("eventId from loadEvent of EventService: ", id)
  return myAxios
    .get(`/event/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};


//upload event banner image

export const uploadEventImage = (image, eventId) => {
  let formData = new FormData();
  formData.append("image", image);

  return myAxios
    .post(`/event/image/upload/${eventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};


//get category wise data
export const loadEventCategoryWise = (categoryId) => {
  return myAxios
    .get(`/category/${categoryId}/events`)
    .then((response) => response.data);
};

//get events userwise
export function loadEventsUserWise(userId) {
  return myAxios
    .get(`/user/${userId}/events`)
    .then((response) => response.data);
}

//delete event
export function deleteEventService(eventId) {
  // return privateAxios
  return myAxios
    .delete(`/events/${eventId}`)
    .then((response) => response.data);
}

//update event
export function updateEventService(event, eventId) {
  console.log("event from update event service: ", event);
  return privateAxios.put(`/events/${eventId}`, event).then((resp) => resp.data);
}
