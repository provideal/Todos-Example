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