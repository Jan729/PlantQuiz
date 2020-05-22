import React from 'react';
import './index.css';


//bug: missing 'require()' method when adding new image path

class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgPath: '',
            plantList: [],
            plantTemp: ''
        }
        //guarantees that no matter how onFieldChange is called, the value of "this" in the method
        //will be the same as the value of "this" in the constructor
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddPlant = this.handleAddPlant.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }); 
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddPlant(this.state); //invoke onAddPlant on this form. lift up state to parent
    }

    handleAddPlant(event) {
        this.setState({
            plantList: this.state.plantList.concat([this.state.plantTemp]), //cast to array(?)
            plantTemp: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="AddPlantForm_input">

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onFieldChange} />

                    <label htmlFor="imgURL">Image URL</label>
                    <input
                        type="text"
                        name="imgURL"
                        value={this.state.imgURL}
                        onChange={this.onFieldChange} />

                    <label htmlFor="plantTemp">Plants</label>
                    <div className="AddPlantForm_input"> {/*rmb each array item needs a key*/}
                        {this.state.plantList.map((plant) => <p key={plant}>{plant}</p>)}
                        <input
                            type="text"
                            name="plantTemp"
                            value={this.state.plantTemp}
                            onChange={this.onFieldChange} />
                        <input type="button" value="+" onClick={this.handleAddPlant}/>
                    </div>

                </div>
                <input type="submit" value="Add Plant to Quiz"/>
            </form>
        );
    }
}

//higher level Add Plant page
//match contains info about the object(?)
export default function AddPlantForm({ match, onAddPlant}) {
    return (<div className="AddPlantForm">
        <h1>Add Plant</h1>
        <PlantForm onAddPlant={onAddPlant}/>

    </div>
    );
}
