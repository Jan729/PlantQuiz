import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import PlantQuiz from './PlantQuiz.js';
import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { shuffle, sample } from 'underscore';
import AddPlantForm from './AddPlantForm.js'

//Adapted from Liam McLennan's Author Quiz from the Pluralsight React Fundamentals tutorial

//tutorial uses hard coded quiz questions. Not optimal but the point of this code is to learn Redux and
//state management
const plants = [
    {
        name: 'Tomato',
        imgPath: require('./images/tomato.png'),
        plantList: ['Tomato']
    },

    {
        name: 'Strawberry',
        imgPath: require('./images/strawberry.jpg'),
        plantList: ['Strawberry']
    },

    {
        name: 'Apple',
        imgPath: require('./images/apple.jpg'),
        plantList: ['Apple']
    },

    {
        name: 'Banana',
        imgPath: require('./images/banana.jpg'),
        plantList: ['Banana']
    },

    {
        name: 'Mango',
        imgPath: require('./images/mango.jpg'),
        plantList: ['Mango']
    },

    {
        name: 'Avocado',
        imgPath: require('./images/avocado.jpg'),
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
        plantChoices: fourRandomPlants,
        plant: plants.find((plant) =>
            plant.plantList.some((plantName) =>
            plantName === answer)),
    };
}

//process all actions
function reducer(
    state = { plants, turnData: getTurnData(plants), highlight: '' }, //default store values
    action) {

    switch (action.type) {
        case 'ANSWER_SELECTED': //return a NEW object with Object.assign({}, ...). New object triggers a re-render I think
            const isCorrect = state.turnData.plant.plantList.some((plantName) => plantName === action.answer);
            return Object.assign({}, state, {
                highlight: isCorrect ? 'correct' : 'wrong'
            });

        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.plants)
            });
        case 'ADD_PLANT':
            return Object.assign({}, state, {
                plants: state.plants.concat([action.plant])
            });
        default: return state; //if don't know how to handle action, don't handle it. return state as is
    }
}

//to debug redux in brower, ladd redux dev tools extension
let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //app container that holds the state

//Tip: leave old system intact until state refactoring is complete

//before, we created a wrapper to be able to pass "onAddPlant" prop thru a Route
//withRouter lets you navigate to another page by pushing a new path onto history
//but now that we're using Redux, we don't need the wrapper any more

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={PlantQuiz} />
                <Route path="/add" component={AddPlantForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
