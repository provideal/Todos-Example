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

