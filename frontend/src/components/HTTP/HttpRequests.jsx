import axios from "axios/index";
import PropTypes from "prop-types";


function HttpRequests(props) {

  let type = props.type;

    switch (props.method) {
    case "getAll":
      return getAll(type);
    case "createArticle":
      return createArticle(type, props.data);
    default:
      console.log("it reaches to the default block");
  }
}

function getAll(type) {

  axios.get("/articles/" + type + "/all")
    .then((response) => {
      console.log(response.data);
      return response.data;
    }, (error) => {
      console.error(error);
    });
}

function createArticle(type, data) {
  axios.post("/article/" + type + "/create", data)
    .then((response) => {
      console.log(response);
      return response.data;
    }, (error) => {
      console.error(error);
    });

  HttpRequests.propTypes = {
    classes: PropTypes.object
  };
}

export default HttpRequests;
