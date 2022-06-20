import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Update = (props) => {
    const id = Number(useParams().id);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3333/topics/${id}`);
            const data = await res.json();
            setTitle(data.title);
            setBody(data.body);
        })();
    }, [id]);

    return (
        <article>
            <h2>Update</h2>
            <form onSubmit={event => {
                event.preventDefault();

                const title = event.target.title.value;
                const body = event.target.body.value;

                props.onUpdate(id, title, body);
            }}>
                <p><input name='title' type='text' placeholder='title' value={title} onChange={e=>setTitle(e.target.value)} /></p>
                <p><textarea name='body' placeholder='body' value={body} onChange={e=>setBody(e.target.value)} /></p>
                <p><input type='submit' value='Update' /></p>
            </form>
        </article>
    );
};
