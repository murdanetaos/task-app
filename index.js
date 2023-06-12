window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const task = input.value;
  
      const task_el = document.createElement('div');
      task_el.classList.add('task');
  
      const task_content_el = document.createElement('div');
      task_content_el.classList.add('content');
  
      task_el.appendChild(task_content_el);
  
      const task_input_el = document.createElement('input');
      task_input_el.classList.add('text');
      task_input_el.type = 'text';
      task_input_el.value = task;
      task_input_el.setAttribute('readonly', 'readonly');
  
      task_content_el.appendChild(task_input_el);
  
      const task_actions_el = document.createElement('div');
      task_actions_el.classList.add('actions');
  
      const task_edit_el = document.createElement('button');
      task_edit_el.classList.add('edit');
      task_edit_el.innerText = 'Edit';
  
      const task_delete_el = document.createElement('button');
      task_delete_el.classList.add('delete');
      task_delete_el.innerText = 'Delete';
  
      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
  
      task_el.appendChild(task_actions_el);
  
      list_el.appendChild(task_el);
  
      input.value = '';
  
      task_edit_el.addEventListener('click', (e) => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
          task_edit_el.innerText = "Save";
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
        } else {
          task_edit_el.innerText = "Edit";
          task_input_el.setAttribute("readonly", "readonly");
          updateTask(task_input_el.value, task_input_el.dataset.taskId);
        }
      });
  
      task_delete_el.addEventListener('click', (e) => {
        list_el.removeChild(task_el);
        deleteTask(task_input_el.dataset.taskId);
      });
  
      // Send task data to the server
      saveTask(task);
    });
  
    function saveTask(task) {
      // Send an HTTP request to the server to save the task
      // You can use the fetch API or any other library of your choice
  
      fetch('/save-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
      })
        .then(response => {
          if (response.ok) {
            // Task saved successfully
            console.log('Task saved');
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
  
    function deleteTask(taskId) {
      // Send an HTTP request to the server to delete the task
      // You can use the fetch API or any other library of your choice
  
      fetch('/delete-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskId })
      })
        .then(response => {
          if (response.ok) {
            // Task deleted successfully
            console.log('Task deleted');
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
  
    function updateTask(task, taskId) {
      // Send an HTTP request to the server to update the task
      // You can use the fetch API or any other library of your choice
  
      fetch('/update-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task, taskId })
      })
        .then(response => {
          if (response.ok) {
            // Task updated successfully
            console.log('Task updated');
          } else {
            // Handle error when task updating fails
            console.error('Failed to update task');
          }
        })
        .catch(error => {
          // Handle network or other errors
          console.error('Error:', error);
        });
    }
  });
  