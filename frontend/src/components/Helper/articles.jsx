import React, { useState } from "react";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import DateRange from "@material-ui/icons/DateRange";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormDialog from "components/form/FormDialog.jsx";


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
  },
  tooltipStyles: {
    marginLeft: "auto",
    display: "flex",
    fontWeight: "200"
  },
  customStyle: {
    display: "flex"
  }
};

function Article(props) {
  const [open, setOpen] = useState(false);
  const { classes } = props;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <GridItem xs={12} sm={6} md={4}>
      <Card>
        <CardHeader color={decideColor(Math.floor(Math.random() * (+5 - +1)) + +1)}>
          <h4 className={classes.cardTitleWhite}>{props.header}</h4>
        </CardHeader>

        <CardBody className={classes.plain}>
          {props.body}
        </CardBody>

        <CardFooter stats>
          {/*<div className={classes.customStyle}>*/}
          <div className={classes.stats}>
            <DateRange/>
            Just Updated
            <div className={classes.tooltipStyles}>
              <Tooltip
                id="tooltip-top"
                title="Edit Article"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <div className="font-icon-wrapper" onClick={props.editEvent}>
                  <IconButton aria-label="edit" className={classes.margin}>
                    <EditIcon/>
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove Article"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <div className="font-icon-wrapper" onClick={props.deleteEvent}>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <DeleteIcon/>
                  </IconButton>
                </div>
              </Tooltip>
            </div>
          </div>
          {/*</div>*/}
        </CardFooter>
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


function edit() {
  console.log(" edit button click happened");
}

function deleteAnArticle() {
  console.log(" delete button click happened");
}

export default withStyles(style)(Article);
