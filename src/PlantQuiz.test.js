import React from 'react';
import { render } from '@testing-library/react';
import PlantQuiz from './PlantQuiz.js';


//to test, run npm test

describe("Plant Quiz", () => {

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<PlantQuiz />, div);
    });

});
