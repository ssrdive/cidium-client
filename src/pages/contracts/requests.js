import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { getLoggedInUser } from '../../helpers/authUtils';

import PageTitle from '../../components/PageTitle';
import Requests from '../../components/requests/Requests';
import ApprovalAction from '../../components/requests/ApprovalAction';

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
