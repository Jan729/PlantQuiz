import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Title() {
    return (
        <div className="row">
            <div className="jumbotron col-10 offset-1">
                <h1> Seriously Difficult Plant Quiz </h1>
                <p>Guess the fruit that grows from this plant.</p>
            </div>
        </div>
    );
}

function Turn({ plant, plantChoices, highlight, onAnswerSelected }) {

    //map values of highlight to appropriate colour
    function highlightToBgColor(highlight) {
        const mapping = {
            'none': '',
            'correct': '#8bd984', //green 
            'wrong': '#fa4d4d'  //red
        };

        return mapping[highlight];
    }

    //prop validation. check if your parameters were correctly passed in
    Turn.propTypes = {
        plant: PropTypes.shape({
            name: PropTypes.string.isRequired,
            imgPath: PropTypes.string.isRequired,
            imgSource: PropTypes.string.isRequired,
            plantList: PropTypes.arrayOf(PropTypes.string).isRequired
        }),

        plantChoices: PropTypes.arrayOf(PropTypes.string).isRequired,
        onAnswerSelected: PropTypes.func.isRequired,
        higlight: PropTypes.string.isRequired
    };

    return (
        <div className="row turn" style={{ backgroundColor: highlightToBgColor(highlight) }}>
            <div className="col-4 offset-1">
                <img src={plant.imgPath} className="plantimage" alt="Plant" />
            </div>
            <div className="col-6">
                {plantChoices.map((guess) => <PlantGuess plantName={guess} key={guess} onClick={onAnswerSelected} />)}
                {/*bootstrap 6 columns on the right, 4 cols on the left
                 make sure your keys are unique among each array*/}
            </div>
        </div>
    );

}

function PlantGuess(props) {
    return (

        <div className="guess" onClick={() => { props.onClick(props.plantName) }}>
            <h4>{props.plantName}</h4>
        </div>
    );

}

function Continue({ show, onContinue }) {
    return (
        <div className="row continue">
            {show
                ? <div className="col-11">
                    <button className="btn btn-primary btn-lg float-right" onClick={onContinue} >
                    Continue
                    </button>
                </div>
                : null}
        </div>);
}

function Footer() {
    return (
        <div id="footer" className="row">
            {/* <p className="text-muted credit">Image source: Google images
            </p> */}
        </div>);
}

function PlantQuiz({ turnData, highlight, onAnswerSelected, onContinue }) {

    return (
        <div className="container-fluid">
            <Title />
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
            <Continue show={highlight === 'correct'} onContinue={onContinue} />
            <p><Link to="/add">Add a plant</Link></p>
            <Footer />
        </div>
    );
}

export default PlantQuiz;