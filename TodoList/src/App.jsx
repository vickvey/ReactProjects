import { useState } from "react";
import './App.css';

function App() {
  const [taskIdCount, setTaskIdCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  function createTask(id, desc, status) {
    return {
      id,
      desc,
      status,
      toString: () => (
        `Id: ${this.id}, Desc: ${this.desc}, Status: ${this.status}`
      )
    }
  }

  const handleTaskCreation = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskDesc = formData.get("task-desc").trim();

    if (tasks.some(task => task.desc.toUpperCase() === taskDesc.toUpperCase())) {
      if (!confirm('Task Already Existing, Do you want to add again?')) {
        e.target.reset();
        return;
      }
    }
    setTasks(prevTasks => [...prevTasks, createTask(taskIdCount + 1, taskDesc, true)]);
    setTaskIdCount(taskIdCount + 1);
    e.target.reset();
  }

  const handleTaskDeletion = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskId = parseInt(formData.get("task-id"));
    if (!tasks.some(task => task.id === taskId)) {
      alert(`Task Id: ${taskId} already doesn't exist!`);
      e.target.reset();
      return;
    }
    // Use filter to create a new array without the object with the given id
    setTasks(prevTasks => prevTasks.filter(task => task.id != taskId));
    alert(`Task with Id: ${taskId} successfully deleted!`);
    e.target.reset();
  }

  const handleStatusToggle = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task, // Spread the existing task properties
            status: (task.status === 0 ? 1 : 0), // Toggle the status
          }
        }
        return task; // Return the unchanged task if it doesn't match
      });
    });
  };

  return (
    <div className="App">
      <header>
        <h1>TodoList Web App</h1>
      </header>

      <main>
        {/* Task Addition Form */}
        <form id="task-add" onSubmit={handleTaskCreation}>
          <input type="text" id="task-desc" name="task-desc" placeholder="Enter task description" required />
          <button type="submit">Create Task</button>
        </form>

        {/* Task Deletion Form */}
        <form id="task-delete" onSubmit={handleTaskDeletion}>
          <input type="number" id="task-id" name="task-id" placeholder="Enter id of task to remove" required />
          <button type="submit">Delete Task</button>
        </form>

        {/* Task List Display */}
        <section id="task-list">
          <div className="sub-heading">
            <h2>Tasks:</h2>
            <p>Tap any task status to mark it as completed.</p>
          </div>

          {/* Show tasks table */}
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.desc}</td>
                  <td><button onClick={() => handleStatusToggle(task.id)}>{task.status === 0 ? "Pending" : "Done"}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}

export default App;