import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header(props) {
    return <header><h1><a href='/' onClick={e=>{
        e.preventDefault();
        props.onSelecte();
    }}>WWW</a></h1></header>
}

function Nav(props) {
    const list = props.data.map(e => <li key={e.id}><a href={'/read/' + e.id} onClick={event => {
        event.preventDefault();
        props.onSelecte(e.id);
    }}>{e.title}</a></li>)
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

function App() {
    const topics = [
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' }
    ]

    const [mode,setMode] = useState('WELCOME');
    const [id,setId] = useState(null);
    let content = null;
    if(mode === 'WELCOME'){
        content = <Article title='Welcome' body='Hello, WEB!'></Article>
    }else if(mode === 'READ'){
        const topic = topics.filter(e=>e.id===id)[0];
        content = <Article title={topic.title} body={topic.body}></Article>
    }

    function createHandler() {
        alert('create!')
    }

    return (
        <div>
            <Header onSelecte={()=>{setMode('WELCOME')}}></Header>
            <Nav data={topics} onSelecte={(id)=>{
                setMode('READ');
                setId(id);
                }}></Nav>
            {content}
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={createHandler}>Create</Button>
                <Button>Update</Button>
                <Button>Delete</Button>
            </ButtonGroup>
        </div>
    );
}

export default App;
