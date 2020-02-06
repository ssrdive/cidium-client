import React from 'react';
import { Card, CardBody, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { ChevronDown } from 'react-feather';

export default ({ history }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Account Reports</h4>
                <UncontrolledDropdown className="d-inline">
                    <DropdownToggle color="info">
                        Reports{' '}
                        <i className="icon">
                            <ChevronDown></ChevronDown>
                        </i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => {
                                history.push(`/financials/chart-of-accounts`);
                            }}>
                            Chart of Accounts
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => {
                                history.push(`/financials/trial-balance`);
                            }}>
                            Trial Balance
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </CardBody>
        </Card>
    );
};
