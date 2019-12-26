import React, { Component, useState, useEffect } from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Table,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { loadDropdownGeneric } from '../../helpers/form';

import PageTitle from '../../components/PageTitle';

import {
    TEXT_INPUT_REQUIRED,
    TEXT_INPUT_OPTIONAL,
    NUMBER_INPUT_REQUIRED,
    NUMBER_INPUT_OPTIONAL,
    DROPDOWN_DEFAULT,
} from '../../constants/formValues';

const ContractSearch = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Search</h4>

                <Form inline>
                    <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                        <Input type="text" name="email" id="exampleEmail4" placeholder="Search" required />
                    </FormGroup>
                    <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                        <Input type="select" name="select" id="exampleSelect">
                            <option>Status</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                        <Input type="select" name="select" id="exampleSelect">
                            <option>Recovery Officer</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                        <Input type="select" name="select" id="exampleSelect">
                            <option>Batch</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Search
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
};

const Commitments = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Commitments</h4>
                <Tabs />
            </CardBody>
        </Card>
    );
};

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

    /**
     * Toggle the tab
     */
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

const FormInput = props => {
    return (
        <>
            {props.type === 'select' ? (
                <Input type="select" name={props.name} onChange={props.handleOnChange}>
                    {props.options.map(option => {
                        return (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        );
                    })}
                </Input>
            ) : (
                <Input
                    type={props.type}
                    value={props.value}
                    onChange={props.handleOnChange}
                    name={props.name}
                    placeholder={props.placeholder}
                    required={props.required}
                />
            )}
        </>
    );
};

const NewContract = () => {
    const [form, setForm] = useState({
        chassis_number: TEXT_INPUT_REQUIRED,
        model: DROPDOWN_DEFAULT,
        price: NUMBER_INPUT_REQUIRED,
        downpayment: NUMBER_INPUT_OPTIONAL,
        customer_name: TEXT_INPUT_REQUIRED,
        customer_nic: TEXT_INPUT_REQUIRED,
        customer_address: TEXT_INPUT_REQUIRED,
        customer_contact: NUMBER_INPUT_REQUIRED,
        contract_type: DROPDOWN_DEFAULT,
        contract_batch: DROPDOWN_DEFAULT,
        institute: DROPDOWN_DEFAULT,
        institute_dealer: DROPDOWN_DEFAULT,
        liaison_name: TEXT_INPUT_OPTIONAL,
        liaison_comment: TEXT_INPUT_OPTIONAL,
        liaison_contact: NUMBER_INPUT_OPTIONAL,
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };    

    useEffect(() => {
        loadDropdownGeneric('model', 'model', setForm);
        loadDropdownGeneric('contract_type', 'contract_type', setForm);
        loadDropdownGeneric('contract_batch', 'contract_batch', setForm);
        loadDropdownGeneric('institute', 'institute', setForm);
        loadDropdownGeneric('institute_dealer', 'institute_dealer', setForm);
    }, []);

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        console.log(form)
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">New Contract</h4>

                <Row>
                    <Col lg={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col lg={6}>
                                    <Badge color="danger" className="mr-1">
                                        Article Details
                                    </Badge>
                                    <FormGroup>
                                        <FormInput
                                            {...form['chassis_number']}
                                            name="chassis_number"
                                            placeholder="Chassis Number"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Model</Label>
                                        <FormInput {...form['model']} name="model" handleOnChange={handleOnChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['price']}
                                            name="price"
                                            placeholder="Price"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['downpayment']}
                                            name="downpayment"
                                            placeholder="Downpayment"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <Badge color="primary" className="mr-1">
                                        Customer Details
                                    </Badge>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_name']}
                                            name="customer_name"
                                            placeholder="Customer Name"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_nic']}
                                            name="customer_nic"
                                            placeholder="Customer NIC"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_address']}
                                            name="customer_address"
                                            placeholder="Customer Address"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['customer_contact']}
                                            name="customer_contact"
                                            placeholder="Customer Contact"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <Badge color="info" className="mr-1">
                                        Contract Details
                                    </Badge>
                                    <FormGroup>
                                        <Label for="text">Contract Type</Label>
                                        <FormInput
                                            {...form['contract_type']}
                                            name="contract_type"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Contract Batch</Label>
                                        <FormInput
                                            {...form['contract_batch']}
                                            name="contract_batch"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <Badge color="success" className="mr-1">
                                        Reference Details
                                    </Badge>
                                    <FormGroup>
                                        <Label for="text">Institute</Label>
                                        <FormInput
                                            {...form['institute']}
                                            name="institute"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Institute Dealer</Label>
                                        <FormInput
                                            {...form['institute_dealer']}
                                            name="institute_dealer"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['liaison_name']}
                                            name="liaison_name"
                                            placeholder="Liaison Name"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['liaison_comment']}
                                            name="liaison_comment"
                                            placeholder="Liaison Comment"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            {...form['liaison_contact']}
                                            name="liaison_contact"
                                            placeholder="Liaison Contact"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <Button color="success" type="submit">
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const Contracts = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Contracts', path: '/contracts', active: true }]}
                        title={'Contracts'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ContractSearch />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Commitments />
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewContract />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Contracts;
