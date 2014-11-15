Template.noteItem.helpers({
    ownNote: function() {
        return this.userId === Meteor.userId();
    },
    contentSummary: function() {
        if (section == 'record') return this.content;
        return this.content.split('\n').splice(0, 5).join('\n');
    }
});