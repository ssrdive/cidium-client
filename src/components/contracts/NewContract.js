import React, { useState, useEffect } from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Button,
    Spinner,
    UncontrolledAlert,
} from 'reactstrap';
import FormInput from '../form/FormInput';
import qs from 'qs';
import { apiAuth } from '../../cidium-api';
import { loadDropdownGeneric } from '../../helpers/form';

import { getLoggedInUser } from '../../helpers/authUtils';

import {
    TEXT_INPUT_REQUIRED,
    TEXT_INPUT_OPTIONAL,
    NUMBER_INPUT_REQUIRED,
    NUMBER_INPUT_OPTIONAL,
    DROPDOWN_DEFAULT,
} from '../../constants/formValues';

const NewContract = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });

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
                        Add
                    </Button>
                )}
            </>
        );
    };

    const [form, setForm] = useState({
        chassis_number: TEXT_INPUT_REQUIRED,
        model_id: DROPDOWN_DEFAULT,
        price: NUMBER_INPUT_REQUIRED,
        downpayment: NUMBER_INPUT_OPTIONAL,
        customer_name: TEXT_INPUT_REQUIRED,
        customer_nic: TEXT_INPUT_REQUIRED,
        customer_address: TEXT_INPUT_REQUIRED,
        customer_contact: NUMBER_INPUT_REQUIRED,
        contract_type_id: DROPDOWN_DEFAULT,
        contract_batch_id: DROPDOWN_DEFAULT,
        recovery_officer_id: DROPDOWN_DEFAULT,
        institute_id: DROPDOWN_DEFAULT,
        institute_dealer_id: DROPDOWN_DEFAULT,
        liaison_name: TEXT_INPUT_OPTIONAL,
        liaison_comment: TEXT_INPUT_OPTIONAL,
        liaison_contact: NUMBER_INPUT_OPTIONAL,
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    useEffect(() => {
        loadDropdownGeneric('model', 'model_id', setForm);
        loadDropdownGeneric('contract_type', 'contract_type_id', setForm);
        loadDropdownGeneric('contract_batch', 'contract_batch_id', setForm);
        loadDropdownGeneric('institute', 'institute_id', setForm);
        loadDropdownGeneric('institute_dealer', 'institute_dealer_id', setForm);
        loadDropdownGeneric('user', 'recovery_officer_id', setForm)
    }, []);

    const handleFormSubmit = e => {
        setLoading(prevLoading => true);
        setSubmitStatus({status: null, message: ''});
        e.persist();
        e.preventDefault();
        const formValues = {};
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                formValues[key] = form[key].value;
            }
        }
        apiAuth
            .post('/contract/new', qs.stringify({ ...formValues, user_id: getLoggedInUser().id }))
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Contract added with number ${response.data}` });
                setTimeout(() => {
                    history.push(`/contracts/work/${response.data}`);
                }, 1000)
            })
            .catch(err => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'failure', message: 'Something went wrong' });
            });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">New Contract</h4>

                <Row>
                    <Col lg={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col lg={6}>
                                    <Badge color="danger" className="mr-1">
                                        Article Details
                                    </Badge>
                                    <FormGroup>
                                        <FormInput
                                            {...form['chassis_number']}
                                            name="chassis_number"
                                            placeholder="Chassis Number"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Model</Label>
                                        <FormInput
                                            {...form['model_id']}
                                            name="model_id"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['price']}
                                            name="price"
                                            placeholder="Price"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['downpayment']}
                                            name="downpayment"
                                            placeholder="Downpayment"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <Badge color="primary" className="mr-1">
                                        Customer Details
                                    </Badge>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_name']}
                                            name="customer_name"
                                            placeholder="Customer Name"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_nic']}
                                            name="customer_nic"
                                            placeholder="Customer NIC"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_address']}
                                            name="customer_address"
                                            placeholder="Customer Address"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_contact']}
                                            name="customer_contact"
                                            placeholder="Customer Contact"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <Badge color="info" className="mr-1">
                                        Contract Details
                                    </Badge>
                                    <FormGroup>
                                        <Label for="text">Contract Type</Label>
                                        <FormInput
                                            {...form['contract_type_id']}
                                            name="contract_type_id"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Contract Batch</Label>
                                        <FormInput
                                            {...form['contract_batch_id']}
                                            name="contract_batch_id"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Recovery Officer</Label>
                                        <FormInput
                                            {...form['recovery_officer_id']}
                                            name="recovery_officer_id"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <Badge color="success" className="mr-1">
                                        Reference Details
                                    </Badge>
                                    <FormGroup>
                                        <Label for="text">Institute</Label>
                                        <FormInput
                                            {...form['institute_id']}
                                            name="institute_id"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Institute Dealer</Label>
                                        <FormInput
                                            {...form['institute_dealer_id']}
                                            name="institute_dealer_id"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['liaison_name']}
                                            name="liaison_name"
                                            placeholder="Liaison Name"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['liaison_comment']}
                                            name="liaison_comment"
                                            placeholder="Liaison Comment"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['liaison_contact']}
                                            name="liaison_contact"
                                            placeholder="Liaison Contact"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <SubmitComponent />
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default NewContract;