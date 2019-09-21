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
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import axios from "axios/index";


const styles = {
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


let data = {
    "header": null,
    "body": null

};

function CreateArticle(props) {
    const {classes} = props;
    const [values, setValues] = React.useState({
        age: '',
        name: 'hai',
    });

    return (
        <div>
            <GridContainer>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>{props.articleType} Article..</h4>
                        <p className={classes.cardCategoryWhite}>Create one for Go...</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Article Header"
                                    id="article-header"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={(e) => onChange(e, "header")}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Article Header"
                                    id="article-header"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={(e) => onChange(e, "header")}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Article Body"
                                    id="article-body"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        multiline: true,
                                        rows: 10
                                    }}
                                    onChange={(e) => onChange(e, "body")}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <div className={classes.buttonStyle} onClick={() => createArticle(props.articleType)}><Button
                            color="primary">Create
                            Article</Button></div>
                    </CardFooter>
                </Card>
            </GridContainer>
        </div>
    );

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }
}

function onChange(e, key) {
    if (key === "header") {
        data.header = e.target.value;
    } else {
        data.body = e.target.value;
    }
}

function createArticle(type) {
    type = type.split(" ")[0];
    axios.post("/article/" + type.toLowerCase() + "/create", data)
        .then((response) => {
            // console.log(response);
        }, (error) => {
            console.error(error);
        });
}

CreateArticle.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(CreateArticle);
