import * as React from 'react';
import {Radio, Form, Slider, Button, Space, Typography} from 'antd';
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import Anchor from '../../CustomInput/Anchor';
import {FcAbout} from 'react-icons/fc';
import {useTranslation} from 'react-i18next';
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from '@chakra-ui/react';
import {baseLegend} from '../../../data/baseLegend';

export default () => {
    const {t} = useTranslation();

    return (
        <Space className={'w-full'} direction={'vertical'}>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcAbout />
                    {t('Legend')}
                </Space>
            </Typography.Title>
            <Accordion size={'sm'}>
                <Form.List name={'legends'}>
                    {(fields, {add}) => (
                        <>
                            {fields.map(({key, name, ...rest}) => (
                                <AccordionItem key={key}>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left">
                                                Legend {name}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Form.Item {...rest} name={[name, 'direction']} label={t('Direction')}>
                                            <Radio.Group size={'small'}>
                                                <Radio.Button value={'column'}>
                                                    <ArrowUpOutlined />
                                                </Radio.Button>
                                                <Radio.Button value={'row'}>
                                                    <ArrowRightOutlined />
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item {...rest} name={[name, 'translateX']} label={t('Translate X')}>
                                            <Slider min={-500} max={500} />
                                        </Form.Item>
                                        <Form.Item {...rest} name={[name, 'translateY']} label={t('Translate Y')}>
                                            <Slider min={-500} max={500} />
                                        </Form.Item>
                                        <Form.Item {...rest} name={[name, 'legendAlign']} label={t('Legend Align')}>
                                            <Radio.Group size={'small'}>
                                                <Radio.Button value={'left'}>
                                                    <AlignLeftOutlined />
                                                </Radio.Button>
                                                <Radio.Button value={'center'}>
                                                    <AlignCenterOutlined />
                                                </Radio.Button>
                                                <Radio.Button value={'right'}>
                                                    <AlignRightOutlined />
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            {...rest}
                                            name={[name, 'legendVerticalAlign']}
                                            label={t('Legend Vertical Align')}
                                        >
                                            <Radio.Group size={'small'}>
                                                <Radio.Button value={'top'}>
                                                    <AlignLeftOutlined />
                                                </Radio.Button>
                                                <Radio.Button value={'middle'}>
                                                    <AlignCenterOutlined />
                                                </Radio.Button>
                                                <Radio.Button value={'bottom'}>
                                                    <AlignRightOutlined />
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item {...rest} name={[name, 'anchor']} label={t('Anchor')}>
                                            <Anchor />
                                        </Form.Item>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                            <Form.Item>
                                <Button icon={<PlusOutlined />} onClick={() => add(baseLegend[0])}>
                                    {t('New Legend')}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                {/* {getLegends()?.map((legend, index) => {
                    return (
                        <StyledCollapsePanel
                            key={index}
                            header={`${t('Legend')} ${index}`}
                            extra={
                                <span
                                    onClick={() => deleteLegendByIndex(index)}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <DeleteOutlined />
                                </span>
                            }
                        >
                            <Form
                                onValuesChange={(changedValues) => {
                                    switch (activeChart?.type) {
                                        case 'LINE':
                                            setLine((draftState) => {
                                                Object.assign(draftState.legends?.[index], changedValues);
                                            });
                                            break;
                                        case 'BAR':
                                            setBar((draftState) => {
                                                Object.assign(draftState.legends?.[index], {
                                                    ...changedValues,
                                                    dataFrom: 'keys',
                                                });
                                            });
                                        case 'PIE':
                                            setPie((pie) => {
                                                const legend = { ...pie.legends?.[index] };
                                                const newLegend = Object.assign(legend, changedValues);

                                                const temp = pie.legends ? [...pie.legends] : [];
                                                temp.splice(index, 1, newLegend);

                                                console.log(temp);
                                                return {
                                                    ...pie,
                                                    legends: temp,
                                                };
                                            });
                                            break;
                                        case 'SCATTER':
                                            setScatter((draftState) => {
                                                Object.assign(draftState.legends?.[index], changedValues);
                                            });
                                    }
                                }}
                                initialValues={legend}
                                layout={'vertical'}
                            >
                            </Form>
                        </StyledCollapsePanel>
                    );
                })} */}
            </Accordion>
        </Space>
    );
};
