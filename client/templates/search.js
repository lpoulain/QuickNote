Template.search.helpers({
    notes: function() {
        return Notes.find({ section: null },
                              { sort: {name: 1} });
    }
});
