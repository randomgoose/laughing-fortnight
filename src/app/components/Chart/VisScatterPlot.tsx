import {useDisclosure} from '@chakra-ui/hooks';
import {Heading} from '@chakra-ui/layout';
import {Portal} from '@chakra-ui/portal';
import {ResponsiveScatterPlot, ScatterPlotNodeData, ScatterPlotDatum} from '@nivo/scatterplot';
import {InputNumber} from 'antd';
import {PrimitiveAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {ScatterState} from '../../atoms/scatterAtomFamily';
import {useScatter} from '../../hooks/useScatter';
import Widget from '../../widgets/Widget';

export default function VisScatterPlot({
    initialState,
    atom,
}: {
    initialState?: ScatterState;
    atom: PrimitiveAtom<ScatterState>;
}) {
    const [{width, height, x, y, enableXAxis, enableYAxis, key, ...rest}, setScatter] = useImmerAtom(atom);

    const {isOpen, onClose, onOpen} = useDisclosure();
    const {changeNodeDataX, changeNodeDataY} = useScatter(key);

    const {t} = useTranslation();

    const [position, setPosition] = React.useState<{x: number; y: number}>({x: 0, y: 0});
    const [activeNode, setActiveNode] = React.useState<ScatterPlotNodeData<ScatterPlotDatum> | null>(null);

    React.useEffect(() => {
        if (initialState)
            setScatter((scatter) => {
                Object.assign(scatter, initialState);
            });
    }, []);

    return (
        <>
            <ResponsiveScatterPlot
                {...rest}
                isInteractive
                useMesh
                axisBottom={enableXAxis ? rest.axisBottom : undefined}
                axisLeft={enableYAxis ? rest.axisLeft : undefined}
                onClick={(node: ScatterPlotNodeData<ScatterPlotDatum>, event) => {
                    setPosition({x: event.clientX, y: event.clientY});
                    setActiveNode(node);
                    onOpen();
                }}
            />
            <Portal>
                <Widget
                    position={position}
                    title={`${t('Node')}-${activeNode && activeNode.id}`}
                    isOpen={isOpen}
                    onClose={onClose}
                    content={
                        activeNode ? (
                            <div>
                                <Heading as={'h6'}>x</Heading>
                                <InputNumber
                                    value={activeNode.x}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onChange={(value) => changeNodeDataX(activeNode.serieId, activeNode.index, value)}
                                />
                                <Heading as={'h6'}>y</Heading>
                                <InputNumber
                                    value={activeNode.y}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onChange={(value) => changeNodeDataY(activeNode.serieId, activeNode.index, value)}
                                />
                            </div>
                        ) : null
                    }
                />
            </Portal>
        </>
    );
}
