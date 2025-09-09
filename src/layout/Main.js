import React from "react";
import Preloader from "../components/Preloader";
import MovieList from "../components/MovieList";
import './Main.css';
import Search from "../components/Search";
import { type } from "@testing-library/user-event/dist/type";

class Main extends React.Component
{
    
    state = {movies:[], loading:false, type:"all"}
    componentDidMount()
    {
        fetch('https://omdbapi.com/?apikey=77b5092&s=Matrix')
        .then(response => response.json())
        .then(data => this.setState({movies:data.Search}))
    }
    searchMovie = (str,type ='all') =>
    {
        this.setState({loading:true})
        fetch(`https://omdbapi.com/?apikey=77b5092&s=${str.trim()}${type !=='all' ? `&type=${type}`:''}`)
        .then(response => response.json())
        .then(
            data => 
                {
                    if (data.Response ==="True") this.setState({movies:data.Search,loading:false});
                    else this.setState({movies:[], loading:false})
                    }
            )
        // this.setState({loading:false})
    }
    render()
    {
        const{search}= this.state;
        return(
            <div className="main">
                <div className="wrap">
                <Search searchMovie ={this.searchMovie}/>
                    {
                        !this.state.loading && //this.state.movies.length&&                     
                            this.state.movies.length ? <MovieList movies ={this.state.movies}/> : <Preloader/>
                    }
                    
                </div>
            </div>
        )
    }
}
export default Main;