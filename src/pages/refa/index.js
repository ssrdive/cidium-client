import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import RefaSearch from "../../components/refa/RefaSearch";

const RefaPage = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Refa', path: '/refa', active: true }]}
                        title={'Refa'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    {/*<RefaSearch {...props} selectSD={false} searchType={'archived'} />*/}
                </Col>
                <Col md={8}>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default RefaPage;