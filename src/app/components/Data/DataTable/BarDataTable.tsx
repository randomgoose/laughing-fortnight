import {PlusOutlined} from '@ant-design/icons';
import {Box, Flex, useToast} from '@chakra-ui/react';
import {Table} from 'antd';
import {IconButton, Button} from '@chakra-ui/react';
import cryptoRandomString from 'crypto-random-string';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Param} from '../../../atoms/appAtom';
import {useBar} from '../../../hooks/useBar';
import EditableDiv from '../../CustomInput/EditableDiv';
import DataMock from '../DataMock/DataMock';
import {FiX} from 'react-icons/fi';
import {PrimitiveAtom, useAtom} from 'jotai';
import {BarState} from '../../../atoms/barAtomFamily';
import {saveHisotryAtom} from '../../../atoms/history';

export default function BarDataTable({id, atom}: Param & {atom: PrimitiveAtom<BarState>}) {
    const {t} = useTranslation();
    const [bar, set] = useAtom(atom);
    const {setData, setKey, removeKey, addKey} = useBar(id);
    const toast = useToast();
    const [, save] = useAtom(saveHisotryAtom);

    console.log('length', bar.data.length);

    React.useEffect(() => {
        console.log('table', bar.data.length);
    }, [bar.data.length]);

    const columns = bar.keys
        ? [
              ...bar.keys.map((key) => {
                  return {
                      key,
                      dataIndex: key,
                      width: 120,
                      title: (
                          <Flex key={key} align={'center'} role={'group'}>
                              <EditableDiv
                                  key={key}
                                  value={key}
                                  validate={(value: string) =>
                                      bar.keys ? !bar.keys.filter((item) => item !== key).includes(value) : true
                                  }
                                  onFinishEditing={(value: string) => {
                                      if (value.length <= 0) {
                                          toast({
                                              title: `${t('Cannot leave this input empty')}`,
                                              description: '1',
                                              status: 'error',
                                              isClosable: true,
                                          });
                                          return;
                                      } else if (bar.keys?.filter((item) => item !== key).includes(value)) {
                                          toast({
                                              title: `${value} ${t('exists')}`,
                                              description: '2',
                                              status: 'error',
                                              isClosable: true,
                                          });
                                          return;
                                      } else {
                                          setKey(key, value);
                                      }
                                  }}
                              />
                              <IconButton
                                  ml={1}
                                  opacity={0}
                                  transition={'all .2s'}
                                  _groupHover={{opacity: 1}}
                                  icon={<FiX />}
                                  onClick={() => removeKey(key)}
                                  aria-label="remove column"
                                  size={'xs'}
                                  variant="ghost"
                              />
                          </Flex>
                      ),
                      render: (value, record) => {
                          return (
                              <EditableDiv
                                  value={value}
                                  key={record.id}
                                  validate={(value) => !Number.isNaN(parseFloat(value))}
                                  onFinishEditing={(value) => {
                                      const newValue = parseFloat(value + '');
                                      if (Number.isNaN(newValue)) {
                                          console.log('nan', newValue);
                                          setData(bar.data.indexOf(record), key, 0);
                                      } else {
                                          setData(bar.data.indexOf(record), key, newValue);
                                      }
                                  }}
                              />
                          );
                      },
                  };
              }),
          ]
        : [];

    return (
        <Box w={'full'} h={'full'}>
            {bar.data.length}
            <DataMock />
            <Table
                rowKey={bar.indexBy as string}
                key={'barDataTable'}
                dataSource={[...bar.data]}
                scroll={{y: 140, x: 2000}}
                footer={() => (
                    <Button
                        onClick={() => {
                            save(null);
                            set((prev) => ({
                                ...prev,
                                data: [...prev.data, {...prev.data[0], id: cryptoRandomString({length: 4})}],
                            }));
                        }}
                        size={'sm'}
                    >
                        {t('Add row')}
                    </Button>
                )}
                columns={[
                    {
                        title: 'id',
                        dataIndex: bar.indexBy as string,
                        key: 'add_column',
                        render: (value, record, index) => (
                            <EditableDiv
                                value={value}
                                key={value}
                                validate={(value) => {
                                    const identicalRow = bar.data.find(
                                        (datum) => datum[bar.indexBy as string] === value
                                    );
                                    if (identicalRow && bar.data.indexOf(identicalRow) !== index) return false;
                                    else return true;
                                }}
                                onFinishEditing={(value: string) => {
                                    setData(
                                        bar.data.indexOf(record),
                                        bar.indexBy as string,
                                        value as unknown as number
                                    );
                                }}
                            />
                        ),
                        fixed: 'left',
                        width: 120,
                    },
                    ...columns,
                    {
                        title: (
                            <Button
                                size={'xs'}
                                variant={'outlined'}
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    addKey(cryptoRandomString({length: 4}));
                                }}
                            >
                                {t('Add column')}
                            </Button>
                        ),
                        key: 'add_column',
                    },
                ]}
            />
        </Box>
    );
}
