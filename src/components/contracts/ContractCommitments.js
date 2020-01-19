import React, { useState, useEffect } from 'react';
import { Card, CardBody, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

import AddCommitment from './AddCommitment';
import Commitment from './Commitment';

export default ({ id }) => {
    const [commitments, setCommitments] = useState(null);

    useEffect(() => {
        fetchCommitments();
        // eslint-disable-next-line
    }, [id]);

    const fetchCommitments = () => {
        apiAuth
            .get(`/contract/commitments/${id}`)
            .then(res => {
                if (res.data === null) setCommitments(prevCommitments => []);
                else setCommitments(prevCommitments => res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Card>
            <CardBody>
                <AddCommitment id={id} fetchCommitments={fetchCommitments} />

                <br />
                <h4 className="header-title mt-0">Commitments</h4>

                {commitments !== null ? (
                    <>
                        {commitments.map((commitment, index) => {
                            return (
                                <Commitment key={index} commitment={commitment} fetchCommitments={fetchCommitments} />
                            );
                        })}
                    </>
                ) : (
                    <Spinner type="grow" color="primary" />
                )}
            </CardBody>
        </Card>
    );
};