import React from 'react';
import { Spinner, Button } from 'reactstrap';

const SubmitComponent = ({ loading, color, name, onClick }) => {
    return (
        <>
            {loading ? (
                <Spinner className="m-2" type="grow" color={color} />
            ) : (
                    <Button size="sm" onClick={onClick} color={color} type="submit">
                        {name}
                    </Button>
                )}
        </>
    );
};

export default SubmitComponent;