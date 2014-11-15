Template.notesList.helpers({
    notes: function() {
        if (this == 'all')
            return Notes.find({ section: null },
                              { sort: {name: 1} });
        return Notes.find({ section: String(this) },
                          { sort: {name: 1} });
    }
});
