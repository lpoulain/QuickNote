Template.treeSubmit.helpers({
    tree: getTreeOptions
});

Template.treeSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var tree = {
            name: $(e.target).find('[name=name]').val(),
            parent: $(e.target).find('[name=parent]').val()
        };

        Meteor.call('treeInsert', tree, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
            
            // show this result but route anyway
            if (result.branchExists) {
                alert('This branch already exists');
                return;
            }
            
            Router.go('treeManage');
        });
    }
});