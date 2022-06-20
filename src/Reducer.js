import { useReducer } from 'react';

function App() {
    const countReducer = (oldCount, action) => {
        switch (action) {
            case 'up':
                return oldCount + 1;
            case 'down':
                return oldCount - 1;
            default:
                return;
        }
    };

    const countInitValue = 0;
    const [count, countDispatch] = useReducer(countReducer, countInitValue);

    return <>
        <button onClick={() => {
            countDispatch('up');
        }}>+</button>
        <button onClick={() => {
            countDispatch('down');
        }}>-</button>
        <p>{count}</p>
    </>
};

export default App;
