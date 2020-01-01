import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';

import ContractDetails from '../../components/contracts/ContractDetails';
import ContractStateDocuments from '../../components/contracts/ContractStateDocuments';
import ContractStateQuestions from '../../components/contracts/ContractStateQuestions';
import ContractRequestability from '../../components/contracts/ContractRequestability';

export default ({ match }) => {
    const id = match.params.id;
    const [documents, setDocuments] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [requestability, setRequestability] = useState({});

    useEffect(() => {
        loadDocuments();
        loadQuestions();
        loadRequestability();
    }, []);

    const loadDocuments = () => {
        apiAuth
            .get(`/contract/work/documents/${id}`)
            .then(res => {
                setDocuments(oldDocuments => res.data);
                loadRequestability();
            })
            .catch(err => {
                console.log(err);
            });
    };
    const loadQuestions = () => {
        apiAuth
            .get(`/contract/work/questions/${id}`)
            .then(res => {
                setQuestions(oldQuestions => res.data);
                loadRequestability();
            })
            .catch(err => { 
                console.log(err);
            });
    };
    const loadRequestability = () => {
        apiAuth
            .get(`/contract/requestability/${id}`)
            .then(res => {
                setRequestability(oldRequestability => res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Work', path: '#', active: true },
                        ]}
                        title={'Work in Contract'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <ContractDetails id={id} />
                </Col>
                <Col md={4}>
                    <ContractRequestability requestability={requestability} id={id} loadRequestability={loadRequestability} />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <ContractStateQuestions questions={questions} loadQuestions={loadQuestions} />
                </Col>
                <Col md={6}>
                    <ContractStateDocuments documents={documents} loadDocuments={loadDocuments} />
                </Col>
            </Row>
        </>
    );
};
