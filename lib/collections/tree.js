Tree = new Mongo.Collection('tree');

getTreeOptions = function getTreeOptions() {
    var tree = getTree();
    return getOptions(tree, '');
}

function getOptions(branches, padding) {
    var result = [];
    _.each(branches, function(branch) {
        result.push({ id: branch.element._id, label: (padding + branch.element.name) });
        result = result.concat(getOptions(branch.children, padding + branch.element.name + ' / '));
    });
    return result;
}

function ownsTree(userId, tree) { return tree.userId == userId; }

Tree.allow({
    insert: function(userId, tree) { return true; },
    update: ownsTree,
    remove: ownsTree
});

Tree.deny({
    update: function(userId, tree, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'name', 'path', 'parent', 'level').length > 0); }
});

Meteor.methods({
    treeInsert: function(treeAttributes) {
        check(Meteor.userId(), String);
        check(treeAttributes, {
            name: String,
            parent: String
        });
        var user = Meteor.user();

        var existingBranch = Tree.findOne({name: treeAttributes.name, parent: treeAttributes.parent, userId: user._id});
        if (typeof existingBranch != 'undefined') {
            return {
                branchExists: true,
                _id: existingBranch._id
            }
        }

        var tree = _.extend(treeAttributes, {
            userId: user._id,
            submitted: new Date()
        });

        var treeId = Tree.insert(tree);

        return {
            _id: treeId
        };
    }
});
