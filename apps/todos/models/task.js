Todos.Task = SC.Record.extend({
  title: SC.Record.attr(String),
  isDone: SC.Record.attr(Boolean)
});


Todos.QUERY_ALL_TASKS = SC.Query.local(Todos.Task);