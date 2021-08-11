import * as React from 'react';
import {FcPuzzle} from 'react-icons/fc';

export default function Gallery() {
    return (
        <div className={'Gallery'} style={{padding: 16}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <FcPuzzle style={{marginRight: 8}} />
                <span style={{fontSize: 16, lineHeight: 1.5, fontWeight: 'bold'}}>Gallery</span>
            </div>
            <div>Axes</div>
        </div>
    );
}
