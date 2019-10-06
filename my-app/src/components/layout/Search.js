import React, { Component } from 'react';
import './search.css'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import axios from 'axios';
import { getUserData } from "../../redux/actions/dataActions";
import history from '../../util/history';
import 'font-awesome/css/font-awesome.min.css';


class Search extends Component {

    state = {
        searchInput:'',
        profile: null,
        errors:'',
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                searchInput: ''
            });
        }
    }

    handleValidation = () => {
        let formIsValid = true;

        if (!this.state.searchInput) {
            formIsValid = false;
        } else {
            return formIsValid;
        }
    };

    handleChange = (e) => {
        this.setState({
           [e.target.id]: e.target.value 
        })
        
    };
    
        
    handleSubmit = (e)=>{
        e.preventDefault();
        // this.props.getUserData(this.state.searchInput);
        if(this.handleValidation()){
            axios.get(`/user/${this.state.searchInput}`)
            .then((res)=>{
                history.push(`/users/${this.state.searchInput}`);
            }
            )
            .catch((err) => this.setState({
                errors: err.response.data.error
            })) 
        } else {
            this.setState({ errors: 'Cannot be empty'})
        }
           
    }
    
    render(){

      

    return ( 
        <form className="search-bar" onSubmit={this.handleSubmit}>
            <div className='search-group'>
                <input type ="search" id='searchInput' className ="search-input" placeholder = "Search user" onChange={this.handleChange} autoComplete='off' 
                />
             <button type='submit' className='search-button'> <i className='fa fa-search'></i> 
             </button>
            </div> 
            <p className='error-message'>{this.state.errors}</p>
        </form>
    
    )  

    }  
}
    

Search.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
   
}


const mapStateToProps = (state) => ({
    data: state.data,
     UI: state.UI
});

export default connect(mapStateToProps, { getUserData })(Search);