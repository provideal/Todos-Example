Todos.Task = SC.Record.extend({
  title: null,
  isDone: false
});


Todos.QUERY_ALL_TASKS = SC.Query.local(Todos.Task);