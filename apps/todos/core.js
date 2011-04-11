Todos = SC.Application.create({
  NAMESPACE: 'Todos',
  VERSION: '0.1.0',

  //store: SC.Store.create().from('Todos.DataSource')
  store: SC.Store.create().from(SC.Record.fixtures)
});

// boot the app
SC.ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
});