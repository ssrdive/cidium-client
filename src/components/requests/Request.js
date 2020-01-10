import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default ({ request, changeRequest }) => {
    return (
        <tr>
            <td>
                <Button size="sm" onClick={() => changeRequest(request)} color="primary">
                    {request.request_id}
                </Button>
            </td>
            <Link to={'/contracts/work/' + request.contract_id}>
                <td>{request.contract_id}</td>
            </Link>
            <td>{request.customer_name}</td>
            <td>{request.contract_state}</td>
            <td>{request.to_contract_state}</td>
            <td>{request.requested_by}</td>
            <td>{request.requested_on}</td>
        </tr>
    );
};