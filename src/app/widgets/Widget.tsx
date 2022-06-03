import * as React from 'react';
import {Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader} from '@chakra-ui/react';
import {useClickAway} from 'react-use';

interface WidgetProps {
    isOpen: boolean;
    position: {x: number; y: number};
    content: React.ReactNode;
    title: React.ReactNode;
    onClose?: () => void;
    onClickAway?: () => void;
}

export default function Widget({isOpen, position, title, content, onClose, onClickAway}: WidgetProps) {
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        onClickAway && onClickAway();
    });

    return (
        <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} closeOnBlur={true} computePositionOnMount>
            <PopoverContent
                ref={ref}
                position={'absolute'}
                top={position.y}
                left={position.x}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <PopoverHeader>{title}</PopoverHeader>
                <PopoverCloseButton onClick={onClose} />
                <PopoverBody>
                    <div className={'flex flex-col gap-4'}>{content}</div>
                </PopoverBody>
            </PopoverContent>
            <PopoverHeader></PopoverHeader>
        </Popover>
    );
}
