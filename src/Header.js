import { Link } from 'react-router-dom';

export function Header(props) {
    return <header className={props.className}>
        <h1>
            <Link to='/'>WWW</Link>
        </h1>
    </header>;
}
