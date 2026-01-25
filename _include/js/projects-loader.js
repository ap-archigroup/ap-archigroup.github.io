/**
 * Dynamic Projects Loader for AP ArchiGroup
 * Loads projects from JSON and generates HTML + Fancybox handlers automatically
 */

(function($) {
    'use strict';

    var ProjectsLoader = {
        projects: [],
        currentLanguage: 'fr',
        basePath: '',
        
        /**
         * Initialize the projects loader
         */
        init: function(language) {
            this.currentLanguage = language || 'fr';
            this.loadProjects();
        },
        
        /**
         * Load projects from JSON file
         */
        loadProjects: function() {
            var self = this;
            
            $.ajax({
                url: this.basePath + 'projects/projects.json',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    self.projects = data.projects;
                    self.renderProjects();
                    self.initFancybox();
                },
                error: function(xhr, status, error) {
                    console.error('Failed to load projects:', error);
                    console.error('Status:', status);
                    console.error('Response:', xhr.responseText);
                }
            });
        },
        
        /**
         * Render all projects to the DOM
         */
        renderProjects: function() {
            var $container = $('#thumbs');
            if (!$container.length) {
                console.warn('Projects container #thumbs not found');
                return;
            }
            
            // Clear existing content
            $container.empty();
            
            // Sort projects by order
            var sortedProjects = this.projects.sort(function(a, b) {
                return a.order - b.order;
            });
            
            // Render each project
            sortedProjects.forEach(function(project) {
                var $item = this.createProjectItem(project);
                $container.append($item);
            }.bind(this));
            
            // Reinitialize isotope if it exists
            if (typeof $.fn.isotope !== 'undefined') {
                $container.imagesLoaded(function() {
                    $container.isotope('reloadItems');
                    $container.isotope({
                        itemSelector: '.item-thumbs',
                        layoutMode: 'fitRows'
                    });
                });
            }
        },
        
        /**
         * Create a single project item HTML element
         */
        createProjectItem: function(project) {
            var categories = project.category.join(' ');
            var title = project.title[this.currentLanguage] || project.title.fr;
            var subtitle = project.subtitle ? (project.subtitle[this.currentLanguage] || project.subtitle.fr) : '';
            
            var $li = $('<li>').addClass('item-thumbs span3 ' + categories);
            
            // Create link element
            var $link;
            if (project.link) {
                // External link or virtual tour
                $link = $('<a>')
                    .addClass('hover-wrap')
                    .attr('href', project.link)
                    .attr('target', project.link.startsWith('http') ? '_blank' : '_self');
            } else if (project.folder) {
                // Fancybox gallery
                $link = $('<a>')
                    .addClass('hover-wrap open_' + project.folder.replace(/\s+/g, '-'))
                    .attr('data-fancybox-group', 'gallery')
                    .attr('href', 'javascript:void(0)');
            } else {
                // No action (shouldn't happen)
                $link = $('<a>')
                    .addClass('hover-wrap')
                    .attr('href', 'javascript:void(0)');
            }
            
            // Add overlay
            $link.append($('<span>').addClass('overlay-img'));
            
            // Add text overlay
            var $textOverlay = $('<span>').addClass('overlay-text-thumb');
            if (title) {
                $textOverlay.append($('<p>').text(title));
            }
            if (subtitle) {
                // Handle multi-line subtitles
                var subtitleLines = subtitle.split(' - ');
                subtitleLines.forEach(function(line) {
                    $textOverlay.append($('<p>').text(line));
                });
            }
            $link.append($textOverlay);
            
            // Add preview image
            // If previewImage is not specified or empty, use default path
            var previewPath = project.previewImage;
            if (!previewPath && project.folder) {
                previewPath = 'projects/list_of_projects/' + project.folder + '/preview.jpg';
            }
            var $img = $('<img>').attr('src', previewPath).attr('alt', title);
            
            $li.append($link);
            $li.append($img);
            
            return $li;
        },
        
        /**
         * Initialize Fancybox for all projects
         */
        initFancybox: function() {
            var self = this;
            
            this.projects.forEach(function(project) {
                if (!project.folder) return; // Skip projects without galleries
                
                // Find all images in the project folder
                self.createFancyboxHandler(project);
            });
        },
        
        /**
         * Create Fancybox handler for a specific project
         */
        createFancyboxHandler: function(project) {
            var self = this;
            var selector = '.open_' + project.folder.replace(/\s+/g, '-');
            
            // Remove any existing handlers
            $(document).off('click', selector);
            
            // Create new handler
            $(document).on('click', selector, function(e) {
                e.preventDefault();
                
                // Dynamically discover images in the folder
                self.openFancyboxGallery(project);
                
                return false;
            });
        },
        
        /**
         * Open Fancybox gallery for a project
         */
        openFancyboxGallery: function(project) {
            var self = this;
            var folderPath = this.basePath + 'projects/list_of_projects/' + project.folder + '/';
            
            // Try to load images - we'll attempt common patterns
            var images = [];
            var maxImages = 50; // Maximum number to try
            var loadedCount = 0;
            var checkInterval;
            
            // Function to check if image exists
            var checkImage = function(index) {
                var extensions = ['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG'];
                var found = false;
                
                extensions.forEach(function(ext) {
                    if (found) return;
                    
                    var img = new Image();
                    var imgPath = folderPath + index + '.' + ext;
                    
                    img.onload = function() {
                        if (!found) {
                            found = true;
                            images.push({
                                href: imgPath,
                                title: ''
                            });
                            loadedCount++;
                        }
                    };
                    
                    img.onerror = function() {
                        // Image doesn't exist with this extension
                    };
                    
                    img.src = imgPath;
                });
            };
            
            // Check for images 1 through maxImages
            for (var i = 1; i <= maxImages; i++) {
                checkImage(i);
            }
            
            // Wait a bit for images to load, then open fancybox
            setTimeout(function() {
                if (images.length === 0) {
                    console.warn('No images found for project:', project.folder);
                    // Try to open with just a single image
                    images = [{
                        href: folderPath + '1.jpg',
                        title: ''
                    }];
                }
                
                // Sort images by number
                images.sort(function(a, b) {
                    var numA = parseInt(a.href.match(/\/(\d+)\./)[1]);
                    var numB = parseInt(b.href.match(/\/(\d+)\./)[1]);
                    return numA - numB;
                });
                
                $.fancybox.open(images, {
                    nextEffect: 'none',
                    prevEffect: 'none',
                    padding: 0,
                    helpers: {
                        title: {
                            type: 'none'
                        },
                        thumbs: {
                            width: 85,
                            height: 60,
                            source: function(item) {
                                return item.href;
                            }
                        }
                    }
                });
            }, 500); // Wait 500ms for images to be discovered
        }
    };
    
    // Make it globally accessible
    window.ProjectsLoader = ProjectsLoader;
    
})(jQuery);
