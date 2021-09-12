import {Button} from 'antd';
import * as React from 'react';
import {Color, ColorResult, SketchPicker} from 'react-color';

interface ColorPickerProps {
    color?: Color;
    onChange?: (color: ColorResult, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorPicker({color, onChange}: ColorPickerProps) {
    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <Button onClick={() => setVisible(true)}></Button>
            {visible ? <SketchPicker color={color} onChange={onChange} /> : null}
        </>
    );
}
