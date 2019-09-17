import React, { Component } from 'react';
import './search.css'
// import {  ReactComponent as SearchIcon } from '../image/search.svg';

class Search extends Component {

    state = {
        searchInput:'',
    }

    handleChange = (e) => {
        this.setState({
           [e.target.id]: e.target.value 
        })
        console.log(this.state);
    }

    render(){
       
    return ( 
        <form className="searchBar" >
            <input type ="search" id='searchInput' className ="Searchinput" placeholder = "搜尋使用者" onChange={this.handleChange}/>
        </form>
    
    )  

    }
   
}

export default Search;