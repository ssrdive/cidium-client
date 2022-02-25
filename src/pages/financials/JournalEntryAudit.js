import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import JournalEntryAuditDetails from '../../components/financials/JournalEntryAuditDetails';

const JournalEntryAuditPage = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const entrydate = params.get('entrydate');
    const postingdate = params.get('postingdate');

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Journal Entry Audit', path: '#', active: true },
                        ]}
                        title={'Journal Entry Audit'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <JournalEntryAuditDetails entrydate={entrydate} postingdate={postingdate} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default JournalEntryAuditPage;