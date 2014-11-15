Template.treeToEdit.helpers({
    treeroots: function() {
        return Tree.find({ level: 0 }, { sort: {name: 1}});
    }
});

Template.branchEdit.helpers({
    treenodes: function() {
      return Tree.find({ level: this.level+1,
                           path: { $regex: '^' + this.path.replace('|', '\\|') + '\\|' + this.name } },
                         {sort: {name: 1} } );
    }
});

