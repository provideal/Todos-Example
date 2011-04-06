Todos = SC.Application.create({
  NAMESPACE: 'Todos',
  VERSION: '0.1.0',

  store: SC.Store.create().from('Todos.DataSource')
});

// boot the app
//jQuery(document).ready(function() {
SC.ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
});