const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Endpoint for retrieving tasks
app.get('/tasks', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.json({ success: false, message: 'Failed to retrieve tasks' });
    }

    const tasks = JSON.parse(data);
    return res.json({ success: true, tasks });
  });
});

// Endpoint for saving a task
app.post('/tasks', (req, res) => {
  const task = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.json({ success: false, message: 'Failed to save task' });
    }

    const tasks = JSON.parse(data);
    const newTaskId = generateTaskId(tasks);
    task.id = newTaskId;
    tasks.push(task);

    fs.writeFile('data.json', JSON.stringify(tasks), err => {
      if (err) {
        console.error('Error writing data file:', err);
        return res.json({ success: false, message: 'Failed to save task' });
      }

      return res.json({ success: true, message: 'Task saved successfully' });
    });
  });
});

// Endpoint for deleting a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.json({ success: false, message: 'Failed to delete task' });
    }

    const tasks = JSON.parse(data);
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    fs.writeFile('data.json', JSON.stringify(updatedTasks), err => {
      if (err) {
        console.error('Error writing data file:', err);
        return res.json({ success: false, message: 'Failed to delete task' });
      }

      return res.json({ success: true, message: 'Task deleted successfully' });
    });
  });
});

// Function to generate a unique task ID
function generateTaskId(tasks) {
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
  return maxId + 1;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
