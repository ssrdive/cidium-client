import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import ArchivedSearch from "../../components/archived/ArchivedSearch";

const ContractsPage = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Archived', path: '/archived', active: true }]}
                        title={'Archived'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <ArchivedSearch {...props} selectSD={false} searchType={'archived'} />
                </Col>
                <Col md={8}>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ContractsPage;