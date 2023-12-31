const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  console.log('Received Event ', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const status = content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listning on 4003');
});
