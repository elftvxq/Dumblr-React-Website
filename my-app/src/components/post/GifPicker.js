import React, { Component } from 'react';
import GifPicker from 'gifpicker';
import 'gifpicker/dist/style.css';

class GifPickerTool extends Component {

    render() {

 
        let gifPicker;
        if(gifPicker) {
            gifPicker= <div className='gifSelect'>
               <GifPicker apikey="HB062X5OE101" onSelect={gifUrl => console.log(gifUrl)} /> 
            </div>  
        };

        return (
            <div>
                {gifPicker}
            </div>
        )
    }
}

export default GifPickerTool;
