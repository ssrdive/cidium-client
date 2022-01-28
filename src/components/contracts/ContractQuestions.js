import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const ContractQuestions = ({ id }) => {
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/questions/${id}`)
                .then(res => {
                    if (res.data === null) setQuestions(prevQuestions => []);
                    else setQuestions(prevQuestions => res.data);
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
                <h4 className="header-title mt-0">Questions</h4>

                {questions !== null ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question, index) => {
                                return <tr key={index}>
                                    <td>{question.question}</td>
                                    <td>{question.answer}</td>
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

export default ContractQuestions;