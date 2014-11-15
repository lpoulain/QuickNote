Template.treeEdit.helpers({
    tree: function() { return Tree.find({}, {sort: {path:1, name:2}}); },
    isParent: function(arg) { return (this.path + '|' + this.name == arg.path); },
    prettyPath: function() { return (this.path.replace(/\|/g, ' / ') + ' / ' + this.name).substr(3); }
});

Template.treeEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentTreeId = this._id;

        var treeProperties = {
            name: $(e.target).find('[name=name]').val(),
            path: $(e.target).find('[name=path]').val(),
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
	    var subtrees = Tree.findOne({path: this.path + '|' + this.name});
	    if (typeof subtrees != 'undefined') {
		alert('Please delete any subtree before');
		return;
	    }
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