import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from "axios/index";
import DateRange from "@material-ui/icons/DateRange";
import DeleteIcon from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '18.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '15.33%',
    },
    column1: {
        flexBasis: '63.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
}));

export default function ControlledExpansionPanels(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [articleTypeData, setArticleTypeData] = React.useState(null);
    const [data, setData] = React.useState(null);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (articleTypeData == null) {
        axios.get("/type/all")
            .then((response) => {
                setArticleTypeData(response.data)
            }, (error) => {
                console.error(error);
            });
    }

    function decideType(value) {
        if (articleTypeData !== null) {
            return articleTypeData.map((item) => {
                if (value === item.ID) {
                    return item.Name;
                }
            });
        }

        console.log(articleTypeData + value);
    }

    function deleteEvent(id) {
        axios.delete("/article/go/" + id)
            .then((response) => {
                setData(null);
                console.log(response)
            }, (error) => {
                console.error(error);
            });

    }

    function loadData(url) {
        axios.get(url)
            .then((response) => {
                setData(response.data);
            }, (error) => {
                console.error(error);
            });
    }

    if (data === null) {
        loadData("/articles/" + props.articleType + "/all")
    }

    return (
        <div className={classes.root}>
            {data && data.map((item) =>
                <React.Fragment key={item.ID}>
                    <ExpansionPanel expanded={expanded === item.ID}
                                    onChange={handleChange(item.ID)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>
                                {decideType(item.Type.ID)}
                            </Typography>
                            <Typography className={classes.secondaryHeading}>{item.header}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <div className={classes.column}/>
                            <div className={clsx(classes.column1, classes.helper)}>
                                <Typography variant="caption">
                                    {item.Body}
                                    <br/>
                                    <a href="#sub-labels-and-columns" className={classes.link}>
                                        Learn more
                                    </a>
                                </Typography>
                            </div>
                        </ExpansionPanelDetails>
                        <Divider/>
                        <ExpansionPanelActions>
                            <Button
                                disableFocusRipple={true}
                                disabled={true}
                            >
                                <DateRange/>
                                {item.CreatedAt}
                            </Button>
                            <Button size="small" onClick={setExpanded.bind(false)}>
                                Close
                                <Close/>
                            </Button>
                            {
                                show ?
                                    <Button size="small" color="primary" onClick={setShow.bind(false)}>
                                        Save
                                        <NavigationIcon/>
                                    </Button>
                                    :
                                    <Button size="small" color="primary" onClick={setShow.bind(true)}>
                                        Edit
                                        <NavigationIcon/>
                                    </Button>
                            }
                            <Button size="small" color="secondary" onClick={deleteEvent.bind(this,item.ID)}>
                                Delete
                                <DeleteIcon/>
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </React.Fragment>
            )}
        </div>
    );
}
