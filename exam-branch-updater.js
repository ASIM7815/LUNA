(function() {
    'use strict';
    
    console.log('Exam Branch Updater Script Loaded');
    
    var updateAttempts = 0;
    var maxAttempts = 20;
    var sectionAdded = false;
    
    function updateExamBranchContent() {
        updateAttempts++;
        console.log('Exam Branch Update Attempt #' + updateAttempts);
        
        // Find all text nodes and paragraphs that contain the text to remove
        function removeUnwantedText() {
            var removed = false;
            
            // Check all paragraphs
            var paragraphs = document.querySelectorAll('p');
            paragraphs.forEach(function(p) {
                if (p.textContent.includes('Principal is the Chief Controller of Examinations')) {
                    console.log('Found text to remove in paragraph');
                    p.innerHTML = p.innerHTML.replace(/,?\s*and the Principal is the Chief Controller of Examinations\.?/gi, '.');
                    removed = true;
                }
            });
            
            // Check all divs
            var divs = document.querySelectorAll('div');
            divs.forEach(function(div) {
                if (div.textContent.includes('Principal is the Chief Controller of Examinations') && !div.querySelector('p')) {
                    console.log('Found text to remove in div');
                    div.innerHTML = div.innerHTML.replace(/,?\s*and the Principal is the Chief Controller of Examinations\.?/gi, '.');
                    removed = true;
                }
            });
            
            if (removed) {
                console.log('Successfully removed unwanted text');
            }
            
            return removed;
        }
        
        // Add the new Controller of Examinations section
        function addControllerSection() {
            // Check if controller section already exists
            if (document.getElementById('controller-section-custom')) {
                console.log('Controller section already exists');
                return true;
            }
            
            // Find the about exam branch section
            var aboutSection = null;
            var allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            
            for (var i = 0; i < allHeadings.length; i++) {
                var heading = allHeadings[i];
                var text = heading.textContent.toLowerCase().trim();
                if (text.includes('about exam branch') || text === 'exam branch') {
                    aboutSection = heading;
                    console.log('Found About Exam Branch heading:', heading.tagName);
                    break;
                }
            }
            
            if (!aboutSection) {
                console.log('About Exam Branch section not found yet...');
                return false;
            }
            
            // Find the container to insert into
            var container = aboutSection.parentElement;
            
            // Find where to insert - after the about section content
            var insertAfter = aboutSection;
            var sibling = aboutSection.nextElementSibling;
            
            // Skip paragraphs that are part of the about section
            while (sibling && sibling.tagName === 'P') {
                insertAfter = sibling;
                sibling = sibling.nextElementSibling;
            }
            
            // Create the new section
            var controllerSection = document.createElement('div');
            controllerSection.id = 'controller-section-custom';
            controllerSection.style.cssText = 'margin-top: 40px; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
            
            controllerSection.innerHTML = '<h3 style="color: #192f59; font-size: 28px; margin-bottom: 25px; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">OUR HONOURABLE Controller of Examinations</h3>' +
                '<div style="display: flex; align-items: center; gap: 30px; flex-wrap: wrap; background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">' +
                '<div style="flex-shrink: 0;"><img src="./rabbanisir.jpeg" alt="Dr. M.A. RABBANI" style="width: 200px; height: 250px; object-fit: cover; border-radius: 10px; border: 4px solid #192f59; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /></div>' +
                '<div style="flex: 1; min-width: 300px;">' +
                '<h4 style="color: #2d5aa0; font-size: 20px; margin: 0 0 8px 0; font-weight: 600;">Chief Superintendent</h4>' +
                '<h5 style="color: #192f59; font-size: 24px; margin: 0 0 5px 0; font-weight: 700;">Dr. M.A. RABBANI</h5>' +
                '<p style="color: #666; font-size: 16px; margin: 0 0 15px 0; font-style: italic;">B.E., M.E., Ph.D.</p>' +
                '<p style="color: #444; font-size: 15px; line-height: 1.7; margin: 0; text-align: justify;">Dr. M.A. Rabbani serves as our esteemed Controller of Examinations, bringing extensive academic expertise and administrative excellence to ensure the highest standards in our examination processes. With his distinguished qualifications and years of experience, he leads the examination branch with dedication and integrity, maintaining the academic rigor and fairness that ISL Engineering College is known for.</p>' +
                '</div></div>';
            
            // Insert the section
            if (insertAfter.nextSibling) {
                container.insertBefore(controllerSection, insertAfter.nextSibling);
            } else {
                container.appendChild(controllerSection);
            }
            
            console.log('✓ Controller of Examinations section added successfully!');
            sectionAdded = true;
            return true;
        }
        
        // Execute the updates
        var textRemoved = removeUnwantedText();
        var sectionAddedNow = addControllerSection();
        
        // If we haven't succeeded and haven't exceeded max attempts, try again
        if (!sectionAddedNow && updateAttempts < maxAttempts) {
            setTimeout(updateExamBranchContent, 500);
        } else if (sectionAddedNow) {
            console.log('✓ Exam Branch page updated successfully!');
        } else {
            console.log('Max attempts reached. Section may not be on this page.');
        }
    }
    
    // Wait for React to render
    function waitForReact() {
        var root = document.getElementById('root');
        if (root && root.children.length > 0) {
            console.log('React app detected, starting updates...');
            setTimeout(updateExamBranchContent, 500);
            setTimeout(updateExamBranchContent, 1500);
            setTimeout(updateExamBranchContent, 3000);
        } else {
            setTimeout(waitForReact, 100);
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForReact);
    } else {
        waitForReact();
    }
    
    // Watch for route changes (for single-page applications)
    var lastUrl = location.href;
    var observer = new MutationObserver(function() {
        var url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            if (url.includes('exambranch') || url.includes('exam')) {
                console.log('Route changed to exam branch, updating...');
                updateAttempts = 0;
                sectionAdded = false;
                setTimeout(updateExamBranchContent, 300);
            }
        }
    });
    
    observer.observe(document.body, { subtree: true, childList: true });
    
    console.log('✓ Exam Branch updater initialized and watching for changes');
})();
