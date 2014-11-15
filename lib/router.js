Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('notes'); }
});

Router.route('/', {
    name: 'notesList',
    data: function() { section = 'all'; return 'all'; },
});

Router.route('/sections/:_id', {
    name: 'sections',
    template: 'notesList',
    data: function() { section = this.params._id; return this.params._id; },
});

Router.route('/notes/:_id', {
    name: 'notePage',
    data: function() { section = "record";
                       note = Notes.findOne(this.params._id);
                      return note;
                    }
});

Router.route('/notes/:_id/edit', {
    name: 'noteEdit',
    data: function() { return Notes.findOne(this.params._id); }
});

Router.route('/submit', {name: 'noteSubmit'});

Router.route('/tree', {name: 'treeManage', template: 'treeManage'});

Router.route('/tree/:_id/edit', {
    name: 'treeEdit',
    data: function() { return Tree.findOne(this.params._id); }
});

Router.route('/tree/submit', {name: 'treeSubmit'});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'notePage'});
Router.onBeforeAction(requireLogin);
