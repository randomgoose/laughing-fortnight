import {Collapse, Tabs} from 'antd';
import styled from 'styled-components';

export const StyledTabPane = styled(Tabs.TabPane)`
    padding: 12px !important;
    width: 100%;
`;

export const StyledCollapsePanel = styled(Collapse.Panel)`
    padding: 0;

    & > div {
        padding: 8px 0 !important;
    }
`;

export const Handle = styled.div`
    width: ${(props) =>
        props.pos === 'left' || props.pos === 'right' ? `${4 / props.scale}px` : `${24 / props.scale}px`};
    height: ${(props) =>
        props.pos === 'top' || props.pos === 'bottom' ? `${4 / props.scale}px` : `${24 / props.scale}px`};
    border-radius: 10000px;
    border: ${(props) => 1 / props.scale}px solid red;
    background: pink;
    position: absolute;
    top: ${(props) => (props.pos === 'left' || props.pos === 'right' ? '50% !important' : '')};
    left: ${(props) => (props.pos === 'top' || props.pos === 'bottom' ? '50% !important' : '')};
    transform: translateY(-50%);
    opacity: ${(props) => (props.hovering ? 1 : 0)};
    transition: opacity 0.2s;
`;
