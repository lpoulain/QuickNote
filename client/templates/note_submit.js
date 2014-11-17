Template.noteSubmit.helpers({
    tree: getTreeOptions,
    content_m: function() { return Session.get('content_new'); },
    prettyPath: function() { return (this.path.replace(/\|/g, ' / ') + ' / ' + this.name).substr(3); }
});

Template.noteSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var note = {
            name: $(e.target).find('[name=name]').val(),
            section: $(e.target).find('[name=section]').val(),
            content: $(e.target).find('[name=content]').val()
        };

        Meteor.call('noteInsert', note, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
            
            // show this result but route anyway
            if (result.noteExists)
                alert('This note has already been posted');
            
            Router.go('notePage', {_id: result._id});
        });
    }
});