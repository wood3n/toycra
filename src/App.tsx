import React, { useState, useMemo } from "react";
import { Row, Col, Input, Card } from "antd";
import { v4 as uuidv4 } from "uuid";
import UndoList from "@/components/Undo";
import DoneList from "@/components/Done";

export interface TodoItem {
  key: string;
  value: string;
  done: boolean;
}

export default () => {
  const [todoValue, setTodoValue] = useState("");
  const [listData, setListData] = useState<TodoItem[]>([]);

  const memorized = useMemo(() => {
    // console.log(listData);
    return [];
  }, [listData]);
  console.log(memorized);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    if (value !== "") {
      setTodoValue(value);
    }
  };

  const addTodo = () => {
    if (todoValue !== "") {
      setTodoValue("");
      const key = uuidv4();
      const newTodo = {
        key,
        value: todoValue,
        done: false,
      };
      setListData([...listData, { ...newTodo }]);
    }
  };

  const finishTodo = (key: string) => {
    const newListData = [...listData];
    const index = newListData.findIndex((item) => item.key === key);
    newListData.splice(index, 1, {
      ...newListData[index],
      done: true,
    });
    setListData(newListData);
  };

  const deleteDoneTodo = () => {
    const newListData = listData.filter((item) => !item.done);
    setListData(newListData);
  };

  const hasDoneItem = listData.some((item) => item.done);
  return (
    <Row>
      <Col span={12} offset={6}>
        <Card
          title={
            <Input
              value={todoValue}
              placeholder="请输入事项"
              onChange={handleInputChange}
              onPressEnter={addTodo}
            />
          }
        >
          <UndoList listData={listData} finishTodo={finishTodo} />
        </Card>
        {hasDoneItem && (
          <DoneList listData={listData} deleteDoneTodo={deleteDoneTodo} />
        )}
      </Col>
    </Row>
  );
};
