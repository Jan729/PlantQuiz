import React from 'react';
import PropTypes from 'prop-types';

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

function Turn({ plant, plantChoices, highlight, onAnswerSelected}) {
   
    //map values of highlight to appropriate colour
    function highlightToBgColor(highlight) {
        const mapping = {
            'none': '',
            'correct': '#8bd984', //green 
            'wrong': '#fa4d4d'  //red
        };

        return mapping[highlight];
    }
    return (
    <div className="row turn" style={{ backgroundColor: highlightToBgColor(highlight) }}>
            <div className="col-4 offset-1">
                <img src={plant.imgPath} className="plantimage" alt="Plant" />
            </div>
            <div className="col-6">
            {plantChoices.map((guess) => <PlantGuess plantName={guess} key={guess} onClick={onAnswerSelected}/>)}
                {/*bootstrap 6 colums on the right, 4 cols on the left
                 make sure your keys are unique among each array*/}
            </div> 
        </div>
    );

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

}

function PlantGuess(props) {
    return (

        <div className="guess" onClick={() => { props.onClick(props.plantName)}}>
            <h4>{props.plantName}</h4>
        </div>
        );

}

function Continue() {
    return (<div>
        
    </div>);
}

function Footer() {
    return (
        <div id="footer" className="row">
            {/* <p className="text-muted credit">Image source: Google images
            </p> */}
        </div>);
}

function PlantQuiz({ turnData, highlight, onAnswerSelected }) {

    return (
        <div className="container-fluid">
            <Title />
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
            <Continue />
            <Footer />
        </div>
    );
}

export default PlantQuiz;