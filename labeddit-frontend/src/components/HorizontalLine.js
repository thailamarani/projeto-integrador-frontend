import styled from 'styled-components';

const Hl = styled.hr`
    width: 100%;
    margin: 1rem 0;
    height: 1px;
    border: 0;
    background-color: #fe727f;
`;

export default function HorizontalLine() {
    return (
        <Hl />
    );
}