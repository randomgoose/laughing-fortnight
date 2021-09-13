import {useClickAway} from 'ahooks';
import {Button} from 'antd';
import * as React from 'react';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';

interface ColorPickerProps {
    color?: RGBColor;
    onChange?: (color: ColorResult, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorPicker({color, onChange}: ColorPickerProps) {
    const [visible, setVisible] = React.useState(false);

    const {r, g, b} = color;
    const ref = React.useRef(null);

    useClickAway(() => setVisible(false), ref);

    return (
        <div className={'ColorPicker__wrapper'} ref={ref} style={{position: 'relative', width: 'fit-content'}}>
            <Button onClick={() => setVisible(true)}>
                <div
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        background: `rgba(${r}, ${g}, ${b})`,
                    }}
                ></div>
            </Button>
            {visible ? (
                <SketchPicker
                    color={color}
                    onChange={onChange}
                    styles={{
                        default: {
                            picker: {
                                position: 'absolute',
                                right: 0,
                                zIndex: 999,
                            },
                        },
                    }}
                />
            ) : null}
        </div>
    );
}
