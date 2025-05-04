import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';

export default function KanbanBoard({ tasks, fetchTasks }) {
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await axios.put(`${process.env.REACT_APP_API_BASE}/api/tasks/${taskId}`, {
        status: newStatus,
      }, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  const statuses = ['To Do', 'In Progress', 'Completed'];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-pink-100 p-4 rounded shadow min-h-[200px]"
              >
                <h4 className="text-lg font-bold text-pink-600 mb-2">{status}</h4>
                {tasks
                  .filter((task) =>
                    task.status &&
                    task.status.trim().toLowerCase() === status.trim().toLowerCase()
                  )
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-white p-2 rounded mb-2 shadow"
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
