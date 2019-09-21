import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios/index";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));


export default function FormDialog(props) {
  const { setPopUp, setData } = props;
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const [values, setValues] = React.useState({
    header: props.header,
    body: props.body
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleClose() {
    setOpen(false);
    setPopUp(false);
    setData(null);
  }

  function handleUpdate() {
    axios.patch("/article/" + props.type + "/" + props.id, values)
      .then((response) => {
        handleClose();
      }, (error) => {
        console.error(error);
      });
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit...</DialogTitle>
      <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Header content"
            multiline
            rows="1"
            className={classes.textField}
            value={values.header}
            fullWidth
            onChange={handleChange("header")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label="Body Content"
            multiline
            rows="14"
            value={values.body}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange("body")}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );

}
