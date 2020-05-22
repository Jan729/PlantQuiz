import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import PlantQuiz from './PlantQuiz.js';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import AddPlantForm from './AddPlantForm.js'

const plants = [
    {
        name: 'Tomato',
        imgPath: require('./images/tomato.png'),
        imgSource: 'google images',
        plantList: ['Tomato']
    },

    {
        name: 'Strawberry',
        imgPath: require('./images/strawberry.jpg'),
        imgSource: 'google images',
        plantList: ['Strawberry']
    },

    {
        name: 'Apple',
        imgPath: require('./images/apple.jpg'),
        imgSource: 'google images',
        plantList: ['Apple']
    },

    {
        name: 'Banana',
        imgPath: require('./images/banana.jpg'),
        imgSource: 'google images',
        plantList: ['Banana']
    },

    {
        name: 'Mango',
        imgPath: require('./images/mango.jpg'),
        imgSource: 'google images',
        plantList: ['Mango']
    },

    {
        name: 'Avocado',
        imgPath: require('./images/avocado.jpg'),
        imgSource: 'google images',
        plantList: ['Avocado']
    }

];

function getTurnData(plants) {
    /*randomly choose possible multiple choice answers*/
    const allPlants = plants.reduce(function (p, c, i) {
        return p.concat(c.plantList);
    }, []); //p is the final array(?) and c is each object in plants array

    const fourRandomPlants = shuffle(allPlants).slice(0, 4); //take the first 4 items out of shuffled plant list
    const answer = sample(fourRandomPlants);

    //choose a 'plant' from the randomly chosen plant guesses

    return {
        plant: plants.find((plant) => plant.plantList.some((plantName) => plantName === answer)),
        plantChoices: fourRandomPlants
    };
}

function resetState() {
    return ({
        turnData: getTurnData(plants),
        highlight: '',
    });

}

let state = resetState();

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.plant.plantList.some((plantName) => plantName === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render(); //render the page again
}

//create a wrapper to be able to pass "onAddPlant" prop thru a Route
//withRouter lets you navigate to another page by pushing a new path onto history
const PlantWrapper = withRouter(({ history }) => {
    return <AddPlantForm onAddPlant={(plant) => {
        plants.push(plant);
        history.push('/');
    }} />;

});


function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/add" component={PlantWrapper} />
            </React.Fragment>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

function App() {
    return (<PlantQuiz {...state}
        onAnswerSelected={onAnswerSelected}
        onContinue={() => {
            state = resetState();
            render();
        }}
    />);
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
