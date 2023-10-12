import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import ContractDetails from './ContractDetails';
import ContractInstallments from './ContractInstallments';
import ContractReceipts from './ContractReceipts';
import ContractCommitments from './ContractCommitments';
import ContractQuestions from './ContractQuestions';
import ContractDocuments from './ContractDocuments';
import ContractHistory from './ContractHistory';
import Dev from './Dev';
import ContractTimeline from "./ContractTimeline";

class DetailsTabs extends Component {
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
                    return <ContractDetails id={this.props.id} setValid={ (dummyValue) => {} } />;
                },
            },
            {
                id: '2',
                title: 'Timeline',
                icon: 'uil-money-stack',
                component: () => {
                    return <ContractTimeline id={this.props.id} />;
                },
            },
            {
                id: '3',
                title: 'Installments',
                icon: 'uil-money-stack',
                component: () => {
                    return <ContractInstallments id={this.props.id} />;
                },
            },
            {
                id: '4',
                title: 'Receipts',
                icon: 'uil-receipt',
                component: () => {
                    return <ContractReceipts id={this.props.id} />;
                },
            },
            {
                id: '5',
                title: 'Commitments',
                icon: 'uil-comment-message',
                component: () => {
                    return <ContractCommitments id={this.props.id} />;
                },
            },
            {
                id: '6',
                title: 'Questions',
                icon: 'uil-comment-question',
                component: () => {
                    return <ContractQuestions id={this.props.id} />;
                },
            },
            {
                id: '7',
                title: 'Documents',
                icon: ' uil-document-layout-left',
                component: () => {
                    return <ContractDocuments id={this.props.id} />;
                },
            },
            {
                id: '8',
                title: 'History',
                icon: 'uil-history',
                component: () => {
                    return <ContractHistory id={this.props.id} />;
                },
            },
            {
                id: '9',
                title: 'Dev',
                icon: 'uil-trowel',
                component: () => {
                    return <Dev id={this.props.id} />;
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

export default DetailsTabs;