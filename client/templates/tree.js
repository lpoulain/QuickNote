Template.tree.helpers({
    treeroots: function() {
        return Tree.find({ level: 0 }, { sort: {name: 1}});
    },
    
    displayTree: function() {
        return (Meteor.Device.isPhone() == false ||
                section == 'all');
    }
});

Template.branch.helpers({
    treenodes: function() {
      return Tree.find({ level: this.level+1,
                           path: { $regex: '^' + this.path.replace('|', '\\|') + '\\|' + this.name } },
                         {sort: {name: 1} } );
    },
    
    notes: function() {
        return Notes.find({ section: this._id }).count();
    },
    
    color: function() {
        if (section == 'record') {
            if (note.section == this._id)
                return "color: red;";
            return '';
        }
        
        if (section == this._id)
            return "color: red;";
        return '';
    }
});
