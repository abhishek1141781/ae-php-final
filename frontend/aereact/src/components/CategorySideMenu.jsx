import React, { useEffect, useState } from "react";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import {
  loadAllCategories,
  loadAllLocations,
} from "../servicesArea/CategoryService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CategorySideMenu() {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // console.log("Category side menu outside use effect")
  
  useEffect(() => {
    // console.log("Category side menu INSIDE USE EFFECT")
    loadAllCategories()
      .then((data) => {
        // Convert the object to an array of objects
        const categoriesArray = Object.keys(data).map((key) => ({
          id: key,
          name: data[key],
        }));
        setCategories(categoriesArray);

        // setCategories([...data])
        console.log("loading categories: categoriesArray => ", categoriesArray);
        // console.log(data)
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error("error in loading categories");
      });
  }, []);

  useEffect(() => {
    loadAllLocations()
      .then((data) => {
        // Convert the object to an array of objects
        const locationsArray = Object.keys(data).map((key) => ({
          id: key,
          name: data[key],
        }));
        setLocations(locationsArray);

        // setLocations([...data])
        console.log("loading locations: locationsArray => ", locationsArray);
        // console.log(data)
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error("error in loading categories");
      });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // console.log("cat.id: ",cat.id);
  // console.log("cat.name: ",cat.name);

  return (
    <div>
      <ListGroup className="mb-4">
        <ListGroupItem tag={Link} to="/" action={true} className="border-0">
          All Categories
        </ListGroupItem>

        {categories &&
          categories.map((cat, index) => {
            return (
              // <ListGroupItem tag={Link} to={'/categories/'+cat.id} className='border-1 shadow-1 mt-1 custom-list-group-item' action={true} key={index}>
              <ListGroupItem
                tag={Link}
                to={"/categories/" + cat.name.category}
                className="border-1 shadow-1 mt-1 custom-list-group-item"
                action={true}
                key={index}
              >
                {/* {cat.name.category} */}
                {`${cat.name.category} (${cat.name.event_count})`}
              </ListGroupItem>
            );
          })}
      </ListGroup>

      <ListGroup className="list-group-item-success">
        <ListGroupItem tag={Link} to="/" action={true} className="border-0">
          All Cities
        </ListGroupItem>

        {locations &&
          locations.map((loc, index) => {
            return (
              // <ListGroupItem tag={Link} to={'/locations/'+loc.id} className='border-1 shadow-1 mt-1 custom-list-group-item' action={true} key={index}>
              <ListGroupItem
                tag={Link}
                to={"/locations/" + loc.name.location}
                className="border-1 shadow-1 mt-1 custom-list-group-item"
                action={true}
                key={index}
              >
                {`${loc.name.location} (${loc.name.event_count})`}
              </ListGroupItem>
            );
          })}
      </ListGroup>

      <div className="mt-3 secondary">
        <Input type="date" id="date" name="date" onChange={handleDateChange} />
        <Button
          tag={Link}
          to={`/events/date/${selectedDate}`}
          color="primary"
          outline
          className="mt-2"
        >
          Filter by Date
        </Button>
      </div>

    </div>
  );
}

export default CategorySideMenu;
