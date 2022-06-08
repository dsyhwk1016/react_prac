import logo from './logo.svg';
import './App.css';

function Header(){
    return <header><h1><a href='/'>WWW</a></h1></header>
}

function Nav(props){
    const list = props.map(e=><li key={e.id}><a href={'read'+e.id}>{e.title}</a></li>)
    return <nav>
        <ol>
            {list}
        </ol>
    </nav>
}

function Article(){
    return <article>
        <h2>Welcome</h2>
        Hello, WEB!
    </article>
}

const list = ['html', 'css']

function App() {
  return (
    <div>
        <Header></Header>
        <Nav title='html'></Nav>
        <Article></Article>
    </div>
  );
}

export default App;
