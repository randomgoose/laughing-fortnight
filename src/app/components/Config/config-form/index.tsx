import * as React from 'react';
import {Form} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import {SetStateAction, useAtom} from 'jotai';
import {ReactNode} from 'react';
import {saveHisotryAtom} from '../../../atoms/history';

export default function ConfigForm<T>({
    children,
    state,
    set,
}: {
    children: ReactNode;
    state: T;
    set: (update: SetStateAction<T>) => void;
}) {
    const [form] = useForm();
    const [, save] = useAtom(saveHisotryAtom);

    const onValuesChange = (_changedValues, allValues) => {
        save(null);
        set((prev) => ({...prev, ...allValues}));
    };

    React.useEffect(() => {
        form.setFieldsValue({...state});
    }, [state]);

    return (
        <Form form={form} onValuesChange={onValuesChange} layout={'vertical'}>
            {children}
        </Form>
    );
}
