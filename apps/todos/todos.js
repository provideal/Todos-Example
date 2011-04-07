// ==========================================================================
// Project:   Todos
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

SC.ready(function() {
  var todos = Todos.store.find(Todos.QUERY_ALL_TODOS);
  
  window.setTimeout(function() {
    Todos.todoListController.set('content', todos);
  }, 2000);
});


Todos.QUERY_ALL_TODOS = SC.Query.local(Todos.Todo);


Todos.Todo = SC.Record.extend({
  primaryKey: 'id',
  title: null,
  isDone: false
});


Todos.todoListController = SC.ArrayController.create({
  
  content: [],

  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });
    this.pushObject(todo);
  },
  
  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },

  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);
      return value;
    } else {
      return this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
});


Todos.createTodoView = SC.TemplateView.create(SC.TextFieldSupport, {
  insertNewline: function() {
    var value = this.get('value');

    if (value) {
      Todos.todoListController.createTodo(value);
      this.set('value', '');
    }
  }
});


Todos.clearCompletedView = SC.TemplateView.create({
  mouseUp: function() {
    Todos.todoListController.clearCompletedTodos();
  }
});


Todos.todoListView = SC.TemplateCollectionView.create({
  contentBinding: 'Todos.todoListController'
});


Todos.CheckboxView = SC.TemplateView.extend(SC.CheckboxSupport, {
  valueBinding: '.parentView.content.isDone'
});


Todos.statsView = SC.TemplateView.create({
  remainingBinding: 'Todos.todoListController.remaining',

  displayRemaining: function() {
    var remaining = this.get('remaining');
    
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining').cacheable()
});


Todos.markAllDoneView = SC.TemplateView.create(SC.CheckboxSupport, {
  valueBinding: 'Todos.todoListController.allAreDone'
});
