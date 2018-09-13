/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of the tests within the $() function,
 * since some of these tests may require DOM elements.
 */
$(function() {
    /* A test suite about the allFeeds variable in the application.*/
    describe('RSS Feeds', function() {
        /* A test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a non-empty url', function() {
            for (let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a non-empty name', function() {
            for (let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is hidden by default. */
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('shows and hides on click', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });
    //  A test suite named "Initial Entries"
    describe('Initial Entries', function(){

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('has at least one entry', function(done){
            expect($('.feed .entry').length>0).toBe(true);
            done();
        });

    });
    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let oldFeed, newFeed;
        // the beforeEach section establishes the change in content based on the title
        beforeEach(function(done){
            loadFeed(0, function(){
                oldFeed=$('.feed').text();
                loadFeed(1, function(){
                    newFeed=$('.feed').text();
                    done();
                });
            });
        });
        it('changes content', function(){
            expect(oldFeed===newFeed).toBe(false);
        });
     });
}());
