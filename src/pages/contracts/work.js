import React, { useState, useEffect } from 'react';
import { Alert, Row, Badge, Col, Card, CardBody, Form, FormGroup, Label, Spinner, Button } from 'reactstrap';
import qs from 'qs';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import { TEXT_INPUT_REQUIRED, FILE_INPUT_REQUIRED } from '../../constants/formValues';
import FormInput, { FileInput } from '../../components/form/FormInput';
import { getLoggedInUser } from '../../helpers/authUtils';

const ContractRequests = ({ requestability }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Requests</h4>
                {requestability !== null ? (
                    <RequestForm />
                ) : null}
            </CardBody>
        </Card>
    );
};

const ContractDetails = ({ id }) => {
    const [details, setDetails] = useState(null);

    const fetchDetails = async () => {
        await apiAuth
            .get(`/contract/details/${id}`)
            .then(res => {
                setDetails(prevDetails => res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Contract Details</h4>

                {details !== null ? (
                    <>
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col md={6}>
                                        <h4>{details.customer_name}</h4>
                                    </Col>
                                    <Col md={3}>
                                        <h4>{details.model_name}</h4>
                                    </Col>
                                    <Col md={3}>
                                        <h4>{details.contract_batch}</h4>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Badge color="primary">Chassis Number</Badge> {details.chassis_number}
                            </Col>
                            <Col>
                                <Badge color="primary">Customer NIC</Badge> {details.customer_nic}
                            </Col>
                            <Col>
                                <Badge color="primary">Customer Address</Badge> {details.customer_address}
                            </Col>
                            <Col>
                                <Badge color="primary">Customer Contact</Badge> {details.customer_contact}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Badge color="primary">Liaison Name</Badge> {details.liaison_name.String}
                            </Col>
                            <Col>
                                <Badge color="primary">Liaison Contact</Badge> {details.liaison_contact.Int32}
                            </Col>
                            <Col>
                                <Badge color="primary">Price</Badge> {details.price}
                            </Col>
                            <Col>
                                <Badge color="primary">Downpayment</Badge> {details.downpayment.Int32}
                            </Col>
                        </Row>
                    </>
                ) : null}
            </CardBody>
        </Card>
    );
};

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
                    <Button size="sm" color="success" type="submit">
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
                setLoading(prevLoading => false);
                props.reloadDocuments();
            })
            .catch(err => {
                setLoading(prevLoading => false);
                props.reloadDocuments();
            });
    };

    const SubmitComponent = ({ color, name, onClick }) => {
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

    const handleDownload = () => {
        setLoading(prevLoading => true);
        apiAuth
            .get(
                `contract/document/download?source=${props.source.String}&region=${props.s3region.String}&bucket=${props.s3bucket.String}`,
                { responseType: 'arraybuffer' }
            )
            .then(res => {
                const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', `${props.source.String.substr(10)}`);
                document.body.appendChild(fileLink);

                fileLink.click();
                setLoading(prevLoading => false);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    };

    return (
        <>
            {props.source.Valid === true ? (
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={6}>
                                <Label for="question">{props.document_name}</Label>
                            </Col>
                            <Col md={2}>
                                <Badge color="success">
                                    {props.source.String.substr(props.source.String.lastIndexOf('.') + 1).toUpperCase()}
                                </Badge>
                            </Col>
                            <Col md={4}>
                                <SubmitComponent onClick={handleDownload} name="Download" color="primary" />
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
                                        <SubmitComponent onClick={() => {}} color="success" name="Add" />
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
    const [requestability, setRequestability] = useState();

    const loadRequestability = async () => {
        apiAuth
            .get(`/contract/requestability/${id}`)
            .then(res => {
                setRequestability(prevRequestability => res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        async function loadR() {
            await loadRequestability();
        }
        loadR();
    }, []);

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
                <Col md={8}>
                    <ContractDetails id={id} />
                </Col>
                <Col md={4}>
                    <ContractRequests requestability={requestability} />
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
