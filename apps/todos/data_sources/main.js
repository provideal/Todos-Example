Todos.TaskJSONProxy = SC.Object.create({
          normalize_task_data: function(data) {
               result = new Array();
               if (data.length == undefined)
               {
                    array_name = 'data.task';
                    eval(array_name).guid = eval(array_name).id;
                    result.push(eval(array_name));
               }
               else
               {
                    for(var i=0; i<data.length; i++) {
                         array_name = 'data[i].task';
                         eval(array_name).guid = eval(array_name).id;
                         result.push(eval(array_name));
                    }
               }
               return result;
          } 
     }) ;


Todos.DataSource = SC.DataSource.extend({
  fetch: function(store, query) {
    if (query === Todos.QUERY_ALL_TODOS) {
      SC.Request.getUrl('/todos.json')
        .json()
        .notify(this, '_fetchDidComplete', store, query)
        .send();
        
      return YES;
    }

    return NO;
  },
  
  _fetchDidComplete: function(response, store, query) {
    if(SC.ok(response)) {     
      var recordType = query.get('recordType');
      var records = response.get('body');
      console.log(records);
      
      store.loadRecords(recordType, records);
      store.dataSourceDidFetchQuery(query);
    } else {
      alert('Error');
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

