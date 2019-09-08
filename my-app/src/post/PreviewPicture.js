import React from "react";

const PreviewPicture = (props) => {
    const {
        pictureUrl
    } = props;
    return ( <
        img src = {
            pictureUrl
        }
        alt = ""
        className = "fliud" / >
    )
};

export default PreviewPicture;