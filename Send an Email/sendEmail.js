javascript:(function() {
    var recipient = "gurditsingh2307@gmail.com";
    var subject = "Subject";
    var body = "Hello, this is a test email.";
    var mailto_link = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailto_link;
})();
