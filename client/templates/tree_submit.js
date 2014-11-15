Template.treeSubmit.helpers({
    tree: function() { return Tree.find({}, {sort: {path: 1, name: 2}}); },
    prettyPath: function() { return (this.path.replace(/\|/g, ' / ') + ' / ' + this.name).substr(3); }
});

Template.treeSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var tree = {
            name: $(e.target).find('[name=name]').val(),
            path: $(e.target).find('[name=path]').val()
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