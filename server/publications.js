Meteor.publish('notes', function() {
    return Notes.find({ userId: this.userId });
});

Meteor.publish('tree', function() {
    return Tree.find({ userId: this.userId });
});