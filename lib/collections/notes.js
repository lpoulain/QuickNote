Notes = new Mongo.Collection('notes');

// check that the userId specified owns the documents
ownsNote = function(userId, note) {
    return note && note.userId === userId;
}

Notes.allow({
    update: ownsNote,
    remove: ownsNote,
    insert: function(userId, note) { return true; }
});

Notes.deny({
    update: function(userId, note, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'name', 'section', 'content').length > 0); }
});

Meteor.methods({
    noteInsert: function(noteAttributes) {
        check(Meteor.userId(), String);
        check(noteAttributes, {
            name: String,
            section: String,
            content: String
        });

//        var noteWithSameLink = Notes.findOne({url: noteAttributes.url});
        var noteWithSameLink = false;
        if (noteWithSameLink) {
            return {
                noteExists: true,
                _id: noteWithSameLink._id
            }
        }

        var user = Meteor.user();
        var note = _.extend(noteAttributes, {
            userId: user._id, author: user.username, submitted: new Date()
        });

        var noteId = Notes.insert(note);

        return {
            _id: noteId
        };
    }
});

Notes.initEasySearch(['name', 'content'], {
    'limit': 20
});