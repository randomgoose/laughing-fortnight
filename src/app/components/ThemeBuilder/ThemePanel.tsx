import * as React from 'react';
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
} from '@chakra-ui/react';
import {atom, useAtom} from 'jotai';
import {
    addColorSchemeAtom,
    ColorSchemeAtom,
    colorSchemeAtoms,
    deleteColorSchemeAtom,
    saveColorScheme,
} from '../../atoms/colors';
import {FiChevronLeft, FiEdit, FiMinus, FiMoreHorizontal, FiPlus, FiTrash} from 'react-icons/fi';
import {Empty} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import EditableDiv from '../CustomInput/EditableDiv';
import {HexColorPicker} from 'react-colorful';

export default function ThemePanel() {
    const [atoms] = useAtom(colorSchemeAtoms);
    const [, add] = useAtom(addColorSchemeAtom);
    const [activeAtom, setActiveAtom] = React.useState<ColorSchemeAtom | null>(null);

    const selectAtom = (atom: ColorSchemeAtom) => setActiveAtom(atom);
    const addAtom = () => {
        const schemeAtom = atom({
            id: cryptoRandomString({length: 12}),
            name: 'new scheme',
            colors: ['#000'],
        });
        add(schemeAtom);
    };

    const schemeList =
        atoms.length > 0 ? (
            atoms.map((schemeAtom) => (
                <ColorSchemeEntry atom={schemeAtom} onSelect={selectAtom} onEdit={selectAtom} key={`${schemeAtom}`} />
            ))
        ) : (
            <Empty description={'No custom color schemes'} />
        );

    return (
        <Box w={'full'} h={'full'}>
            {!activeAtom ? (
                <>
                    <Flex py={2} pl={3} pr={2} justify={'space-between'} align={'center'} mb={1}>
                        <Heading as={'h5'}>Color Schemes</Heading>
                        <IconButton
                            icon={<FiPlus size={16} />}
                            size={'xs'}
                            variant={'ghost'}
                            onClick={addAtom}
                            aria-label={'add color scheme'}
                        />
                    </Flex>
                    <Box px={1}>{schemeList}</Box>
                </>
            ) : (
                <ColorSchemeEditor
                    atom={activeAtom}
                    onClose={() => {
                        setActiveAtom(null);
                    }}
                />
            )}
        </Box>
    );
}

function ColorSchemeEntry({
    atom,
    onSelect,
    onEdit,
}: {
    atom: ColorSchemeAtom;
    onSelect: (atom: ColorSchemeAtom) => void;
    onEdit: (atom: ColorSchemeAtom) => void;
}) {
    const [scheme] = useAtom(atom);
    const [, del] = useAtom(deleteColorSchemeAtom);

    const onEditHandler = () => {
        onEdit(atom);
    };
    const onSelectHandler = () => {
        console.log(onSelect);
    };

    const menu = (
        <Menu>
            <MenuButton
                onClick={(e) => {
                    e.stopPropagation();
                }}
                as={IconButton}
                size={'xs'}
                icon={<FiMoreHorizontal />}
                aria-label={'more'}
                variant={'ghost'}
            />
            <MenuList py={1} px={1} minW={0}>
                <MenuItem px={2} rounded={3} alignItems={'center'} onClick={onEditHandler}>
                    <FiEdit style={{marginRight: 4}} />
                    Edit color scheme
                </MenuItem>
                <MenuItem
                    px={2}
                    rounded={3}
                    alignItems={'center'}
                    onClick={(e) => {
                        e.stopPropagation();
                        del(atom);
                    }}
                >
                    <FiTrash style={{marginRight: 4}} />
                    Delete color scheme
                </MenuItem>
            </MenuList>
        </Menu>
    );

    return (
        <Flex
            py={1}
            pl={2}
            pr={1}
            align={'center'}
            borderRadius={4}
            cursor={'pointer'}
            onClick={onSelectHandler}
            _notLast={{mb: 1}}
            justify={'space-between'}
            onDoubleClick={onEditHandler}
            _hover={{
                background: 'gray.100',
            }}
        >
            {scheme.name}
            {menu}
        </Flex>
    );
}

function ColorSchemeEditor({atom, onClose}: {atom: ColorSchemeAtom; onClose: (atom) => void}) {
    const [scheme, setScheme] = useAtom(atom);

    const setColor = (index: number, color: string) => {
        setScheme((prev) => {
            const {colors} = prev;
            const newColors = [...colors];
            newColors.splice(index, 1, color);
            return {
                ...prev,
                colors: newColors,
            };
        });
    };

    React.useEffect(() => {
        saveColorScheme({
            id: scheme.id,
            colors: scheme.colors,
            name: scheme.name,
        });
    }, [scheme.colors, scheme.name]);

    const colorList = scheme.colors.map((color, index) => (
        <Flex key={index} align={'center'}>
            <Popover trigger={'click'}>
                <PopoverTrigger>
                    <Box
                        flexShrink={0}
                        mr={0.5}
                        bg={color}
                        w={5}
                        h={5}
                        borderWidth={1}
                        borderStyle={'solid'}
                        borderColor={'gray.100'}
                        borderRadius={4}
                    />
                </PopoverTrigger>
                <PopoverContent w={'fit-content'}>
                    <PopoverBody w={'fit-content'}>
                        <HexColorPicker
                            onChange={(newColor) => {
                                setColor(index, newColor);
                            }}
                        />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <EditableDiv value={color} />
            <IconButton aria-label="delete" icon={<FiMinus />} ml={2} variant={'ghost'} size={'xs'} />
        </Flex>
    ));

    return (
        <Box>
            <Flex align={'center'} borderBottom={'1px'} borderColor={'gray.100'} p={2}>
                <IconButton
                    mr={1}
                    aria-label={'back'}
                    icon={<FiChevronLeft size={16} />}
                    size={'xs'}
                    variant={'ghost'}
                    onClick={onClose}
                />
                <Heading as={'h5'}>{scheme.name}</Heading>
            </Flex>

            <Box py={2} px={3}>
                <Flex justify={'space-between'} align={'center'}>
                    <Heading as={'h5'}>Colors</Heading>
                    <IconButton
                        ml={'auto'}
                        icon={<FiPlus />}
                        size={'xs'}
                        variant={'ghost'}
                        onClick={() => {
                            setScheme((prev) => ({...prev, colors: [...prev.colors, '#fff']}));
                        }}
                        aria-label={'add color scheme'}
                    />
                </Flex>
                {colorList}
            </Box>
        </Box>
    );
}
