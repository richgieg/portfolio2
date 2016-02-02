
// Execute when the DOM is fully-loaded
$(function() {

    // Class indentifier variables
    var activeClass = 'active';
    var introClass = 'intro';
    var skillClass = 'skill';
    var skillHighlightClass = 'highlight';

    // Acquire jQuery objects for elements
    var $body = $('body');
    var $projectTiles = $('.pj-container');
    var $projectLinks = $('.pj-link');

    // Skill animation interval
    var skillAnimationInterval = null;


    // Flip through the project tiles
    function animateProjectTiles() {
        var index = 0;

        // Prevent scrollbars from appearing during animation
        $body.addClass(introClass);

        // Iterate over the projects using an interval
        var interval = setInterval(function() {
            if (index < $projectTiles.length) {
                $projectTiles.eq(index - 1).removeClass(activeClass);
                $projectTiles.eq(index).addClass(activeClass);
            } else {
                $projectTiles.eq(index - 1).removeClass(activeClass);
                setTimeout(function() {
                    $body.removeClass(introClass);
                }, 200);
                clearInterval(interval);
            }
            index++;
        }, 500);
    }


    // Expand tile when project's link is clicked
    function projectLinkClickHandler(e) {
        var $this = $(this);
        var $activeLink = $projectLinks.filter('.' + activeClass);
        var $activeTile = $projectTiles.filter('.' + activeClass);
        var linkIndex = $projectLinks.index($this);

        // If a tile is currently active, it must be deactivated
        if ($activeTile.length > 0) {
            // Deactivate the active tile
            $activeLink.removeClass(activeClass);
            $activeTile.removeClass(activeClass);

            // If the clicked link does not belong to the previously-active
            // tile, activate the tile associated with the clicked link
            if (linkIndex !== $projectTiles.index($activeTile)) {
                setTimeout(function() {
                    $this.addClass(activeClass);
                    $projectTiles.eq(linkIndex).addClass(activeClass);
                }, 350);
            }

        // Otherwise, just activate the desired tile
        } else {
            $this.addClass(activeClass);
            $projectTiles.eq(linkIndex).addClass(activeClass);
        }

        // Prevent the link from being followed
        e.preventDefault();
    }


    // Wire up the project link click handler (expands project content)
    $projectLinks.click(projectLinkClickHandler);

    // Wire up the project link mouseenter handler (animates skills)
    $projectLinks.on('mouseenter', function(e) {
        var $this = $(this);
        var $skills = $this.find('.' + skillClass);

        // Toggle the highlight class on each skill element in order to provide
        // an animation effect
        var animate = function() {
            $skills.each(function(index) {
                var $skill = $(this);
                var delay = index * 150;

                // The first timeout adds the highlight class, while the
                // second timeout removes it
                setTimeout(function() {
                    $skill.addClass(skillHighlightClass);
                    setTimeout(function() {
                        $skill.removeClass(skillHighlightClass);
                    }, 350);
                }, delay);
            });
        };

        // Immediately call the animate function, then set the interval timer
        // to call it from then on
        animate();
        skillAnimationInterval = setInterval(animate, 2500);
    });

    // Wire up the project link mouseleave handler (stops animating skills)
    $projectLinks.on('mouseleave', function(e) {
        // If currently animating, stop
        if (skillAnimationInterval) {
            clearInterval(skillAnimationInterval);
            skillAnimationInterval = null;
        }
    });

    // Perform intro animation
    animateProjectTiles($projectTiles);
});
