/*!

=========================================================
* Material Home React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios/index";
import {makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FullScreenDialog from 'components/Dialogs/FullScreenDialog.jsx'
import ExpansionPanel from "components/ExpansionPanels/Panel1.jsx"

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        fontSize: "14px",
        marginTop: "30px",
        position: "absolute"
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
    buttonStyle: {
        marginLeft: "auto",
        fontWeight: "900",
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
    },
    searchBarStyle: {
        marginLeft: "auto",
        fontWeight: "300",
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
    },
    customStyle: {
        display: "flex"
    },
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function GoLangTab(props) {

    const {classes} = props;
    const [data, setData] = useState(null);
    // const [popupWindow, setPopUp] = useState(false);
    // const [values, setValues] = React.useState(false);

    // if (data == null) {
    //     loadData(setData);
    // }

    return (
        <GridContainer>
            <Card>
                <CardHeader color="primary">
                    <div className={classes.customStyle}>
                        <h4 className={classes.cardTitleWhite}>
                            Golang articles
                        </h4>
                        <p className={classes.cardCategoryWhite}>
                            Enjoy the process of learning...
                        </p>
                        <div className={classes.buttonStyle} onChange={(e) => populateSearchResults(e)}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Go Article"
                                inputProps={{'aria-label': 'search go Article'}}
                            />
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </div>
                        <FullScreenDialog
                            articleType={"go"}
                        />
                    </div>
                </CardHeader>
                <CardBody>
                        <ExpansionPanel
                         articleType={"go"}

                       // deleteEvent={deleteEvent.bind(this, item.ID, setData)}
                       // editEvent={editEvent.bind(this, item.ID, setPopUp, setValues)}
                        />
                </CardBody>
            </Card>
        </GridContainer>
    );

    // function closeSetPopUp(popUp) {
    //     setPopUp(popUp);
    // }

    function updateData() {
        setData(null);
    }

    function populateSearchResults(e) {
        if (!e.target.value) {
            // loadData(setData);
        } else {
            axios.get("/search/go?value=" + "'" + e.target.value + "'")
                .then((response) => {
                    // setData(response.data);
                }, (error) => {
                    console.error(error);
                });

        }
    }
}

GoLangTab.propTypes = {
    classes: PropTypes.object
};

// function loadData(setData) {
//     //const instance = axios.create({ baseURL: "http://localhost:8989" });
//     axios.get("/articles/go/all",)
//         .then((response) => {
//             setData(response.data);
//         }, (error) => {
//             console.error(error);
//         });
// }
//
// function deleteEvent(id, setData) {
//     axios.delete("/article/go/" + id)
//         .then((response) => {
//             setData(null);
//         }, (error) => {
//             console.error(error);
//         });
// }
//
// function editEvent(id, setPopUp, setValues) {
//     axios.get("/article/go/" + id)
//         .then((response) => {
//             setValues(response.data);
//             setPopUp(true);
//         }, (error) => {
//             console.error(error);
//         });
// }

export default withStyles(styles)(GoLangTab);
