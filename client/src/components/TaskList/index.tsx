import React from "react";
import TaskCard from "components/TaskCard";
import { useQuery } from "react-query";
import { getTodos } from "api/getTodos";

const TaskList: React.FC = () => {
    const { isLoading, isError, error, data } = useQuery('todos', getTodos)

    if(isLoading) {
        return (
            <div className="text-white">Is Loading... </div>
        )
    }

    if(isError) {
        return (
            <div className="text-red">Is Error... {error} </div>
        )
    }

    return (
        <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
            {data?.todos.map((todo) => {
                return(
                    <TaskCard 
                        key={todo._id} 
                        taskId={todo._id} 
                        status={todo.status} 
                        title={todo.title} 
                    />            
                )
            })}
        </section>
    )
}

export default TaskList;