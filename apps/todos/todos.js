// ==========================================================================
// Project:   Todos
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

Todos = SC.Application.create({
  NAMESPACE: 'Todos',
  VERSION: '0.1.0',

  store: SC.Store.create().from('Todos.DataSource')
});

Todos.TodoJSONProxy = SC.Object.create({
  normalize_json: function(data) {
    result = new Array();
    if (data.length == undefined) {
      array_name = 'data.todo';
      eval(array_name).guid = eval(array_name).id;
      result.push(eval(array_name));
    } else {
      for(var i=0; i<data.length; i++) {
        array_name = 'data[i].todo';
        eval(array_name).guid = eval(array_name).id;
        result.push(eval(array_name));
      }
    }
    
    return result;
  } 
});

Todos.Todo = SC.Record.extend({
  primaryKey: 'id',
  title: null,
  isDone: false
});

Todos.QUERY_ALL_TODOS = SC.Query.local(Todos.Todo)

Todos.todoListController = SC.ArrayController.create({
  content: [],

  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });
    this.pushObject(todo);
  },
  
  setTodos: function(todos) {
    this.set('content', todos);
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

Todos.testView = SC.TemplateView.create({
  mouseUp: function() {
    var todos = Todos.store.find(Todos.QUERY_ALL_TODOS);
    Todos.todoListController.setTodos(todos);
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


Todos.DataSource = SC.DataSource.extend({
  fetch: function(store, query) {
    if (query === Todos.QUERY_ALL_TODOS) {
      SC.Request.getUrl('/todos.json')
        .json()
        .notify(this, 'fetchDidComplete', store, query)
        .send();
        
      return YES;
    }

    return NO;
  },
  
  fetchDidComplete: function(response, store, query) {
    if(SC.ok(response)) {      
      var recordType = query.get('recordType');
      var records = Todos.TodoJSONProxy.normalize_json(response.get('body'));

      store.loadRecords(recordType, records);
      store.dataSourceDidFetchQuery(query);
    } else {
      alert('Error');
      // Tell the store that your server returned an error
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;



jQuery(document).ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
});
