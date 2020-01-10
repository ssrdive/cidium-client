import React, { Component, useEffect } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

// import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';

import ContractDetails from '../../components/contracts/ContractDetails';

export default ({ match }) => {
    const id = match.params.id;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Work', path: '#', active: true },
                        ]}
                        title={'Contract Details'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Tabs id={id} />
                </Col>
            </Row>
        </>
    );
};

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: '1' };
        this.toggle = this.toggle.bind(this);
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    render() {
        const tabContents = [
            {
                id: '1',
                title: 'Summary',
                icon: 'uil-angle-double-left',
                component: () => {
                    return <ContractDetails id={this.props.id} />;
                },
            },
            {
                id: '2',
                title: 'Installments',
                icon: 'uil-angle-double-right',
                component: () => {
                    return null;
                },
            },
        ];

        return (
            <React.Fragment>
                <Row>
                    <Col lg={12}>
                        <Nav tabs>
                            {tabContents.map((tab, index) => {
                                return (
                                    <NavItem key={index}>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: this.state.activeTab === tab.id })}
                                            onClick={() => {
                                                this.toggle(tab.id);
                                            }}>
                                            <i className={classnames(tab.icon, 'd-sm-none', 'd-block', 'mr-1')}></i>
                                            <span className="d-none d-sm-block">{tab.title}</span>
                                        </NavLink>
                                    </NavItem>
                                );
                            })}
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            {tabContents.map((tab, index) => {
                                return (
                                    <TabPane tabId={tab.id} key={index}>
                                        <Row>
                                            <Col sm="12">
                                                <tab.component />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                );
                            })}
                        </TabContent>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
