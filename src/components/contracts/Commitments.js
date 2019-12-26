import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Table,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import classnames from 'classnames';

const ExpiredCommitments = () => {
    return (
        <Table className="mb-0" striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Username</td>
                </tr>
            </tbody>
        </Table>
    );
};

const UpcomingCommitments = () => {
    return (
        <Table className="mb-0" striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Username</td>
                </tr>
            </tbody>
        </Table>
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
                title: 'Expired',
                icon: 'uil-angle-double-left',
                component: ExpiredCommitments,
            },
            {
                id: '2',
                title: 'Upcoming',
                icon: 'uil-angle-double-right',
                component: UpcomingCommitments,
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

export default () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Commitments</h4>
                <Tabs />
            </CardBody>
        </Card>
    );
};