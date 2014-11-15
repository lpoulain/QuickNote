Tree = new Mongo.Collection('tree');

function ownsTree(userId, tree) { return tree.userId == userId; }

Tree.allow({
    insert: function(userId, tree) { return true; },
    update: ownsTree,
    remove: ownsTree
});

Meteor.methods({
    treeInsert: function(treeAttributes) {
        check(Meteor.userId(), String);
        check(treeAttributes, {
            name: String,
            path: String
        });
        var user = Meteor.user();

        var existingBranch = Tree.findOne({name: treeAttributes.name, path: treeAttributes.path, userId: user._id});
        if (typeof existingBranch != 'undefined') {
            return {
                branchExists: true,
                _id: existingBranch._id
            }
        }

        var tree = _.extend(treeAttributes, {
            userId: user._id,
	    submitted: new Date(),
	    level: treeAttributes.path.split(/\|/).length-1
        });

        var treeId = Tree.insert(tree);

        return {
            _id: treeId
        };
    }
});
