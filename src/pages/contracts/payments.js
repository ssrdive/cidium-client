import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Card, Spinner, Row, Col, Form, Button, FormGroup, CardBody, UncontrolledAlert } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { getLoggedInUser } from '../../helpers/authUtils';
import { NUMBER_INPUT_REQUIRED, TEXTAREA_INPUT_OPTIONAL } from '../../constants/formValues';
import PageTitle from '../../components/PageTitle';
import FormInput from '../../components/form/FormInput';
import ContractDetails from '../../components/payments/ContractDetails';

const OneTimePayment = ({ id, valid }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">One Time Payment</h4>
            </CardBody>
        </Card>
    );
};

const DebitNote = ({ id, valid }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Debit Note</h4>
            </CardBody>
        </Card>
    );
};

const ReceiptForm = ({ valid, id }) => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        amount: NUMBER_INPUT_REQUIRED,
        notes: TEXTAREA_INPUT_OPTIONAL,
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
        setSubmitStatus({ status: null, message: '' });
        e.persist();
        e.preventDefault();
        if (!valid) return;
        apiAuth
            .post(
                '/contract/receipt',
                qs.stringify({
                    cid: id,
                    amount: form.amount.value,
                    notes: form.notes.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Receipt issued with number ${response.data}` });
                // setTimeout(() => {
                //     history.push(`/contracts/work/${response.data}`);
                // }, 1000);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'failure', message: 'Something went wrong' });
            });
    };

    const SubmitComponent = () => {
        return (
            <>
                {submitStatus.status !== null ? (
                    submitStatus.status === 'success' ? (
                        <UncontrolledAlert color="success">{submitStatus.message}</UncontrolledAlert>
                    ) : (
                        <UncontrolledAlert color="warning">{submitStatus.message}</UncontrolledAlert>
                    )
                ) : null}
                {loading ? (
                    <Spinner className="m-2" type="grow" color="success" />
                ) : (
                    <Button color="success" type="submit">
                        Issue Receipt
                    </Button>
                )}
            </>
        );
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Create Receipt</h4>
                <Row>
                    <Col>
                        {valid ? (
                            <>
                                <Row>
                                    <Col md={12}>
                                        <Form onSubmit={handleFormSubmit}>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['amount']}
                                                    name="amount"
                                                    placeholder="Amount"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['notes']}
                                                    name="notes"
                                                    placeholder="Notes"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <SubmitComponent />
                                        </Form>
                                    </Col>
                                </Row>
                            </>
                        ) : null}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const LegacyReceiptForm = ({ valid, id }) => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        amount: NUMBER_INPUT_REQUIRED,
        notes: TEXTAREA_INPUT_OPTIONAL,
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
        setSubmitStatus({ status: null, message: '' });
        e.persist();
        e.preventDefault();
        if (!valid) return;
        apiAuth
            .post(
                '/contract/receipt/legacy',
                qs.stringify({
                    cid: id,
                    amount: form.amount.value,
                    notes: form.notes.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Receipt issued with number ${response.data}` });
                // setTimeout(() => {
                //     history.push(`/contracts/work/${response.data}`);
                // }, 1000);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'failure', message: 'Something went wrong' });
            });
    };

    const SubmitComponent = () => {
        return (
            <>
                {submitStatus.status !== null ? (
                    submitStatus.status === 'success' ? (
                        <UncontrolledAlert color="success">{submitStatus.message}</UncontrolledAlert>
                    ) : (
                        <UncontrolledAlert color="warning">{submitStatus.message}</UncontrolledAlert>
                    )
                ) : null}
                {loading ? (
                    <Spinner className="m-2" type="grow" color="success" />
                ) : (
                    <Button color="success" type="submit">
                        Issue Receipt
                    </Button>
                )}
            </>
        );
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Create Legacy Receipt</h4>
                <Row>
                    <Col>
                        {valid ? (
                            <>
                                <Row>
                                    <Col md={12}>
                                        <Form onSubmit={handleFormSubmit}>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['amount']}
                                                    name="amount"
                                                    placeholder="Amount"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['notes']}
                                                    name="notes"
                                                    placeholder="Notes"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <SubmitComponent />
                                        </Form>
                                    </Col>
                                </Row>
                            </>
                        ) : null}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const SelectContractForm = ({ setID }) => {
    const [form, setForm] = useState({
        id: NUMBER_INPUT_REQUIRED,
    });

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        setID(prevID => form.id.value);
    };
    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Contract ID</h4>

                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <FormInput {...form['id']} name="id" placeholder="ID" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Select
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default ({ location }) => {
    const params = new URLSearchParams(location.search);
    const urlID = params.get('id');
    const [id, setID] = useState(urlID);
    const [valid, setValid] = useState(false);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (id === 0) return;
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/details/${id}`)
                .then(res => {
                    setDetails(prevDetails => res.data);
                    setValid(true);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    }, [id]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Payments', path: '/payments', active: true }]}
                        title={'Payments'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <ContractDetails valid={valid} details={details} />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <SelectContractForm setID={setID} />
                </Col>
                <Col md={4}>
                    <ReceiptForm id={id} valid={valid} />
                </Col>
                <Col md={4}>
                    <OneTimePayment />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <DebitNote />
                </Col>
                <Col md={4}>
                    <LegacyReceiptForm id={id} valid={valid} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
