import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import { HeaderStyled } from './HeaderStyled';
import { Article } from './Article';
import { Nav } from './Nav';
import { Create } from './Create';

function Read({topics}){
    const id = Number(useParams().id);
    const topic = topics.filter(e => e.id === id)[0];
    return <Article title={topic.title} body={topic.body}></Article>;
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [topics, setTopics] = useState([
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' }
    ]);
    const [nextId, setNextId] = useState(3);

    function createHandler() {
        setMode('CREATE');
    }

    function deleteHandler() {
        setMode('WELCOME');
        setTopics(topics => {
            const newTopics = topics.filter(t => t.id !== id);
            return newTopics;
        });
    }

    return (
        <div>
            <HeaderStyled onSelecte={headerHandler()}></HeaderStyled>
            <Nav data={topics} onSelecte={navHandler()}></Nav>
            <Routes>
                <Route path='/' element={<Article title='Welcome' body='Hello, WEB!'></Article>} />
                <Route path='/create' element={<Create onCreate={onCreateHandler()} />} />
                <Route path='/read/:id' element={<Read topics={topics} />} />
            </Routes>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button component={Link} to="/create" onClick={createHandler}>Create</Button>
                <Button>Update</Button>
                <Button onClick={deleteHandler}>Delete</Button>
            </ButtonGroup>
        </div>
    );

    function onCreateHandler() {
        return (title, body) => {
            setTopics(topics => {
                const newTopics = [...topics];
                newTopics.push({ id: nextId, title, body });
                return newTopics;
            });
            setId(nextId);
            setMode('READ');
            setNextId(nextId => nextId + 1);
        };
    }

    function navHandler() {
        return (id) => {
            setMode('READ');
            setId(id);
        };
    }

    function headerHandler() {
        return () => { setMode('WELCOME'); };
    }
}

export default App;
