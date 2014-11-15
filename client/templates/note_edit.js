Template.noteEdit.helpers({
    content_m: function() { return Session.get('content_' + this._id); },
    tree: function() { return Tree.find({}, {sort: {path:1, name:2}}); },
    isSection: function(arg) { console.log(arg); return (this._id == arg); },
    prettyPath: function() { return (this.path.replace(/\|/g, ' / ') + ' / ' + this.name).substr(3); }
});

Template.noteEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentNoteId = this._id;

        var noteProperties = {
            name: $(e.target).find('[name=name]').val(),
            section: $(e.target).find('[name=section]').val(),
            content: $(e.target).find('[name=content]').val(),
        }

        Notes.update(currentNoteId, {$set: noteProperties}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('notePage', {_id: currentNoteId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this note?")) {
            var currentNoteId = this._id;
            Notes.remove(currentNoteId);
            Router.go('notesList');
        }
    }
});