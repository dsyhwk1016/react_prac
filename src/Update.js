import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Update = (props) => {
    const id = Number(useParams().id);
    const [topic, setTopic] = useState({ title: null, body: null });

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3333/topics/${id}`);
            const data = await res.json();
            setTopic(data);
        })();
    }, [id]);

    return (
        <article>
            <h2>Update</h2>
            <form onSubmit={event => {
                event.preventDefault();

                const title = event.target.title.value;
                const body = event.target.body.value;

                props.onUpdate(title, body);
            }}>
                <p><input name='title' type='text' placeholder='title' value={topic.title} /></p>
                <p><textarea name='body' placeholder='body' value={topic.body} /></p>
                <p><input type='submit' value='Update' /></p>
            </form>
        </article>
    );
};
