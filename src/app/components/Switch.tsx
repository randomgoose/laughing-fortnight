import * as React from 'react';
import {ChangeEvent} from 'react';
import styled from 'styled-components';
const StyledLabel = styled.label`
    display: inline-block;
    width: 32px;
    height: 16px;
    background-color: ${(props: {checked: boolean}) => (props.checked ? '#00BCD4' : '#e5e6eb')};
    border: 1px solid ${(props: {checked: boolean}) => (props.checked ? '#00BCD4' : '#e5e6eb')};
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        background-color: white;
        top: 50%;
        left: ${(props: {checked: boolean}) => (props.checked ? '16px' : '2px')};
        border-radius: 100px;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        transition: all 0.3s;
    }
`;
const StyledInput = styled.input`
    visibility: hidden;
    position: absolute;
`;

export default function Switch({
    checked,
    onChange,
    id,
}: {
    checked: boolean;
    onChange: (value: boolean, e: ChangeEvent<HTMLInputElement>) => void;
    id: string;
}) {
    return (
        <>
            <StyledLabel checked={checked} htmlFor={id}></StyledLabel>
            <StyledInput
                type={'checkbox'}
                checked={checked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.checked, e);
                }}
                id={id}
            />
        </>
    );
}
