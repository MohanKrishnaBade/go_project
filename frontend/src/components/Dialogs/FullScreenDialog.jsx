import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios/index";
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let data = {
    "header": null,
    "body": null,
    "type":{
        ID:null
    }

};

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dropDownData, setDropDownData] = React.useState(null);
    const [values, setValues] = React.useState({
        type: '1',
        name: 'hai',
    });

    if(dropDownData === null){
        loadDropdownData();
    }
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    function setSelectedValue(event) {
        values['selectedValue'] = event.target.value;
        console.log(values);
    }

    function loadDropdownData(){
        axios.get("/type/all")
            .then((response) => {
                setDropDownData(response.data)
            }, (error) => {
                console.error(error);
            });
    }

    return (
        <div>
            <div color="primary" onClick={handleClickOpen}>
                <Fab color="primary" variant="extended" aria-label="add" className={classes.fab}>
                    <AddIcon className={classes.extendedIcon}/>
                    Add
                </Fab>
            </div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            create {props.articleType} article
                        </Typography>
                        <Button color="inherit" onClick={() => createArticle(props.articleType)}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <GridContainer>
                    <Card>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>
                                    <CustomInput
                                        labelText="Article Header"
                                        id="article-header"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChange={(e) => onChange(e, "header")}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl
                                        className={classes.formControl}
                                        fullWidth={true}
                                    >

                                        <Select
                                            value={values.type}
                                            onChange={(e) => onChange(e, "type")}
                                            inputProps={{
                                                name: 'type',
                                                id: 'age-helper',
                                            }}
                                        >
                                            {dropDownData && dropDownData.map((item) =>
                                                <MenuItem value={item.ID}>{item.Name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
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
                                            rows: 15
                                        }}
                                        onChange={(e) => onChange(e, "body")}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>
            </Dialog>
        </div>
    );

    function onChange(e, key) {
        if (key === "header") {
            data.header = e.target.value;
        } else if( key === "type"){
            data.type.ID = e.target.value;
            handleChange(e);
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
        handleClose();
        props.onClick(data);
    }
}
