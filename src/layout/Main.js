import React from "react";
import Preloader from "../components/Preloader";
import MovieList from "../components/MovieList";
import './Main.css';
import Search from "../components/Search";

class Main extends React.Component
{
    
    state = {movies:[]}
    componentDidMount()
    {
        fetch('https://omdbapi.com/?apikey=77b5092&s=Matrix')
        .then(response => response.json())
        .then(data => this.setState({movies:data.Search}))
    }
    searchMovie = (str) =>
    {
        this.setState({loading:true})
        fetch(`https://omdbapi.com/?apikey=77b5092&s=${str}`)
        .then(response => response.json())
        .then(data => this.setState({movies:data.Search}))
    }
    render()
    {
        const{search}= this.state;
        return(
            <div className="main">
                <div className="wrap">
                <Search searchMovie ={this.searchMovie}/>
                    {
                        this.state.movies.length ? <MovieList movies ={this.state.movies}/> : <Preloader/>
                    }
                    
                </div>
            </div>
        )
    }
}
export default Main;