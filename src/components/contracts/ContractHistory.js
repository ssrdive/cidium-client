import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const ContractHistory = ({ id }) => {
    const [history, setHistory] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/history/${id}`)
                .then(res => {
                    if (res.data === null) setHistory(prevQuestions => []);
                    else setHistory(prevQuestions => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">History</h4>

                {history !== null ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>From State</th>
                                <th>To State</th>
                                <th>Approver</th>
                                <th>Transition Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h, index) => {
                                return <tr key={index}>
                                    <td>{h.from_state.String}</td>
                                    <td>{h.to_state}</td>
                                    <td>{h.approver.String}</td>
                                    <td>{h.transition_date}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <Spinner type="grow" color="primary" />
                )}
            </CardBody>
        </Card>
    );
};

export default ContractHistory;