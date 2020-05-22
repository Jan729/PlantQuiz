import React from 'react';
import ReactDOM from 'react-dom';
import PlantQuiz from './PlantQuiz.js';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

//to test, run npm test
const dummyState = {
    turnData: {
        
        plant: {
            name: 'Tomato',
            imgPath: require('./images/tomato.png'),
            imgSource: 'google images',
            plantList: ['Tomato']
        },
        plantChoices: ['Tomato', 'Strawberry', 'Grape', 'Apricot']
    },

    highlight: 'none'
}

describe("Plant Quiz", () => {

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<PlantQuiz {...dummyState} onAnswerSelected={() => {}}/>, div);
    });

    describe("When no answer has been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<PlantQuiz {...dummyState} onAnswerSelected={() => { }} />);
        });

        it("should have no background color", () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
        });
    });

    //override a test object with Object.assign({}, nameOfTestObject, {overriddenProp: 'newValue'})
    describe("When the wrong answer has been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<PlantQuiz {...(Object.assign({}, dummyState, {highlight: 'wrong'}))} onAnswerSelected={() => { }} />);
        });

        it("should have no background color", () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('#fa4d4d');
        });
    });

    describe("When user selects the first answer", () => {
        let wrapper;
        const handleAnswerSelected = jest.fn(); //creates a mock function

        beforeAll(() => {
            wrapper = mount(
                <PlantQuiz {...dummyState} onAnswerSelected={handleAnswerSelected} />);
            wrapper.find('.guess').first().simulate('click');
        });

        it("onAnswerSelected should be called", () => {
            expect(handleAnswerSelected).toHaveBeenCalled();
        });

        it("the selected answer should be Tomato", () => {
            expect(handleAnswerSelected).toHaveBeenCalledWith("Tomato");
        });
     
    });


});
