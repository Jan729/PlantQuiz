import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PlantQuiz from './PlantQuiz.js';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';

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

const state = {
    turnData: getTurnData(plants),
    highlight: '',
    onAnswerSelected
};

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.plant.plantList.some((plantName) => plantName === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render(); //render the page again
}

function render() {
    ReactDOM.render(
        <PlantQuiz {...state} />,
        document.getElementById('root')
    );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
