import {useDisclosure} from '@chakra-ui/hooks';
import {Heading} from '@chakra-ui/layout';
import {Portal} from '@chakra-ui/portal';
import {ResponsiveScatterPlot, ScatterPlotNodeData, ScatterPlotDatum} from '@nivo/scatterplot';
import {InputNumber} from 'antd';
import {PrimitiveAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Param} from '../../atoms/appAtom';
import {scatterAtomFamily, ScatterState} from '../../atoms/scatterAtomFamily';
import {useScatter} from '../../hooks/useScatter';
import Widget from '../../widgets/Widget';
import StyledRnd from '../StyledComponents/StyledRnd';

export default function VisScatterPlot({id, initialState}: Param & {initialState?: ScatterState}) {
    const [{width, height, x, y, enableXAxis, enableYAxis, ...rest}, setScatter] = useImmerAtom(
        scatterAtomFamily({id}) as PrimitiveAtom<ScatterState>
    );

    const {isOpen, onClose, onOpen} = useDisclosure();
    const {changeNodeDataX, changeNodeDataY} = useScatter(id);

    const {t} = useTranslation();

    const [position, setPosition] = React.useState<{x: number; y: number}>({x: 0, y: 0});
    const [activeNode, setActiveNode] = React.useState<ScatterPlotNodeData<ScatterPlotDatum> | null>(null);

    React.useEffect(() => {
        if (initialState)
            setScatter((scatter) => {
                Object.assign(scatter, initialState);
            });
    }, []);

    function onDragStop(_e, d) {
        setScatter((scatter) => {
            scatter.x = d.x;
            scatter.y = d.y;
        });
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setScatter((scatter) => {
            scatter.width = parseFloat(ref.style.width);
            scatter.height = parseFloat(ref.style.height);
            scatter.x = position.x;
            scatter.y = position.y;
        });
    }

    return (
        <StyledRnd chartId={id} width={width} height={height} x={x} y={y} onDragStop={onDragStop} onResize={onResize}>
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
        </StyledRnd>
    );
}
