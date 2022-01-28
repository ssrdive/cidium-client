import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Table, } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const ExpiredCommitments = () => {
    const [commitments, setCommitments] = useState(null);

    useEffect(() => {
        const fetchCommitments = () => {
            apiAuth
                .get(`/dashboard/commitments/expired`)
                .then(res => {
                    setCommitments(prevCommitments => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchCommitments();
    }, []);

    return (
        <Table className="mb-0" striped>
            <thead>
                <tr>
                    <th>Contract ID</th>
                    <th>Expired</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {commitments === null ? null : (
                    <>
                        {commitments.map((commitment, index) => {
                            return (
                                <tr key={index}>
                                    <td><Link to={`/contracts/details/${commitment.contract_id}`}>{commitment.contract_id}</Link></td>
                                    <td><Badge color="danger">{Math.abs(commitment.due_in)} days ago</Badge></td>
                                    <td>{commitment.text}</td>
                                </tr>
                            );
                        })}
                    </>
                )}
            </tbody>
        </Table>
    );
};

export default ExpiredCommitments;