import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

// import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import ContractDetails from '../../components/contracts/ContractDetails';
import ContractInstallments from '../../components/contracts/ContractInstallments';
import ContractQuestions from '../../components/contracts/ContractQuestions';
import ContractDocuments from '../../components/contracts/ContractDocuments';
import ContractHistory from '../../components/contracts/ContractHistory';

export default ({ match }) => {
    const id = match.params.id;

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Details', path: '#', active: true },
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
                icon: ' uil-database-alt',
                component: () => {
                    return <ContractDetails id={this.props.id} />;
                },
            },
            {
                id: '2',
                title: 'Installments',
                icon: 'uil-money-stack',
                component: () => {
                    return <ContractInstallments id={this.props.id} />;
                },
            },
            {
                id: '3',
                title: 'Questions',
                icon: 'uil-comment-question',
                component: () => {
                    return <ContractQuestions id={this.props.id} />;
                },
            },
            {
                id: '4',
                title: 'Documents',
                icon: ' uil-document-layout-left',
                component: () => {
                    return <ContractDocuments id={this.props.id} />;
                },
            },
            {
                id: '5',
                title: 'History',
                icon: 'uil-history',
                component: () => {
                    return <ContractHistory id={this.props.id} />;
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
