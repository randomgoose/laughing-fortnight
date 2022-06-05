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
    Editable,
    EditablePreview,
    EditableInput,
} from '@chakra-ui/react';
import {useAtom} from 'jotai';
import {
    addColorSchemeAtom,
    ColorSchemeAtom,
    colorSchemeAtoms,
    colorSchemeFamily,
    deleteColorSchemeAtom,
    saveColorScheme,
} from '../../atoms/colors';
import {FiChevronLeft, FiEdit, FiMoreHorizontal, FiPlus, FiTrash, FiDroplet} from 'react-icons/fi';
import {Empty} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import ColorEntry from './ColorEntry';
import {useImmerAtom} from 'jotai/immer';
import {Reorder} from 'framer-motion';

export default function ThemePanel() {
    const [atoms] = useAtom(colorSchemeAtoms);
    const [, add] = useAtom(addColorSchemeAtom);
    const [activeAtom, setActiveAtom] = React.useState<ColorSchemeAtom | null>(null);

    const selectAtom = (atom: ColorSchemeAtom) => setActiveAtom(atom);

    const addAtom = () => {
        const schemeAtom = colorSchemeFamily({id: cryptoRandomString({length: 12})}) as ColorSchemeAtom;
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
    const [scheme, setScheme] = useAtom(atom);
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
            _notLast={{mb: 0.5}}
            onDoubleClick={onEditHandler}
            _hover={{
                background: 'gray.100',
            }}
        >
            <FiDroplet style={{marginRight: 4}} />
            <Editable
                w={'full'}
                defaultValue={scheme.name}
                onSubmit={(nextValue) => setScheme((prev) => ({...prev, name: nextValue}))}
            >
                <EditablePreview />
                <EditableInput rounded={'sm'} />
            </Editable>
            {menu}
        </Flex>
    );
}

function ColorSchemeEditor({atom, onClose}: {atom: ColorSchemeAtom; onClose: (atom) => void}) {
    const [scheme, setScheme] = useImmerAtom(atom);

    const setColor = (id: string, newColor: string) => {
        setScheme((draft) => {
            const color = draft.colors.find((color) => color.id === id);
            color && (color.value = newColor);
        });
    };

    const deleteColor = (index) => {
        setScheme((scheme) => ({...scheme, colors: scheme.colors.filter((_color, i) => i !== index)}));
    };

    React.useEffect(() => {
        saveColorScheme({
            id: scheme.id,
            colors: scheme.colors,
            name: scheme.name,
        });
    }, [scheme.colors, scheme.name]);

    const colorList = (
        <Reorder.Group
            values={scheme.colors.map((color) => color.id)}
            onReorder={(newOrder) => {
                setScheme((draft) => {
                    draft.colors = newOrder.map((id) => {
                        const color = scheme.colors.find((color) => color.id === id);
                        if (color) {
                            return color;
                        } else {
                            return {id, value: '#ffffff'};
                        }
                    });
                });
            }}
        >
            {scheme.colors.map((color, index) => (
                <ColorEntry
                    color={color}
                    key={color.id}
                    onChange={(newColor) => {
                        setColor(color.id, newColor);
                    }}
                    onDelete={() => deleteColor(index)}
                />
            ))}
        </Reorder.Group>
    );

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
                            setScheme((prev) => ({
                                ...prev,
                                colors: [...prev.colors, {id: cryptoRandomString({length: 12}), value: '#ffffff'}],
                            }));
                        }}
                        aria-label={'add color scheme'}
                    />
                </Flex>
                {colorList}
            </Box>
        </Box>
    );
}
