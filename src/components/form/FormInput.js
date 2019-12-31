import React from 'react';
import { Input } from 'reactstrap';

export default props => {
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

export const FileInput = props => {
    return (
        <Input
            type={props.type}
            onChange={props.handleOnChange}
            name={props.name}
            required={props.required}
        />
    );
};
