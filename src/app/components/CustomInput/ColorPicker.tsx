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

    const ref = React.useRef(null);

    useClickAway(() => setVisible(false), ref);

    return (
        <div className={'ColorPicker__wrapper z-50'} ref={ref} style={{position: 'relative', width: 'fit-content'}}>
            <Button onClick={() => setVisible(true)}>
                <div
                    className={'w-3 h-3 rounded-sm'}
                    style={{
                        background: typeof color === 'string' ? color : `rgba(${color?.r}, ${color?.g}, ${color?.b})`,
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
                                top: 32,
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
