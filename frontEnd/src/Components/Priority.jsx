import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const options = [
    'High',
    'Medium',
    'Low'
];

//const ITEM_HEIGHT = 48;

export default function LongMenu(props) {

    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null)


    const handleClick = (event) => {
        setOpen(true)
    };

    const handleClose = (option) => {
        console.log(option)
        setSelected(option)
        props.sendSelected(option)
        setOpen(false)

    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="long-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        // maxHeight: ITEM_HEIGHT * 4.5,
                        // width: '20ch',
                        marginLeft: "780px",

                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === selected} onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>

        </div>
    );
}