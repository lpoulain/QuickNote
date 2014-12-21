function getTreeChildren(childrenToGet, allChildren) {
    var result = [];
    _.each(childrenToGet, function(child) {
        var branch = { element: child, children: getTreeChildren(allChildren[child._id], allChildren) };
        result.push(branch);
    });

    result.sort(function s(e1, e2) {
        if (e1.element.name > e2.element.name) return 1;
        if (e1.element.name < e2.element.name) return -1;
        return 0;
    });
    return result;
}

getTree = function getTree() {
    var branches = Tree.find().fetch();
    var children = {};
    _.each(branches, function(t) {
        var parentId;
        if (t.parent == '' || t.hasOwnProperty('parent') == false) parentId = 'ROOT';
        else parentId = t.parent;

        if (children.hasOwnProperty(parentId)) children[parentId].push(t);
        else children[parentId] = [t];
    });

    var roots = getTreeChildren(children['ROOT'], children);
    return roots;
}

Template.treeToEdit.helpers({
    treeroots: getTree
});

Template.branchEdit.helpers({
	color: function() {
		if (section == this.element._id) return "color: red;";		
		return '';
	}
})