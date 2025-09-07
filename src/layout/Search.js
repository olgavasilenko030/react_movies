import React from "react";
class Search3 extends React.Component
{
    state = {search:""}

    update = (event) =>
    {
        this.setState({[event.target.name]:event.target.value});
    }

    render()
    {
        const{search}= this.state;
        return(
            <div>
                <form>
                <div><input value={search}   name="search"    placeholder="Поиск"       onChange={this.update}/></div>

                </form>


            </div>
                
        )
    }
}