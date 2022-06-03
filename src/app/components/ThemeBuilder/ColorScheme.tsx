import * as React from 'react';
import {IconButton} from '@chakra-ui/button';
import {FiEdit} from 'react-icons/fi';
import {Box, Icon} from '@chakra-ui/react';
import {IColorScheme} from '../../../types';

export default function ColorScheme({
    name,
    colors,
    onClick,
    onEdit,
}: IColorScheme & {onClick?: () => void; onEdit?: () => void}) {
    return (
        <Box
            role={'group'}
            className={
                'ColorScheme relative border rounded-lg w-32 h-24 overflow-hidden flex flex-col transition-all duration-200 cursor-pointer'
            }
            onClick={onClick}
        >
            <IconButton
                opacity={0}
                _groupHover={{opacity: 1}}
                transition={'all .2s'}
                aria-label={'edit-button'}
                icon={<Icon as={FiEdit} color={'white'} />}
                position={'absolute'}
                top={1}
                right={1}
                size={'xs'}
                bg={'blackAlpha.200'}
                _hover={{bg: 'blackAlpha.300'}}
                onClick={(e) => {
                    e.preventDefault();
                    onEdit && onEdit();
                }}
            />
            <div className={'ColorScheme__palette flex h-full w-full'}>
                {colors.map((color, index) => (
                    <div style={{background: color}} className={'w-full'} key={index}></div>
                ))}
            </div>
            <div className={'p-2 h-12 font-bold'}>{name}</div>
        </Box>
    );
}
