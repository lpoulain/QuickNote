
Template.treeEdit.helpers({
    tree: getTreeOptions,
    isParent: function(arg) { return (this.id == arg.parent); },
    isCollapse: function() {
        var val = Tree.findOne(section).collapse
        return (typeof val != 'undefined' && val == 'on') ? 'checked' : '';
    }
});

Template.treeEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentTreeId = this._id;
        var branch = this;

        var treeProperties = {
            name: $(e.target).find('[name=name]').val(),
            parent: $(e.target).find('[name=parent]').val(),
            collapse: $('input[name=collapse]:checked').val()
        }
        if (typeof treeProperties.collapse == 'undefined') treeProperties.collapse = '';

        if (treeProperties.parent == this._id) {
            alert('A branch cannot be its own parent');
            return;
        }

        Tree.update(currentTreeId, {$set: treeProperties}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('treeManage');
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this branch?")) {
            var currentTreeId = this._id;

            // Checks that there is no subtree
            var subtrees = Tree.findOne({parent: this._id});
            if (typeof subtrees != 'undefined') {
                alert('Please delete any subtree before');
                return;
            }

            // Checks there are no note in the branch
            var notes = Notes.findOne({section: this._id});
            if (typeof notes != 'undefined') {
                alert('Please delete any associated note before');
                return;
            }
            Tree.remove(currentTreeId);
            Router.go('treeManage');
        }
    }
});