import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [arr, setArr] = useState([...props.initialData]);
    const [value, setValue] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editId, setEditId] = useState(-1);

    useEffect(() => {
        if (props.sorting === 'ASC') {
            setArr([
                ...arr.sort(function (a, b) {
                    return a.id - b.id;
                }),
            ]);
        } else if (props.sorting === 'DESC') {
            setArr([
                ...arr.sort(function (a, b) {
                    return b.id - a.id;
                }),
            ]);
        }
    }, [props.sorting]);

    const result = arr.map((item, index) => {
        if (editId !== item.id) {
            return (
                <li
                    key={item.id}
                    onClick={() => {
                        setEditId(item.id);
                        setEditIndex(index);
                        setValue(item.name);
                    }}
                >
                    {item.name}
                </li>
            );
        } else {
            if (index !== editIndex) {
                setEditIndex(index);
            }
            /*return  <li>
                <input 
                    key={item.id} value={item.name} onChange={edit} onKeyUp={stopEdit} 
                />; 
            </li>*/
            return (
                <input
                    key={item.id}
                    value={item.name}
                    onChange={edit}
                    onKeyUp={stopEdit}
                />
            );
        }
    });

    function edit(event: any) {
        // редактирование элемента
        setArr([
            ...arr.slice(0, editIndex),
            { id: editId, name: event.target.value },
            ...arr.slice(editIndex + 1),
        ]);
    }

    function stopEdit(event: any) {
        // завершение редактирования
        if (event.key === 'Enter') {
            if (event.target.value === '') {
                // удаление эдемента
                setArr([
                    ...arr.slice(0, editIndex),
                    ...arr.slice(editIndex + 1),
                ]);
            }
            setEditId(-1);
        } else if (event.key === 'Escape') {
            setArr([
                ...arr.slice(0, editIndex),
                { id: editId, name: value },
                ...arr.slice(editIndex + 1),
            ]);
            setEditId(-1);
        }
    }

    return <ul>{result}</ul>;
}
