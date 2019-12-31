import React, { useState, useEffect } from 'react';
import { Row, Badge, Col, Card, CardBody, Form, FormGroup, Label, Spinner, Button } from 'reactstrap';
import qs from 'qs';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import { TEXT_INPUT_REQUIRED, FILE_INPUT_REQUIRED } from '../../constants/formValues';
import FormInput, { FileInput } from '../../components/form/FormInput';
import { getLoggedInUser } from '../../helpers/authUtils';

const ContractStateQuestion = props => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        [props.question_id]: TEXT_INPUT_REQUIRED,
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    const handleFormSubmit = e => {
        setLoading(prevLoading => true);
        e.persist();
        e.preventDefault();
        apiAuth
            .post(
                '/contract/answer',
                qs.stringify({
                    contract_state_id: props.contract_state_id,
                    question_id: props.question_id,
                    answer: form[props.question_id].value,
                })
            )
            .then(res => {
                setLoading(prevLoading => false);
                props.reloadQuestions();
            })
            .catch(err => {
                setLoading(prevLoading => false);
                props.reloadQuestions();
            });
    };

    const SubmitComponent = () => {
        return (
            <>
                {loading ? (
                    <Spinner className="m-2" type="grow" color="success" />
                ) : (
                    <Button color="success" type="submit">
                        Add
                    </Button>
                )}
            </>
        );
    };

    return (
        <>
            {props.answer.Valid === true ? (
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <Label for="question">{props.question}</Label>
                            </Col>
                            <Col md={8}>
                                <b>{props.answer.String}</b>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={handleFormSubmit}>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="question">{props.question}</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <FormInput
                                                {...form[props.question_id]}
                                                name={props.question_id}
                                                handleOnChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <SubmitComponent />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

const ContractStateDocument = props => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        [props.document_id]: FILE_INPUT_REQUIRED,
    });

    const handleOnChange = e => {
        e.persist();
        console.log(e);
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.files[0];
            return updatedForm;
        });
    };

    const handleFormSubmit = e => {
        setLoading(prevLoading => true);
        e.persist();
        e.preventDefault();
        const data = new FormData();
        data.append('contract_state_id', props.contract_state_id);
        data.append('document_id', props.document_id);
        data.append('user_id', getLoggedInUser().id);
        data.append('source', form[props.document_id].value);
        apiAuth
            .post('/contract/document', data)
            .then(res => {
                console.log(res);
                setLoading(prevLoading => false);
                props.reloadDocuments();
            })
            .catch(err => {
                setLoading(prevLoading => false);
                props.reloadDocuments();
            });
    };

    const SubmitComponent = () => {
        return (
            <>
                {loading ? (
                    <Spinner className="m-2" type="grow" color="success" />
                ) : (
                    <Button color="success" type="submit">
                        Add
                    </Button>
                )}
            </>
        );
    };

    const handleDownload = () => {
        apiAuth
            .get(
                `contract/document/download?source=${props.source.String}&region=${props.s3region.String}&bucket=${props.s3bucket.String}`, {responseType: 'arraybuffer'}
            )
            .then(res => {
                const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', `${props.source.String.substr(10)}`);
                document.body.appendChild(fileLink);

                fileLink.click();
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            {props.source.Valid === true ? (
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <Label for="question">{props.document_name}</Label>
                            </Col>
                            <Col md={2}>
                                <Badge color="success">
                                    {props.source.String.substr(props.source.String.lastIndexOf('.') + 1).toUpperCase()}
                                </Badge>
                            </Col>
                            <Col md={6}>
                                <Button onClick={handleDownload} color="primary" size="sm">
                                    Download
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={handleFormSubmit}>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="document">{props.document_name}</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <FileInput
                                                {...form[props.document_id]}
                                                name={props.document_id}
                                                handleOnChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <SubmitComponent />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

const ContractStateQuestions = ({ id }) => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = () => {
        apiAuth
            .get(`/contract/work/questions/${id}`)
            .then(res => {
                setQuestions(oldQuestions => res.data);
            })
            .catch(err => {});
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Questions</h4>
                {questions.map(question => (
                    <Row key={question.question_id}>
                        <Col key={question.question_id} md={12}>
                            <ContractStateQuestion
                                key={question.question_id}
                                {...question}
                                reloadQuestions={loadQuestions}
                            />
                            <br />
                        </Col>
                    </Row>
                ))}
            </CardBody>
        </Card>
    );
};

const ContractStateDocuments = ({ id }) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = () => {
        apiAuth
            .get(`/contract/work/documents/${id}`)
            .then(res => {
                console.log(res);
                setDocuments(oldDocuments => res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Documents</h4>
                {documents.map(document => (
                    <Row key={document.document_id}>
                        <Col key={document.document_id} md={12}>
                            <ContractStateDocument
                                key={document.document_id}
                                {...document}
                                reloadDocuments={loadDocuments}
                            />
                            <br />
                        </Col>
                    </Row>
                ))}
            </CardBody>
        </Card>
    );
};

export default ({ match }) => {
    const id = match.params.id;
    return (
        <React.Fragment>
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
                <Col md={6}>
                    <ContractStateQuestions id={id} />
                </Col>
                <Col md={6}>
                    <ContractStateDocuments id={id} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
