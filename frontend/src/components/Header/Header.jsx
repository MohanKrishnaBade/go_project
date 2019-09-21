import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import FullScreenDialog from "../Dialogs/FullScreenDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 11, 1, 17),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function SearchAppBar(props) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" noWrap>
        {props.title}
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon/>
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <Typography className={classes.title} variant="h6" noWrap>
      </Typography>
        <FullScreenDialog
            articleType={"go"}
            onClick={props.onClick}
        />
      {/*<IconButton*/}
        {/*edge="start"*/}
        {/*className={classes.menuButton}*/}
        {/*color="inherit"*/}
        {/*aria-label="open drawer"*/}
        {/*onClick={(event)=>props.onClick(event)}*/}
      {/*>*/}
        {/*<AddIcon/>*/}
      {/*</IconButton>*/}
      {/*<Button variant="contained" color="orange" className={classes.button} href="#">*/}
        {/*Add*/}
        {/*<AddIcon className={classes.rightIcon} />*/}
      {/*</Button>*/}
      {/*<Button variant="contained" color="orange" className={classes.button} href={"/admin/"+"create/"+props.title}>*/}
        {/*Delete*/}
        {/*<AddIcon className={classes.rightIcon} />*/}
      {/*</Button>*/}
    </Toolbar>
  );

  function onclickFunction() {

    {/*<Route path="/admin" component={Admin} />*/}
    return(<NavLink
      to={"/admin/"+"create/::type"}
      className={""}
      activeClassName="active"
    />
  )};
}
