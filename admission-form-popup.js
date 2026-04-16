(function () {
  'use strict';

  console.log('Admission Form Popup Handler loaded');

  var WHATSAPP_NUMBER = '918686300801'; // WhatsApp number with country code
  var FORM_SHOWN_KEY = 'islec_admission_form_shown_v2'; // Updated version key

  // Check if form has been shown before
  function hasFormBeenShown() {
    return localStorage.getItem(FORM_SHOWN_KEY) === 'true';
  }

  // Mark form as shown
  function markFormAsShown() {
    localStorage.setItem(FORM_SHOWN_KEY, 'true');
  }

  // Create modal overlay
  function createModal() {
    var overlay = document.createElement('div');
    overlay.id = 'admission-form-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 99999;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: auto;
      padding: 20px;
    `;

    var modal = document.createElement('div');
    modal.style.cssText = `
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      position: relative;
    `;

    var header = document.createElement('div');
    header.style.cssText = `
      background: linear-gradient(135deg, #192f59 0%, #2d5aa0 100%);
      color: white;
      padding: 24px;
      border-radius: 12px 12px 0 0;
      position: relative;
    `;

    var title = document.createElement('h2');
    title.textContent = 'ISL Engineering College - Admission Form';
    title.style.cssText = `
      margin: 0 0 8px 0;
      font-size: 22px;
      font-weight: 600;
    `;

    var subtitle = document.createElement('p');
    subtitle.textContent = 'Please fill in your details to apply for admission';
    subtitle.style.cssText = `
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    `;

    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      color: white;
      font-size: 32px;
      cursor: pointer;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
    `;
    closeBtn.onmouseover = function() { this.style.background = 'rgba(255, 255, 255, 0.2)'; };
    closeBtn.onmouseout = function() { this.style.background = 'transparent'; };
    closeBtn.onclick = function() {
      markFormAsShown();
      document.body.removeChild(overlay);
    };

    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(closeBtn);

    var formContainer = document.createElement('div');
    formContainer.style.cssText = `
      padding: 24px;
    `;

    var form = document.createElement('form');
    form.id = 'admission-form';

    var formHTML = `
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">Full Name *</label>
        <input type="text" name="fullName" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">Mobile Number *</label>
        <input type="tel" name="mobile" required pattern="[0-9]{10}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">Email Address *</label>
        <input type="email" name="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">Course Interested In *</label>
        <select name="course" id="courseSelect" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; appearance: auto; -webkit-appearance: menulist; -moz-appearance: menulist;">
          <option value="">Select Course</option>
          <option value="B.E">B.E (Bachelor of Engineering)</option>
          <option value="PHARMACY">PHARMACY</option>
          <option value="MBA">MBA</option>
          <option value="M.TECH">M.TECH</option>
        </select>
      </div>

      <div id="beSpecializationDiv" style="margin-bottom: 16px; display: none;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">B.E Specialization *</label>
        <select name="beSpecialization" id="beSpecialization" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; appearance: auto; -webkit-appearance: menulist; -moz-appearance: menulist;">
          <option value="">Select Specialization</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
          <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>
      </div>

      <div id="mtechSpecializationDiv" style="margin-bottom: 16px; display: none;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">M.TECH Specialization *</label>
        <select name="mtechSpecialization" id="mtechSpecialization" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; appearance: auto; -webkit-appearance: menulist; -moz-appearance: menulist;">
          <option value="">Select Specialization</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="VLSI">VLSI</option>
          <option value="Power Systems">Power Systems</option>
          <option value="Structural Engineering">Structural Engineering</option>
        </select>
      </div>

      <div id="intermediatePercentageDiv" style="margin-bottom: 16px; display: none;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">Intermediate Percentage *</label>
        <input type="text" name="intermediatePercentage" id="intermediatePercentage" placeholder="e.g., 85%" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>

      <div id="graduationPercentageDiv" style="margin-bottom: 16px; display: none;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">Graduation Percentage *</label>
        <input type="text" name="graduationPercentage" id="graduationPercentage" placeholder="e.g., 75%" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">City *</label>
        <input type="text" name="city" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333;">Message (Optional)</label>
        <textarea name="message" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; resize: vertical;"></textarea>
      </div>

      <button type="submit" style="width: 100%; padding: 14px; background: linear-gradient(135deg, #192f59 0%, #2d5aa0 100%); color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s;">
        Submit Application
      </button>
    `;

    form.innerHTML = formHTML;

    // Add dynamic form behavior
    var courseSelect = form.querySelector('#courseSelect');
    var beSpecializationDiv = form.querySelector('#beSpecializationDiv');
    var beSpecialization = form.querySelector('#beSpecialization');
    var mtechSpecializationDiv = form.querySelector('#mtechSpecializationDiv');
    var mtechSpecialization = form.querySelector('#mtechSpecialization');
    var intermediatePercentageDiv = form.querySelector('#intermediatePercentageDiv');
    var intermediatePercentage = form.querySelector('#intermediatePercentage');
    var graduationPercentageDiv = form.querySelector('#graduationPercentageDiv');
    var graduationPercentage = form.querySelector('#graduationPercentage');

    courseSelect.addEventListener('change', function() {
      var selectedCourse = this.value;
      
      // Hide all conditional fields first
      beSpecializationDiv.style.display = 'none';
      mtechSpecializationDiv.style.display = 'none';
      intermediatePercentageDiv.style.display = 'none';
      graduationPercentageDiv.style.display = 'none';
      
      // Remove required attributes
      beSpecialization.removeAttribute('required');
      mtechSpecialization.removeAttribute('required');
      intermediatePercentage.removeAttribute('required');
      graduationPercentage.removeAttribute('required');
      
      // Clear values
      beSpecialization.value = '';
      mtechSpecialization.value = '';
      intermediatePercentage.value = '';
      graduationPercentage.value = '';

      // Show relevant fields based on course selection
      if (selectedCourse === 'B.E') {
        beSpecializationDiv.style.display = 'block';
        beSpecialization.setAttribute('required', 'required');
        intermediatePercentageDiv.style.display = 'block';
        intermediatePercentage.setAttribute('required', 'required');
      } else if (selectedCourse === 'PHARMACY') {
        intermediatePercentageDiv.style.display = 'block';
        intermediatePercentage.setAttribute('required', 'required');
      } else if (selectedCourse === 'MBA') {
        graduationPercentageDiv.style.display = 'block';
        graduationPercentage.setAttribute('required', 'required');
      } else if (selectedCourse === 'M.TECH') {
        mtechSpecializationDiv.style.display = 'block';
        mtechSpecialization.setAttribute('required', 'required');
        graduationPercentageDiv.style.display = 'block';
        graduationPercentage.setAttribute('required', 'required');
      }
    });

    form.onsubmit = function(e) {
      e.preventDefault();
      handleFormSubmit(form, overlay);
    };

    formContainer.appendChild(form);
    modal.appendChild(header);
    modal.appendChild(formContainer);
    overlay.appendChild(modal);

    return overlay;
  }

  // Handle form submission
  function handleFormSubmit(form, overlay) {
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key) {
      data[key] = value;
    });

    // Build course information
    var courseInfo = data.course;
    if (data.course === 'B.E' && data.beSpecialization) {
      courseInfo = 'B.E - ' + data.beSpecialization;
    } else if (data.course === 'M.TECH' && data.mtechSpecialization) {
      courseInfo = 'M.TECH - ' + data.mtechSpecialization;
    }

    // Create WhatsApp message
    var message = `*New Admission Inquiry - ISL Engineering College*\n\n`;
    message += `*Name:* ${data.fullName}\n`;
    message += `*Mobile:* ${data.mobile}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Course:* ${courseInfo}\n`;
    
    // Add percentage based on course type
    if (data.course === 'B.E' || data.course === 'PHARMACY') {
      message += `*Intermediate Percentage:* ${data.intermediatePercentage}\n`;
    } else if (data.course === 'MBA' || data.course === 'M.TECH') {
      message += `*Graduation Percentage:* ${data.graduationPercentage}\n`;
    }
    
    message += `*City:* ${data.city}\n`;
    if (data.message) {
      message += `*Message:* ${data.message}\n`;
    }
    message += `\n_Submitted via Website_`;

    // Encode message for URL
    var encodedMessage = encodeURIComponent(message);
    var whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show success message
    showSuccessMessage(overlay);

    // Mark form as shown
    markFormAsShown();

    // Open WhatsApp after a short delay
    setTimeout(function() {
      window.open(whatsappURL, '_blank');
      document.body.removeChild(overlay);
    }, 1500);
  }

  // Show success message
  function showSuccessMessage(overlay) {
    var modal = overlay.querySelector('div');
    modal.innerHTML = `
      <div style="padding: 60px 40px; text-align: center;">
        <div style="width: 80px; height: 80px; background: #4CAF50; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 style="color: #192f59; margin: 0 0 12px 0; font-size: 24px;">Thank You!</h2>
        <p style="color: #666; margin: 0 0 8px 0; font-size: 16px;">Your application has been submitted successfully.</p>
        <p style="color: #666; margin: 0; font-size: 14px;">Redirecting to WhatsApp...</p>
      </div>
    `;
  }

  // Show the form
  function showAdmissionForm() {
    if (hasFormBeenShown()) {
      console.log('Admission form already shown to this user');
      return;
    }

    var modal = createModal();
    document.body.appendChild(modal);
  }

  // Initialize - show form after page loads
  function init() {
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(showAdmissionForm, 1000); // Show after 1 second
      });
    } else {
      setTimeout(showAdmissionForm, 1000);
    }
  }

  init();
})();
