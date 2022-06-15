import { Link } from 'react-router-dom';

export function Nav(props) {
    const list = props.data.map(e => <li key={e.id}><Link to={'/read/' + e.id} onClick={() => {
        props.onSelecte(e.id);
    }}>{e.title}</Link></li>);
    return <nav>
        <ol>
            {list}
        </ol>
    </nav>;
}
