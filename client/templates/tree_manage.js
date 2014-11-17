Template.treeToEdit.helpers({
    treeroots: getTree
});

Template.branchEdit.helpers({
	color: function() {
		if (section == this.element._id) return "color: red;";		
		return '';
	}
})