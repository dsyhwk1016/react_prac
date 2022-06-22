import "./Redux.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import countUp from './countUpSlice';
import { down } from './countDownSlice';

function Left1() {
    return (
        <div>
            <h1>Left1</h1>
            <Left2></Left2>
        </div>
    );
};

function Left2() {
    return (
        <div>
            <h1>Left2</h1>
            <Left3></Left3>
        </div>
    );
};

function Left3() {
    const dispatch = useDispatch();
    const countUpValue = useSelector(state => state.countUp.value);

    return (
        <div>
            <h1>Left3</h1>
            <button
                onClick={async () => {
                    const resp = await fetch('http://localhost:3333/countUp', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ value: countUpValue + 1 }),
                    });
                    const result = await resp.json();
                    dispatch(countUp.actions.up(1));
                }}
            >
                +
            </button>
            <button
                onClick={() => {
                    dispatch(down(2));
                }}
            >
                -
            </button>
        </div>
    );
};

function Right1() {
    return (
        <div>
            <h1>Right1</h1>
            <Right2></Right2>
        </div>
    );
};

function Right2() {
    return (
        <div>
            <h1>Right2</h1>
            <Right3></Right3>
        </div>
    );
};

function Right3() {
    const countUpValue = useSelector(state => state.countUp.value);
    const countDownValue = useSelector(state => state.countDown.value);

    return (
        <div>
            <h1>Right3</h1>
            {countUpValue} | {countDownValue}
        </div>
    );
};

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const resp = await fetch('http://localhost:3333/countUp');
            const result = await resp.json();
            dispatch(countUp.actions.set(result.value));
        })()
    }, []);

    return (
        <div id="app">
            <h1>Root</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Left1></Left1>
                <Right1></Right1>
            </div>
        </div>
    );
};