import {Pie} from '@nivo/pie';
import cryptoRandomString from 'crypto-random-string';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {pieAtomFamily} from '../../atoms/pieAtomFamily';
import ColorScheme from './ColorScheme';
import {
    Box,
    Button,
    ButtonGroup,
    chakra,
    Flex,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Select,
    Stack,
} from '@chakra-ui/react';
import {IColorScheme} from '../../../types';
import {HexColorPicker} from 'react-colorful';
import {useApp} from '../../hooks/useApp';
import {FiChevronLeft, FiPlus} from 'react-icons/fi';
import {Editable, EditableInput, EditablePreview} from '@chakra-ui/react';

export function ColorSchemeSetting({
    colors,
    id,
    name,
    onChange,
}: IColorScheme & {
    onChange?: (color: string) => void;
    onRename?: (name: string) => void;
}) {
    const {addColor, setColor, setColorSchemeName, removeColor} = useApp();
    const [pie] = useAtom(pieAtomFamily({id: 'example__pie'}));
    const [colorFormat, setColorFormat] = React.useState('hex');

    return (
        <Box>
            <Editable defaultValue={name} onSubmit={(nextValue: string) => setColorSchemeName(id, nextValue)}>
                <EditablePreview />
                <EditableInput />
            </Editable>
            {colors.map((color: string, index: number) => (
                <Popover key={index}>
                    <PopoverTrigger>
                        <Button bg={color}></Button>
                    </PopoverTrigger>
                    <PopoverContent w={'fit-content'}>
                        <PopoverBody>
                            <Flex gridGap={1} mb={2}>
                                <Input
                                    value={color}
                                    w={'100%'}
                                    size={'sm'}
                                    onChange={(e) => {
                                        setColor(id, index, e.target.value);
                                    }}
                                />
                                <Select
                                    value={colorFormat}
                                    onChange={(e) => setColorFormat(e.target.value)}
                                    size={'sm'}
                                    w={160}
                                >
                                    <option value={'hex'}>Hex</option>
                                    <option value={'rgb'}>RGB</option>
                                </Select>
                            </Flex>
                            <HexColorPicker
                                style={{width: '100%'}}
                                color={color}
                                onChange={(color) => {
                                    onChange && onChange(color);
                                    setColor(id, index, color);
                                }}
                            />
                            <Button
                                w={'full'}
                                size={'sm'}
                                colorScheme={'red'}
                                mt={2}
                                onClick={() => {
                                    removeColor(id, index);
                                }}
                            >
                                Remove
                            </Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            ))}
            <IconButton
                icon={<FiPlus />}
                aria-label={'add color'}
                size={'sm'}
                onClick={() => {
                    addColor(id, '#000');
                }}
            />

            <Heading as={'h5'}>Preview</Heading>

            <Flex
                className={'ColorSchemeBuilder__Preview w-full h-96 bg-gray-50 border'}
                w="full"
                h={96}
                rounded={'lg'}
                align="center"
                justify="center"
            >
                <Pie {...pie} colors={colors.length > 0 ? colors : {scheme: 'nivo'}} />
            </Flex>
        </Box>
    );
}

export default function ColorSchemeBuilder({
    onCreateColorScheme,
    ...rest
}: {
    onCreateColorScheme?: (colorScheme: IColorScheme) => void;
} & Omit<ModalProps, 'children'>) {
    const {
        app: {colorSchemes, activeColorSchemeId},
        addColorScheme,
        setActiveColorSchemeId,
    } = useApp();
    const {t} = useTranslation();

    const activeColorScheme: IColorScheme = colorSchemes.find((scheme) => scheme.id === activeColorSchemeId);

    const title = activeColorScheme
        ? activeColorScheme && (
              <Flex alignItems={'center'} gridGap={2}>
                  <IconButton
                      bg={'white'}
                      size={'xs'}
                      icon={<FiChevronLeft />}
                      aria-label={'back'}
                      onClick={() => {
                          setActiveColorSchemeId('');
                      }}
                  />
                  {activeColorScheme.name}
                  <chakra.span color={'gray.500'}>(id: {activeColorScheme.id})</chakra.span>
              </Flex>
          )
        : t('Theme Builder');

    function createColorScheme(): IColorScheme {
        const id = cryptoRandomString({length: 16});
        const name = 'new color scheme';
        return {id, name, colors: []};
    }

    return (
        <Modal {...rest}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {activeColorScheme ? (
                        <ColorSchemeSetting {...activeColorScheme} />
                    ) : (
                        <div className={'ColorSchemeBuilder'}>
                            <div className={'ColorSchemeBuilder__SchemeList flex gap-2 mb-4'}>
                                {colorSchemes.map((scheme) => (
                                    <ColorScheme
                                        {...scheme}
                                        key={scheme.id}
                                        onClick={() => setActiveColorSchemeId(scheme.id)}
                                    />
                                ))}
                                <Button
                                    position={'relative'}
                                    borderStyle={'dashed'}
                                    rounded={'lg'}
                                    w={32}
                                    h={24}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    textAlign={'center'}
                                    flexDirection={'column'}
                                    overflow={'hidden'}
                                    transition={'all .2s'}
                                    cursor="pointer"
                                    onClick={() => {
                                        const scheme = createColorScheme();
                                        addColorScheme(scheme);
                                        setActiveColorSchemeId(scheme.id);
                                        onCreateColorScheme && onCreateColorScheme(scheme);
                                    }}
                                    whiteSpace={'initial'}
                                >
                                    <FiPlus />
                                    {t('Create a color scheme')}
                                </Button>
                            </div>

                            <Stack spacing={'8px'}></Stack>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup spacing={2}>
                        <Button>{t('Cancel')}</Button>
                        <Button>{t('Save')}</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
