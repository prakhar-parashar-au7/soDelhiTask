import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip';

export default function ChangePriority(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = (event) => {
        setAnchorEl(null);
        const { myValue } = event.currentTarget.dataset;
        props.changePriorityRequest(myValue, props.currentPriority, props.index, props.userGoogleId)
    };

    const handleCloseFromOutside = (event) => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Tooltip title="Change Priority">
                <IconButton
                    aria-label="more"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseFromOutside}
            >  {

                    (props.currentPriority === "High") ?
                        <div>
                            <MenuItem data-my-value="Medium" onClick={handleClose}>Medium</MenuItem>
                            <MenuItem data-my-value="Low" onClick={handleClose}>Low</MenuItem>
                        </div>
                        :
                        (props.currentPriority === "Medium") ?
                            <div>
                                <MenuItem data-my-value="High" onClick={handleClose}>High</MenuItem>
                                <MenuItem data-my-value="Low" onClick={handleClose}>Low</MenuItem>
                            </div>

                            :
                            <div>
                                <MenuItem data-my-value="High" onClick={handleClose}>High</MenuItem>
                                <MenuItem data-my-value="Medium" onClick={handleClose}>Medium</MenuItem>
                            </div>


                }



            </Menu>
        </div>
    );
}