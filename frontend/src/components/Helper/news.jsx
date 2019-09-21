import React from "react";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    bottom: "0px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


function News(props) {
  const { classes } = props;
  return (
    <GridItem xs={12} sm={12} md={6}>
    <Card>
      <CardHeader color={decideColor(Math.floor(Math.random() * (+5 - +1)) + +1)}>
        <h4 className={classes.cardTitleWhite}>{props.header}</h4>
      </CardHeader>
      <CardBody className={classes.plain}>
          {props.body}
      </CardBody>
    </Card>
    </GridItem>
  );
}

function decideColor(random) {
  let color;
  switch (random) {
    case 1:
      color = "warning";
      break;
    case 2:
      color = "success";
      break;
    case 3:
      color = "danger";
      break;
    case 4:
      color = "rose";
      break;
    default:
      color = "info";
      break;
  }
  return color;
}

export default withStyles(style)(News);
