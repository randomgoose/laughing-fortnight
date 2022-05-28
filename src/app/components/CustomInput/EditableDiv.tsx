import * as React from 'react';
import {Box, Input, useToast} from '@chakra-ui/react';
import {useRef} from 'react';

interface Props {
    value?: number | string;
    onChange?: (e: HTMLInputElement) => void;
    defaultValue?: number | string;
    onFinishEditing?: (value: string) => boolean | void;
    validate?: (value: string) => boolean;
    message?: string;
}

export default function EditableDiv({value, onFinishEditing, validate, message}: Props) {
    const [editing, setEditing] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);
    const [temp, setTemp] = React.useState(value + '');
    const ref = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    React.useEffect(() => {
        if (!mounted) {
            setMounted(true);
        } else {
            if (inputRef.current) {
                if (editing) {
                    inputRef.current.focus && inputRef.current.focus();
                } else {
                    inputRef.current.blur && inputRef.current.blur();
                    window.focus();
                }
            }
        }
    }, [editing, mounted]);

    const onFocus = () => {
        setEditing(true);
    };

    const onBlur = () => {
        finishEditing();
    };

    function finishEditing() {
        if (validate) {
            if (!validate(temp)) {
                toast({
                    title: 'Error',
                    description: message && message,
                    status: 'error',
                    isClosable: true,
                });
                setTemp(value + '');
                setEditing(false);
            } else {
                onFinishEditing && onFinishEditing(temp);
                setEditing(false);
                // setEditing(true);
            }
        } else {
            onFinishEditing && onFinishEditing(temp);
            setEditing(false);
        }
    }

    return (
        <Box ref={ref} p={2} borderWidth={1} borderStyle={'solid'} borderColor={editing ? 'blue.500' : 'white'}>
            <Input
                ref={inputRef}
                variant={'unstyled'}
                onFocus={onFocus}
                onBlur={onBlur}
                autoFocus
                value={temp}
                onChange={(e) => {
                    setTemp(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        finishEditing();
                    }
                }}
            />
        </Box>
    );
}
