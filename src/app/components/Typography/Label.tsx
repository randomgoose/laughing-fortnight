import * as React from 'react';

export default (props: {children: string}) => (
    <span style={{lineHeight: '20px', fontSize: 12, width: '100%'}}>{props.children}</span>
);
