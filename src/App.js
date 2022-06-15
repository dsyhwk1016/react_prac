import styled from 'styled-components';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';

const HeaderStyled = styled(Header)`
    border-bottom: 1px solid gray;
    padding: 10px;
    font-size: 20px;
`;

function Header(props) {
    return <header className={props.className}><h1><Link to='/' onClick={() => {
        props.onSelecte();
    }}>WWW</Link></h1></header>
}

function Nav(props) {
    const list = props.data.map(e => <li key={e.id}><Link to={'/read/' + e.id} onClick={() => {
        props.onSelecte(e.id);
    }}>{e.title}</Link></li>)
    return <nav>
        <ol>
            {list}
        </ol>
    </nav>
}

function Article(props) {
    return <article>
        <h2>{props.title}</h2>
        {props.body}
    </article>
}

const Create = (props) => {
    return (
        <article>
            <h2>Create</h2>
            <form onSubmit={event => {
                event.preventDefault();

                const title = event.target.title.value;
                const body = event.target.body.value;

                props.onCreate(title, body);
            }}>
                <p><input name='title' type='text' placeholder='title' /></p>
                <p><textarea name='body' placeholder='body' /></p>
                <p><input type='submit' value='Create' /></p>
            </form>
        </article>
    )
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [topics, setTopics] = useState([
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' }
    ]);
    const [nextId, setNextId] = useState(3);

    let content = null;
    if (mode === 'WELCOME') {
        content = <Article title='Welcome' body='Hello, WEB!'></Article>
    } else if (mode === 'READ') {
        const topic = topics.filter(e => e.id === id)[0];
        content = <Article title={topic.title} body={topic.body}></Article>
    } else if (mode === 'CREATE') {
        content = <Create onCreate={(title, body) => {
            setTopics(topics => {
                const newTopics = [...topics];
                newTopics.push({ id: nextId, title, body });
                return newTopics;
            });
            setId(nextId);
            setMode('READ');
            setNextId(nextId => nextId + 1);
        }} />
    }

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
            <HeaderStyled onSelecte={() => { setMode('WELCOME') }}></HeaderStyled>
            <Nav data={topics} onSelecte={(id) => {
                setMode('READ');
                setId(id);
            }}></Nav>
            {content}
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button component={Link} to="/create" onClick={createHandler}>Create</Button>
                <Button>Update</Button>
                <Button onClick={deleteHandler}>Delete</Button>
            </ButtonGroup>
        </div>
    );
}

export default App;
