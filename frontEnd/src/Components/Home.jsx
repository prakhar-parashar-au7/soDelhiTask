import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import AddNote from './AddNote'
import { useSelector } from 'react-redux';

import './masonry.css'

import Tooltip from '@material-ui/core/Tooltip'
import NotesGrid from './NotesGrid'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));




export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [AddNoteModal, setAddNoteModal] = React.useState(false);



    const user = useSelector(state => {
        if (state) {

            return state.user
        }
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const closeModal = () => {
        setAddNoteModal(false)
    }






    return (

        (user) ?
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Noter
          </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <h5>{(user) ? user.name : null}</h5>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <br></br>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                        <img src={(user) ? user.imageUrl : null} height="50px" width="50px" style={{ marginLeft: "10px" }}></img>
                        {
                            (open == true) ? <p style={{ marginTop: "10px" }}>{user ? user.email : null}</p> : null
                        }
                    </div>

                    <List>
                        <ListItem button key="Add" onClick={() => { setAddNoteModal(true); setOpen(false) }}>

                            <ListItemIcon>
                                <Tooltip title="Add a Note">
                                    <AddIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary="Add" />


                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <AddNote
                        closeModal={closeModal}
                        show={AddNoteModal}
                        onHide={() => setAddNoteModal(false)}

                    />
                    <NotesGrid type="HIGH PRIORITY NOTES" notes="highPriorityNotes" />


                    <br></br>
                    <br></br>
                    <hr width="75%"></hr>
                    <br></br>
                    <br></br>



                    <NotesGrid type="MEDIUM PRIORITY NOTES" notes="mediumPriorityNotes" />


                    <br></br>
                    <br></br>
                    <hr width="75%"></hr>
                    <br></br>
                    <br></br>

                    <NotesGrid type="LOW PRIORITY NOTES" notes="lowPriorityNotes" />

                </main>
            </div>
            : null


    );
}