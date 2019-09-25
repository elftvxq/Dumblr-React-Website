import React, { Component } from 'react';
import './search.css'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import axios from 'axios';
import { getUserData, getScreams } from "../../redux/actions/dataActions";
import Home from '../../pages/Home';
import TextField from '@material-ui/core/TextField';

class Search extends Component {

    state = {
        searchInput:'',
        profile: null,
        errors:''
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

    handleChange = (e) => {
        this.setState({
           [e.target.id]: e.target.value 
        })
        
    }
    
        
    handleSubmit = (e)=>{
        e.preventDefault();
        // this.props.getUserData(this.state.searchInput);
        
        axios.get(`/user/${this.state.searchInput}`)
        .then((res)=>{
            this.setState({
                profile: res.data.user
            });
            if (this.state.profile !== null) {
                 window.location.href = `/users/${this.state.searchInput}`
            } else {
                this.setState(()=> ({errors: 'User cannot be found'}));
                console.log('有？')
                return; 
            } 
          }
        ).catch((err) => console.log('Error', err.response.data.error)) 
    }
    
    render(){

       const errors = this.state.errors;
      

    return ( 
        <form className="searchBar" onSubmit={this.handleSubmit}>
            <input type ="search" id='searchInput' className ="Searchinput" placeholder = "請輸入正確的使用者名稱" onChange={this.handleChange} autoComplete='off' 
            required/>
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