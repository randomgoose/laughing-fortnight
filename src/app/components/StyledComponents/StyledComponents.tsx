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
