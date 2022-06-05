import {Flex, PopoverTrigger, Box, PopoverContent, PopoverBody, IconButton, Popover, Select} from '@chakra-ui/react';
import * as React from 'react';
import {HexColorPicker, HexColorInput} from 'react-colorful';
import {FiMenu, FiMinus} from 'react-icons/fi';
import EditableDiv from '../CustomInput/EditableDiv';
import {Reorder, useDragControls} from 'framer-motion';

export default function ColorEntry({
    color,
    onChange,
    onDelete,
}: {
    color: {id: string; value: string};
    onChange: (newColor: string) => void;
    onDelete: () => void;
}) {
    const [format, setFormat] = React.useState('hex');
    const {value} = color;
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={color.id}
            key={color.id}
            style={{display: 'flex', alignItems: 'center', position: 'relative'}}
            role={'group'}
            dragListener={false}
            dragControls={dragControls}
        >
            <Box _groupHover={{opacity: 1}} opacity={0}>
                <FiMenu
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        transform: 'translate(-120%, -50%)',
                    }}
                    size={8}
                    onPointerDown={(event) => dragControls.start(event)}
                />
            </Box>
            <Popover trigger={'click'}>
                <PopoverTrigger>
                    <Box
                        flexShrink={0}
                        mr={0.5}
                        bg={value}
                        w={5}
                        h={5}
                        borderWidth={1}
                        borderStyle={'solid'}
                        borderColor={'gray.100'}
                        borderRadius={4}
                    />
                </PopoverTrigger>
                <PopoverContent w={'fit-content'}>
                    <PopoverBody w={'fit-content'} gridGap={2}>
                        <HexColorPicker color={value} onChange={onChange} />
                        <Flex>
                            <Select size={'xs'} onChange={(e) => setFormat(e.target.value)} value={format}>
                                <option value={'hex'}>Hex</option>
                                <option value={'rgb'}>RGB</option>
                            </Select>

                            <HexColorInput color={value} onChange={onChange} />
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <EditableDiv value={value} />
            <Flex>
                <IconButton
                    aria-label="delete"
                    icon={<FiMinus />}
                    ml={2}
                    variant={'ghost'}
                    size={'xs'}
                    onClick={onDelete}
                />
            </Flex>
        </Reorder.Item>
    );
}
