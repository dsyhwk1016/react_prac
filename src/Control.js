import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useParams } from 'react-router-dom';

export function Control({ onDelete }) {
    const id = Number(useParams().id);
    let contextUI = null;

    if (id) {
        contextUI = <>
            <Button>Update</Button>
            <Button onClick={() => onDelete(id)}>Delete</Button>
        </>;
    }
    return (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button component={Link} to="/create">Create</Button>
            {contextUI}
        </ButtonGroup>
    );
}
