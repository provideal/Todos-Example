sc_require('models/task');


SC.ready(function() {
  var tasks = Todos.store.find(Todos.QUERY_ALL_TASKS);
  Todos.todoListController.set('content', tasks);  
});


Todos.todoListController = SC.ArrayController.create({
  content: []
});


Todos.todoListView = SC.TemplateCollectionView.create({
  contentBinding: 'Todos.todoListController'
});