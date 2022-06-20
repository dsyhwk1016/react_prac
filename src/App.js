import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HeaderStyled } from './HeaderStyled';
import { Article } from './Article';
import { Nav } from './Nav';
import { Create } from './Create';
import { Update } from './Update';
import { Read } from './Read';
import { Control } from './Control';

function App() {
    const [topics, setTopics] = useState([]);

    const refreshTopics = async() => {
        const res = await fetch('http://localhost:3333/topics');
        const data = await res.json();
        setTopics(data);
    }
    useEffect(()=>{
        refreshTopics();
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <HeaderStyled />
            <Nav data={topics}></Nav>
            <Routes>
                <Route path='/' element={<Article title='Welcome' body='Hello, WEB!'></Article>} />
                <Route path='/create' element={<Create onCreate={onCreateHandler} />} />
                <Route path='/read/:id' element={<Read />} />
                <Route path='/update/:id' element={<Update onUpdate={onUpdateHandler} />} />
            </Routes>
            <Routes>
                {['/', '/read/:id', '/update/:id', '/delete/:id'].map(path => <Route path={path} element={<Control onDelete={deleteHandler} />} />)}
            </Routes>
        </div>
    );

    async function onCreateHandler(title, body) {
        const res = await fetch('http://localhost:3333/topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        });
        const data = await res.json();

        navigate(`/read/${data.id}`);
        refreshTopics();
    };

    async function onUpdateHandler(id, title, body){
        const res = await fetch(`http://localhost:3333/topics/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        });
        const data = await res.json();

        navigate(`/read/${data.id}`);
        refreshTopics();
    };

    async function deleteHandler(id) {
        const res = await fetch(`http://localhost:3333/topics/${id}`, {
            method: 'DELETE'
        });
        
        navigate('/');
        refreshTopics();
    };
}

export default App;
