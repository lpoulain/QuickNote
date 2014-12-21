Template.tree.helpers({
    treeroots: getTree,
    
    displayTree: function() {
        return ($(window).width() >= 768 ||
                section == 'all');
    },

    section: function() { return "'" + section.trim() + "'"; }
});

Template.branch.helpers({
    treenodes: function() {
/*      return Tree.find({ level: this.level+1,
                           path: { $regex: '^' + this.path.replace('|', '\\|') + '\\|' + this.name } },
                         {sort: {name: 1} } );*/
        return this.children;
    },
    
    notes: function() {
        return Notes.find({ section: this.element._id }).count();
    },
    
    color: function() {
        if (section == 'record') {
            if (note.section == this.element._id)
                return "active";
            return '';
        }
        
        if (section == this.element._id)
            return "active";
        return '';
    },

    branch_class: function() {
        var res = (this.element.collapse == 'on' &&
                   section != this.element._id)
                  ? 'collapse' : '';
        if (section == this.element._id && typeof displayBranch != 'undefined') displayBranch(section);
        return res;
    }
});


Template.tree.rendered = function() {
    displayBranch(section);
}
