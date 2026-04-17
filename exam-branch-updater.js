(function() {
    'use strict';
    
    function updateExamBranchContent() {
        // Wait for the page to be fully loaded
        if (document.readyState !== 'complete') {
            return;
        }
        
        // Find all text nodes and paragraphs that contain the text to remove
        function removeUnwantedText() {
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const nodesToUpdate = [];
            let node;
            
            while (node = walker.nextNode()) {
                if (node.nodeValue && node.nodeValue.includes('Principal is the Chief Controller of Examinations')) {
                    nodesToUpdate.push(node);
                }
            }
            
            nodesToUpdate.forEach(node => {
                node.nodeValue = node.nodeValue.replace(/,?\s*and the Principal is the Chief Controller of Examinations\.?/gi, '.');
            });
            
            // Also check paragraphs
            const paragraphs = document.querySelectorAll('p');
            paragraphs.forEach(p => {
                if (p.textContent.includes('Principal is the Chief Controller of Examinations')) {
                    p.innerHTML = p.innerHTML.replace(/,?\s*and the Principal is the Chief Controller of Examinations\.?/gi, '.');
                }
            });
        }
        
        // Add the new Controller of Examinations section
        function addControllerSection() {
            // Find the exam branch section - look for headings or sections
            const possibleSelectors = [
                'h3:contains("About Exam Branch")',
                'h4:contains("About Exam Branch")',
                'h5:contains("About Exam Branch")',
                'h2:contains("About Exam Branch")'
            ];
            
            let aboutSection = null;
            
            // Find the about exam branch section
            const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            for (let heading of allHeadings) {
                if (heading.textContent.toLowerCase().includes('about exam branch')) {
                    aboutSection = heading;
                    break;
                }
            }
            
            if (!aboutSection) {
                console.log('About Exam Branch section not found, will try again...');
                return false;
            }
            
            // Check if controller section already exists
            if (document.getElementById('controller-section-custom')) {
                return true;
            }
            
            // Find the parent container
            let insertPoint = aboutSection.parentElement;
            
            // Find the next sibling or appropriate place to insert
            let currentElement = aboutSection;
            while (currentElement.nextElementSibling) {
                currentElement = currentElement.nextElementSibling;
                // Stop at the next major section
                if (currentElement.tagName.match(/^H[1-6]$/)) {
                    break;
                }
            }
            
            // Create the new section
            const controllerSection = document.createElement('div');
            controllerSection.id = 'controller-section-custom';
            controllerSection.style.cssText = 'margin-top: 40px; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
            
            controllerSection.innerHTML = `
                <h3 style="color: #192f59; font-size: 28px; margin-bottom: 25px; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                    OUR HONOURABLE Controller of Examinations
                </h3>
                <div style="display: flex; align-items: center; gap: 30px; flex-wrap: wrap; background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <div style="flex-shrink: 0;">
                        <img src="./rabbanisir.jpeg" alt="Dr. M.A. RABBANI" style="width: 200px; height: 250px; object-fit: cover; border-radius: 10px; border: 4px solid #192f59; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
                    </div>
                    <div style="flex: 1; min-width: 300px;">
                        <h4 style="color: #2d5aa0; font-size: 20px; margin: 0 0 8px 0; font-weight: 600;">
                            Chief Superintendent
                        </h4>
                        <h5 style="color: #192f59; font-size: 24px; margin: 0 0 5px 0; font-weight: 700;">
                            Dr. M.A. RABBANI
                        </h5>
                        <p style="color: #666; font-size: 16px; margin: 0 0 15px 0; font-style: italic;">
                            B.E., M.E., Ph.D.
                        </p>
                        <p style="color: #444; font-size: 15px; line-height: 1.7; margin: 0; text-align: justify;">
                            Dr. M.A. Rabbani serves as our esteemed Controller of Examinations, bringing extensive academic expertise 
                            and administrative excellence to ensure the highest standards in our examination processes. With his 
                            distinguished qualifications and years of experience, he leads the examination branch with dedication 
                            and integrity, maintaining the academic rigor and fairness that ISL Engineering College is known for.
                        </p>
                    </div>
                </div>
            `;
            
            // Insert after the current section
            if (currentElement.nextElementSibling) {
                currentElement.parentElement.insertBefore(controllerSection, currentElement.nextElementSibling);
            } else {
                currentElement.parentElement.appendChild(controllerSection);
            }
            
            console.log('Controller of Examinations section added successfully');
            return true;
        }
        
        // Execute the updates
        removeUnwantedText();
        const added = addControllerSection();
        
        if (!added) {
            // If section wasn't added, try again after a short delay
            setTimeout(function() {
                addControllerSection();
            }, 1000);
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateExamBranchContent);
    } else {
        updateExamBranchContent();
    }
    
    // Also run after a delay to catch dynamically loaded content
    setTimeout(updateExamBranchContent, 1500);
    setTimeout(updateExamBranchContent, 3000);
    
    // Watch for route changes (for single-page applications)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            if (url.includes('exambranch') || url.includes('exam')) {
                setTimeout(updateExamBranchContent, 500);
            }
        }
    }).observe(document, { subtree: true, childList: true });
    
    console.log('Exam Branch updater initialized');
})();
