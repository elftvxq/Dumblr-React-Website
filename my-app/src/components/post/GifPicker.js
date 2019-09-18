import React, { Component } from 'react';



const styles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

class GifPickerTool extends Component {

      state = {
            gifPicker: false
        };

      handleGifPicker = () => {
          console.log('gif出來')
          this.setState({
              gifPicker: true
          })
      };

    render() {

        const { classes } = this.props;
        // let gifPicker;
        // if(gifPicker) {
        //     gifPicker= <div className='gifSelect'>
        //        <GifPicker apikey="HB062X5OE101" onSelect={gifUrl => console.log(gifUrl)} /> 
        //     </div>  
        // };

        return (
            <div>
                <Fab variant="extended" aria-label="button" onClick={this.handleGifPicker} style={{height:'30px', boxShadow:'none', borderRadius:'4px', backgroundColor:'#88B7B5', fontSize:'10px'}} className={classes.fab}>
                    <GifIcon className={classes.extendedIcon} />
                    Select a Gif
                </Fab>
                 <GifPicker apikey="HB062X5OE101" onSelect={gifUrl => console.log(gifUrl)} /> 
            </div>
        )
    }
}

export default (withStyles(styles)(GifPickerTool));
