import React from 'react';
import {Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader} from '@chakra-ui/react';

interface WidgetProps {
    isOpen: boolean;
    position: {x: number; y: number};
    content: React.ReactNode;
    title: React.ReactNode;
    onClose?: () => void;
}

export default function Widget({isOpen, position, title, content, onClose}: WidgetProps) {
    return (
        <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            closeOnBlur={false}
            computePositionOnMount
        >
            <PopoverContent
                position={'absolute'}
                top={position.y}
                left={position.x}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <PopoverHeader>{title}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <div className={'flex flex-col gap-4'}>{content}</div>
                </PopoverBody>
            </PopoverContent>
            <PopoverHeader></PopoverHeader>
        </Popover>
    );
}
