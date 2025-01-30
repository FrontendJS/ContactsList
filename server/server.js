const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());

const dataFile = './data.json';
const data  = JSON.parse(fs.readFileSync(dataFile))

const readData = () => {
  const rawData = fs.readFileSync(dataFile);
  return JSON.parse(rawData);
};

app.get('/api/items', (req, res) => {
  const { name } = req.query;
  let filteredData = data;

  if (name) {
    filteredData = filteredData.filter(item =>
      item.firstname.toLowerCase().includes(name.toLowerCase()) ||
      item.lastname.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(filteredData);
});


app.get('/api/items/:id', (req, res) => {
  const item = data.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
    console.log(JSON)
  } else {
    res.status(404).send('Item not found');
  }
});

app.get('/api/contact/:username', (req, res) => {
  const item = data.find(i => i.username === req.params.username);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length ? Math.max(...data.map(i => i.id)) + 1 : 1;
  data.push(newItem);
  //fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const itemIndex = data.findIndex(i => i.id === parseInt(req.params.id));

  console.log(data[itemIndex]);

  
  if (itemIndex !== -1) {
    const updatedItem = req.body;

    for (const key in updatedItem) {
      if (updatedItem.hasOwnProperty(key)) {  
        data[itemIndex][key] = updatedItem[key]
      }
    }

    // updatedItem.id = data[itemIndex].id;
    //data[itemIndex] = updatedItem;

    //fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    console.log(updatedItem)
    
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/api/items/:id', (req, res) => {


  const itemIndex = data.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    data.splice(itemIndex, 1);
    //fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.json({"userId": req.params.id});
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
