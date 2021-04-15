import React, { useState } from 'react';

function HeaderBar(){

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <>
            
        </>
    )
}

export default HeaderBar;