import React from 'react';
const Icon = (props) => {
    const url = `${process.env.REACT_APP_ICON_URL}/${props.value}.png`;
    return (
        <img src={url} alt='weather-icon'/>
    );
}

export default Icon;