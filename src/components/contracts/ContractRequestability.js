import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Alert, Col, Card, CardBody, Form, FormGroup, Row, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import FormInput from '../form/FormInput';
import { TEXT_INPUT_OPTIONAL, DROPDOWN_DEFAULT } from '../../constants/formValues';
import { getLoggedInUser } from '../../helpers/authUtils';

import SubmitComponent from '../form/SubmitComponent';

export default ({ id, requestability, loadRequestability }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        state_id: DROPDOWN_DEFAULT,
        remarks: TEXT_INPUT_OPTIONAL,
    });

    useEffect(() => {
        console.log(requestability);
        if (requestability.transitionalble && requestability.states !== null) {
            setForm(prevForm => {
                const updatedForm = { ...prevForm, state_id: { ...prevForm.state_id } };
                updatedForm.state_id.value = requestability.states[0].id;
                updatedForm.state_id.options = requestability.states;
                return updatedForm;
            });
        }
    }, [requestability]);

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
                `/contract/request`,
                qs.stringify({
                    contract_id: id,
                    state_id: form.state_id.value,
                    remarks: form.remarks.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(res => {
                loadRequestability();
                setLoading(prevLoading => false);
            })
            .catch(err => {
                console.log(err);
                setLoading(prevLoading => true);
            });
    };

    const RequestForm = requestability.hasOwnProperty('transitionalble') ? (
        requestability.transitionalble === true ? (
            <>
                <Row>
                    <Col md={12}>
                        {requestability.rejected_requests !== null ? (
                            <Table>
                                <tbody>
                                    {requestability.rejected_requests.map((request, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{request.id}</td>
                                                <td>{request.user}</td>
                                                <td>{request.note.String}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        ) : null}
                        {requestability.states !== null ? (
                            <>
                                <Alert color="success">All required answers and documents are complete</Alert>
                                <Form onSubmit={handleFormSubmit}>
                                    <FormGroup>
                                        <FormInput {...form.state_id} name="state_id" handleOnChange={handleOnChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['remarks']}
                                            name="remarks"
                                            placeholder="Remarks"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <SubmitComponent loading={loading} name="Request" color="success" />
                                </Form>
                            </>
                        ) : (
                            <Alert color="primary">Current state cannot be requested for change</Alert>
                        )}
                    </Col>
                </Row>
            </>
        ) : (
            <Alert color="warning">{requestability.non_requestable_message}</Alert>
        )
    ) : <Spinner type="grow" color="primary" />;
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Requestability</h4>

                {RequestForm}
            </CardBody>
        </Card>
    );
};
