Template.treeEdit.helpers({
    tree: function() { return Tree.find({}, {sort: {path:1, name:2}}); },
    isParent: function(arg) { return (this.path + '|' + this.name == arg.path); },
    prettyPath: function() { return (this.path.replace(/\|/g, ' / ') + ' / ' + this.name).substr(3); }
});

Template.treeEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentTreeId = this._id;
        var branch = this;

        var treeProperties = {
            name: $(e.target).find('[name=name]').val(),
            path: $(e.target).find('[name=path]').val(),
            level: $(e.target).find('[name=path]').val().split(/\|/).length-1
        }

        var updateSubtree = (this.path != treeProperties.path ||
                             this.name != treeProperties.name);

        var newParentPath = treeProperties.path + '|' + treeProperties.name;
        var oldParentPathLength = this.path.length + 1 + this.name.length;

        Tree.update(currentTreeId, {$set: treeProperties}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                if (updateSubtree) {
                    var subBranches = Tree.find({path: { $regex: '^' + branch.path.replace('|', '\\|') + '\\|' + branch.name }}).fetch();
                    _.each(subBranches, function(subBranch) {
//                        subBranch.path = newPath + subBranch.path.substr(oldPathLength);
                        var newPath = newParentPath + subBranch.path.substr(oldParentPathLength);
                        Tree.update({ _id: subBranch._id },
                                    { $set: {path: newPath, level: newPath.split(/\|/).length-1 } });
                    });
                }

                Router.go('treeManage');
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this branch?")) {
            var currentTreeId = this._id;

            // Checks that there is no subtree
            var subtrees = Tree.findOne({path: this.path + '|' + this.name});
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