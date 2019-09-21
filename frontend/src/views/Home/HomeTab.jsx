/*!

=========================================================
* Material HomeTab React - v1.7.0
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
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import News from "components/Helper/news.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import axios from "axios/index";
import Header from "components/Header/Header.jsx";

class HomeTab extends React.Component {

    state = {
        techData: null,
        goData: null,
        phpData: null,
        awsData: null,
        dataSet: false,
        tabName: "tech"

    };

    handleChangeValue = (key, value) => {
        this.setState({[key]: value});
    };

    loadData = (type) => {
        axios.get("/news/" + type)
            .then((response) => {
                this.handleChangeValue(type + "Data", response.data);
            }, (error) => {
                console.error(error);
            });
    };

    loadALlTabsData = () => {
        this.handleChangeValue("dataSet", true);
        this.loadData("go");
        this.loadData("tech");
        this.loadData("php");
        this.loadData("aws");
    };

    getNewsList = (data, tabName) => {
        // this.setCurrentTab(tabName);
        return (<GridContainer>
            {data && data.map((item) =>
                <React.Fragment key={item.ID}>
                    <News
                        header={item.header}
                        body={item.Body}
                    />
                </React.Fragment>
            )}
        </GridContainer>);
    };

    setCurrentTab = (value) => {
        this.handleChangeValue("tabName", value)
    };

    handleChildClick = (data) => {
        alert(data);
    };

    render() {
        if (!this.state.dataSet) {
            this.loadALlTabsData();
        }
        const {classes} = this.props;
        return (
            <div>
                <GridContainer>
                    <Header
                        title={this.state.tabName}
                        onClick={this.handleChildClick}
                    />
                    <CustomTabs
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Tech News",
                                tabIcon: BugReport,
                                tabContent: (
                                    this.getNewsList(this.state.techData, "tech")
                                )
                            },
                            {
                                tabName: "GoLang news",
                                tabIcon: Code,
                                tabContent: (
                                    this.getNewsList(this.state.goData, "go")

                                )
                            },
                            {
                                tabName: "Php News",
                                tabIcon: Code,
                                tabContent: (
                                    this.getNewsList(this.state.phpData, "php")
                                )
                            },
                            {
                                tabName: "AWS News",
                                tabIcon: Cloud,
                                tabContent: (
                                    this.getNewsList(this.state.awsData, "aws")
                                )
                            }
                        ]}
                    />

                </GridContainer>
            </div>
        );
    }
}

HomeTab.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(HomeTab);
