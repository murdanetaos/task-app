// DOM elements
const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskDescriptionInput = document.querySelector('#task-description');
const taskList = document.querySelector('#task-list');

// Event listener for form submission
taskForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get task details from input fields
  const taskTitle = taskTitleInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  // Validate input fields
  if (taskTitle === '' || taskDescription === '') {
    alert('Please enter a task title and description.');
    return;
  }

  // Create a task object
  const task = {
    title: taskTitle,
    description: taskDescription
  };

  // Send task data to the server
  saveTask(task);
  
  // Clear input fields
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
});

// Function to display tasks on the page
function displayTasks(tasks) {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteTask(task.id);
    });

    taskList.appendChild(taskItem);
  });
}

// Function to send task data to the server
function saveTask(task) {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Task saved successfully
        getTasks(); // Refresh the task list
      } else {
        // Handle error when task saving fails
        console.error('Failed to save task');
      }
    })
    .catch(error => {
      // Handle network or other errors
      console.error('Error:', error);
    });
}

// Function to retrieve tasks from the server
function getTasks() {
  fetch('/tasks')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const tasks = data.tasks;
        displayTasks(tasks);
      } else {
        // Handle error when retrieving tasks fails
        console.error('Failed to retrieve tasks');
      }
    })
    .catch(error => {
      // Handle network or other errors
      console.error('Error:', error);
    });
}

// Function to delete a task from the server
function deleteTask(taskId) {
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Task deleted successfully
        getTasks(); // Refresh the task list
      } else {
        // Handle error when task deletion fails
        console.error('Failed to delete task');
      }
    })
    .catch(error => {
      // Handle network or other errors
      console.error('Error:', error);
    });
}

// Fetch tasks on page load
document.addEventListener('DOMContentLoaded', getTasks);
