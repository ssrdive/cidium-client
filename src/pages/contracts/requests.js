import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { Button, Row, Col, Card, CardBody, Table, Form, Input, FormGroup } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { getLoggedInUser } from '../../helpers/authUtils';

import PageTitle from '../../components/PageTitle';
import SubmitComponent from '../../components/form/SubmitComponent';
import { TEXTAREA_INPUT_OPTIONAL } from '../../constants/formValues';

const ApprovalAction = ({ request, loadRequests, changeRequest }) => {
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const [form, setForm] = useState({
        note: TEXTAREA_INPUT_OPTIONAL
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };
    const sendAction = (e, action) => {
        action === "1" ? setApproveLoading(prev => true) : setRejectLoading(prev => true);
        e.persist();
        e.preventDefault();
        apiAuth
            .post(
                `/contract/request/action`,
                qs.stringify({ user: getLoggedInUser().id, request: request.request_id, action, note: form.note.value })
            )
            .then(res => {
                action === "1" ? setApproveLoading(prev => false) : setRejectLoading(prev => false);
                loadRequests();
                changeRequest(null);
            })
            .catch(err => {
                action === "1" ? setApproveLoading(prev => false) : setRejectLoading(prev => false);
                console.log(err);
            });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Approval Action</h4>
                {request === null ? (
                    <p className="sub-header">Select a request to take action</p>
                ) : (
                    <>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Contract</td>
                                    <Link to={'/contracts/work/' + request.contract_id}>
                                        <td>{request.contract_id}</td>
                                    </Link>
                                </tr>
                                <tr>
                                    <td>Contract State</td>
                                    <td>{request.contract_state}</td>
                                </tr>
                                <tr>
                                    <td>Request State</td>
                                    <td>
                                        <b>{request.to_contract_state}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Remarks</td>
                                    <td>{request.remarks.String}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Form>
                            <FormGroup>
                                <Input type="textarea" name="note" placeholder="Note" onChange={handleOnChange}></Input>
                            </FormGroup>
                            <SubmitComponent loading={approveLoading} onClick={(e) => sendAction(e, 1)} name="Approve" color="success" />&nbsp;
                            <SubmitComponent loading={rejectLoading} onClick={(e) => sendAction(e, 0)} name="Reject" color="danger" />
                        </Form>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

const Request = ({ request, changeRequest }) => {
    return (
        <tr>
            <td>
                <Button size="sm" onClick={() => changeRequest(request)} color="primary">
                    {request.request_id}
                </Button>
            </td>
            <Link to={'/contracts/work/' + request.contract_id}>
                <td>{request.contract_id}</td>
            </Link>
            <td>{request.customer_name}</td>
            <td>{request.contract_state}</td>
            <td>{request.to_contract_state}</td>
            <td>{request.requested_by}</td>
            <td>{request.requested_on}</td>
        </tr>
    );
};

const Requests = ({ requests, changeRequest }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Pending Requests</h4>
                <p className="sub-header">Following requests requires your approval</p>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Contract</th>
                            <th>Customer Name</th>
                            <th>State</th>
                            <th>Request State</th>
                            <th>Requested By</th>
                            <th>Requested On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => {
                            return <Request key={index} request={request} changeRequest={changeRequest} />;
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default () => {
    const [requests, setRequests] = useState([]);
    const [request, setRequest] = useState(null);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = () => {
        apiAuth
            .get(`/contract/requests/${getLoggedInUser().id}`)
            .then(res => {
                setRequests(prevRequets => (res.data === null ? [] : res.data));
            })
            .catch(err => {
                console.log(err);
            });
    };
    const changeRequest = request => {
        setRequest(oldRequest => request);
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Requests', path: '/requests', active: true }]}
                        title={'Requests'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ApprovalAction request={request} loadRequests={loadRequests} changeRequest={changeRequest} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Requests requests={requests} changeRequest={changeRequest} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
