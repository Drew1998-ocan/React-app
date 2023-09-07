const express = require("express");
const cors = require("cors");
const e = require("express");
// const pool = require("./mongo");

const app = express();

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: 4,
    content: " running from the ltheives of last night",
    important: false,
  },
];

// middleware
app.use(cors());
app.use(express.json());

// creating some routes

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

// app.post("/todo", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING *",
//       [description]
//     );
//     res.json(newTodo.rows[0]);
//     // console.log(req.body);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// GETTING ALL THE TODOS "displaying and returning the values of the todo table.................."

// app.get("/todo", async (req, res) => {
//   try {
//     const allTodos = await pool.query("SELECT * FROM todo");
//     res.json(allTodos.rows);
//     console.log(req.body);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// GETTING A SINGLE TODO
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});
// app.get("/todo/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const singleTodo = await pool.query(
//       "SELECT * FROM todo WHERE todo_id = $1",
//       [id]
//     );
//     res.json(singleTodo.rows[0]);
//     console.log(req.body);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// UPDATING OUR TODO-LIST

// app.put("/todo/:id", async (req, res) => {
//   const { id } = req.params;
//   const { description } = req.body;
//   const updataTodo = await pool.query(
//     "UPDATE todo SET description = $1 WHERE todo_id = $2",
//     [description, id]
//   );

//   res.json("it is updated successfully");
// });

// DELETING OUR TODO ITEMS FROM THE LIST

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// app.delete("/todo/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json("it is deleted successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
