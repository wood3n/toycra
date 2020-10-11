import React, { useEffect } from "react";
import { Space, Typography, List, Checkbox } from "antd";
import { TodoItem } from "@/App";

interface Props {
  listData: TodoItem[];
  finishTodo: (key: string) => void;
}

const { Text } = Typography;
const UndoList: React.FC<Props> = ({ listData, finishTodo }) => {
  return (
    <List>
      {listData.map(
        (data) =>
          !data.done && (
            <List.Item key={data.key}>
              <Space>
                <Checkbox
                  onChange={() => {
                    finishTodo(data.key);
                  }}
                ></Checkbox>
                <Text>{data.value}</Text>
              </Space>
            </List.Item>
          )
      )}
    </List>
  );
};

export default UndoList;
