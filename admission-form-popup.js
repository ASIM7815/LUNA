(function () {
  'use strict';

  var WHATSAPP_NUMBER = '918686300801';
  var FORM_SHOWN_KEY = 'islec_admission_v4';

  function hasFormBeenShown() {
    return localStorage.getItem(FORM_SHOWN_KEY) === 'true';
  }

  function markFormAsShown() {
    localStorage.setItem(FORM_SHOWN_KEY, 'true');
  }

  function showAdmissionForm() {
    if (hasFormBeenShown()) {
      console.log('Form already shown');
      return;
    }

    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'admission-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:99999;display:flex;justify-content:center;align-items:center;padding:20px;overflow-y:auto;';

    // Create modal
    var modal = document.createElement('div');
    modal.style.cssText = 'background:white;border-radius:12px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,0.3);';

    // Header
    var header = document.createElement('div');
    header.style.cssText = 'background:linear-gradient(135deg,#192f59 0%,#2d5aa0 100%);color:white;padding:24px;border-radius:12px 12px 0 0;position:relative;';
    header.innerHTML = '<h2 style="margin:0 0 8px 0;font-size:22px;font-weight:600;">ISL Engineering College - Admission Form</h2><p style="margin:0;font-size:14px;opacity:0.9;">Please fill in your details to apply for admission</p>';

    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.type = 'button';
    closeBtn.style.cssText = 'position:absolute;top:16px;right:16px;background:transparent;border:none;color:white;font-size:32px;cursor:pointer;width:36px;height:36px;border-radius:50%;line-height:1;';
    closeBtn.onclick = function() {
      markFormAsShown();
      document.body.removeChild(overlay);
    };
    header.appendChild(closeBtn);

    // Form container
    var formContainer = document.createElement('div');
    formContainer.style.cssText = 'padding:24px;';

    // Create form
    var form = document.createElement('form');
    form.innerHTML = `
      <div style="margin-bottom:16px;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">Full Name *</label>
        <input type="text" name="fullName" required placeholder="Enter your full name" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;">
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">Mobile Number *</label>
        <input type="tel" name="mobile" required pattern="[0-9]{10}" placeholder="Enter 10-digit mobile number" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;">
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">Course Interested In *</label>
        <select name="course" id="courseSelect" required style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;background:white;cursor:pointer;">
          <option value="">Select Course</option>
          <option value="B.E">B.E (Bachelor of Engineering)</option>
          <option value="PHARMACY">PHARMACY</option>
          <option value="MBA">MBA</option>
          <option value="M.TECH">M.TECH</option>
        </select>
      </div>

      <div id="beSpecDiv" style="margin-bottom:16px;display:none;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">B.E Specialization *</label>
        <select name="beSpecialization" id="beSpec" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;background:white;cursor:pointer;">
          <option value="">Select Specialization</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
          <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>
      </div>

      <div id="mtechSpecDiv" style="margin-bottom:16px;display:none;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">M.TECH Specialization *</label>
        <select name="mtechSpecialization" id="mtechSpec" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;background:white;cursor:pointer;">
          <option value="">Select Specialization</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="VLSI">VLSI</option>
          <option value="Power Systems">Power Systems</option>
          <option value="Structural Engineering">Structural Engineering</option>
        </select>
      </div>

      <div id="interPercentDiv" style="margin-bottom:16px;display:none;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">Intermediate Percentage *</label>
        <input type="text" name="intermediatePercentage" id="interPercent" placeholder="e.g., 85%" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;">
      </div>

      <div id="gradPercentDiv" style="margin-bottom:16px;display:none;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">Graduation Percentage *</label>
        <input type="text" name="graduationPercentage" id="gradPercent" placeholder="e.g., 75%" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;">
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">City *</label>
        <input type="text" name="city" required placeholder="Enter your city" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;">
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">Entrance Exam *</label>
        <select name="entranceExam" id="examSelect" required style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;background:white;cursor:pointer;">
          <option value="">Select Entrance Exam</option>
          <option value="EAPCET">EAPCET</option>
          <option value="ECET">ECET</option>
          <option value="ICET">ICET</option>
          <option value="PGECET">PGECET</option>
        </select>
      </div>

      <div id="rankDiv" style="margin-bottom:20px;display:none;">
        <label style="display:block;margin-bottom:6px;font-weight:500;color:#333;font-size:14px;">Rank *</label>
        <input type="text" name="rank" id="rankInput" required placeholder="Enter your rank" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;">
      </div>

      <button type="submit" style="width:100%;padding:14px;background:linear-gradient(135deg,#192f59 0%,#2d5aa0 100%);color:white;border:none;border-radius:6px;font-size:16px;font-weight:600;cursor:pointer;">Submit Application</button>
    `;

    // Add dynamic behavior
    var courseSelect = form.querySelector('#courseSelect');
    var beSpecDiv = form.querySelector('#beSpecDiv');
    var beSpec = form.querySelector('#beSpec');
    var mtechSpecDiv = form.querySelector('#mtechSpecDiv');
    var mtechSpec = form.querySelector('#mtechSpec');
    var interPercentDiv = form.querySelector('#interPercentDiv');
    var interPercent = form.querySelector('#interPercent');
    var gradPercentDiv = form.querySelector('#gradPercentDiv');
    var gradPercent = form.querySelector('#gradPercent');
    var examSelect = form.querySelector('#examSelect');
    var rankDiv = form.querySelector('#rankDiv');
    var rankInput = form.querySelector('#rankInput');

    courseSelect.addEventListener('change', function() {
      var course = this.value;
      
      // Hide all
      beSpecDiv.style.display = 'none';
      mtechSpecDiv.style.display = 'none';
      interPercentDiv.style.display = 'none';
      gradPercentDiv.style.display = 'none';
      
      // Remove required
      beSpec.removeAttribute('required');
      mtechSpec.removeAttribute('required');
      interPercent.removeAttribute('required');
      gradPercent.removeAttribute('required');
      
      // Clear values
      beSpec.value = '';
      mtechSpec.value = '';
      interPercent.value = '';
      gradPercent.value = '';

      // Show based on selection
      if (course === 'B.E') {
        beSpecDiv.style.display = 'block';
        beSpec.setAttribute('required', 'required');
        interPercentDiv.style.display = 'block';
        interPercent.setAttribute('required', 'required');
      } else if (course === 'PHARMACY') {
        interPercentDiv.style.display = 'block';
        interPercent.setAttribute('required', 'required');
      } else if (course === 'MBA') {
        gradPercentDiv.style.display = 'block';
        gradPercent.setAttribute('required', 'required');
      } else if (course === 'M.TECH') {
        mtechSpecDiv.style.display = 'block';
        mtechSpec.setAttribute('required', 'required');
        gradPercentDiv.style.display = 'block';
        gradPercent.setAttribute('required', 'required');
      }
    });

    examSelect.addEventListener('change', function() {
      if (this.value) {
        rankDiv.style.display = 'block';
        rankInput.setAttribute('required', 'required');
      } else {
        rankDiv.style.display = 'none';
        rankInput.removeAttribute('required');
        rankInput.value = '';
      }
    });

    // Form submission
    form.onsubmit = function(e) {
      e.preventDefault();
      
      var formData = new FormData(form);
      var data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });

      var courseInfo = data.course;
      if (data.course === 'B.E' && data.beSpecialization) {
        courseInfo = 'B.E - ' + data.beSpecialization;
      } else if (data.course === 'M.TECH' && data.mtechSpecialization) {
        courseInfo = 'M.TECH - ' + data.mtechSpecialization;
      }

      var message = '*New Admission Inquiry - ISL Engineering College*\n\n';
      message += '*Name:* ' + data.fullName + '\n';
      message += '*Mobile:* ' + data.mobile + '\n';
      message += '*Course:* ' + courseInfo + '\n';
      
      if (data.course === 'B.E' || data.course === 'PHARMACY') {
        message += '*Intermediate Percentage:* ' + data.intermediatePercentage + '\n';
      } else if (data.course === 'MBA' || data.course === 'M.TECH') {
        message += '*Graduation Percentage:* ' + data.graduationPercentage + '\n';
      }
      
      message += '*City:* ' + data.city + '\n';
      message += '*Entrance Exam:* ' + data.entranceExam + '\n';
      message += '*Rank:* ' + data.rank + '\n';
      message += '\n_Submitted via Website_';

      var whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);

      // Show success
      formContainer.innerHTML = '<div style="padding:40px;text-align:center;"><div style="width:80px;height:80px;background:#4CAF50;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div><h2 style="color:#192f59;margin:0 0 12px 0;font-size:24px;">Thank You!</h2><p style="color:#666;margin:0 0 8px 0;">Your application has been submitted.</p><p style="color:#666;margin:0;font-size:14px;">Redirecting to WhatsApp...</p></div>';

      markFormAsShown();

      setTimeout(function() {
        window.open(whatsappURL, '_blank');
        document.body.removeChild(overlay);
      }, 1500);
    };

    formContainer.appendChild(form);
    modal.appendChild(header);
    modal.appendChild(formContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(showAdmissionForm, 1000);
    });
  } else {
    setTimeout(showAdmissionForm, 1000);
  }
})();
