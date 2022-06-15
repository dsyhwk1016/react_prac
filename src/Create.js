export const Create = (props) => {
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
    );
};
