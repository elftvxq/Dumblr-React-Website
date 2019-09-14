import React from "react";

const PreviewPicture = (props) => {
    const { pictureUrl } = props;
    return ( 
    <img src = {pictureUrl} alt = "" style={{ width: "100%" }} className = "fliud" />
    )
};


export default PreviewPicture;