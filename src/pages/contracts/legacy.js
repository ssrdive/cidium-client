import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import NewContractLegacy from '../../components/contracts/NewContractLegacy';

const LegacyPage = ({ history }) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Legacy', path: '#', active: true },
                        ]}
                        title={'Legacy Contract'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewContractLegacy history={history} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default LegacyPage;