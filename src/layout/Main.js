import React from "react";
import Preloader from "../components/Preloader";
import MovieList from "../components/MovieList";
import './Main.css';
import Search from "../components/Search";
import { type } from "@testing-library/user-event/dist/type";

class Main extends React.Component
{
    
    state = {movies:[], loading:false, type:"all", count:0}
    
    componentDidMount()
    {
        // fetch('https://omdbapi.com/?apikey=77b5092&s=Matrix')
        // .then(response => response.json())
        // .then(data => this.setState({movies:data.Search, loading:false,count:data.totalResults}))
        this.setState({loading:true})
        fetch(`https://omdbapi.com/?apikey=77b5092&s=Matrix&page=${1}`)
        .then(response => response.json())
        .then(
            data => 
                {
                    if (data.Response ==="True") this.setState({movies:data.Search,loading:false,count:data.totalResults});
                    else this.setState({movies:[], loading:false,count:data.totalResults});
                    }
            )
            console.log("\n=====================ComponentDidMount===========================\n");
            console.log(this.state);
    }
    searchMovie = (str,type ='all', page) =>
    {
        this.setState({loading:true})
        fetch(`https://omdbapi.com/?apikey=77b5092&s=${str.trim()}${type !=='all' ? `&type=${type}`:''}${`&page=${page}`}`)
        .then(response => response.json())
        .then(
            data => 
                {
                    if (data.Response ==="True") this.setState({movies:data.Search,loading:false,count:data.totalResults});
                    else this.setState({movies:[], loading:false,count:data.totalResults});
                    }
            )
        // this.setState({loading:false})
    }
    render()
    {
        console.log("\n=============Main raender===================\n");
        console.log (this.state);
        const{search}= this.state;
        return(
            <div className="main">
                <div className="wrap">
                <Search searchMovie ={this.searchMovie} totalCount={this.state.count}/>
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