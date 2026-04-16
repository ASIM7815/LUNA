(function () {
  'use strict';

  console.log('Admission Form Popup Handler loaded');

  var WHATSAPP_NUMBER = '918686300801';
  var FORM_SHOWN_KEY = 'islec_admission_form_v3';

  function hasFormBeenShown() {
    return localStorage.getItem(FORM_SHOWN_KEY) === 'true';
  }

  function markFormAsShown() {
    localStorage.setItem(FORM_SHOWN_KEY, 'true');
  }

  function createFormElement(type, attributes, styles) {
    var element = document.createElement(type);
    if (attributes) {
      for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          element.setAttribute(key, attributes[key]);
        }
      }
    }
    if (styles) {
      element.style.cssText = styles;
    }
    return element;
  }

  function createFormField(labelText, inputElement) {
    var fieldDiv = createFormElement('div', null, 'margin-bottom: 16px;');
    var label = createFormElement('label', null, 'display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;');
    label.textContent = labelText;
    fieldDiv.appendChild(label);
    fieldDiv.appendChild(inputElement);
    return fieldDiv;
  }

  function createTextInput(name, required, placeholder) {
    return createFormElement('input', {
      type: 'text',
      name: name,
      required: required ? 'required' : null,
      placeholder: placeholder || ''
    }, 'width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; font-family: inherit;');
  }

  function createSelect(name, id, required, options) {
    var select = createFormElement('select', {
      name: name,
      id: id,
      required: required ? 'required' : null
    }, 'width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; background: white; cursor: pointer; font-family: inherit;');
    
    options.forEach(function(opt) {
      var option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.text;
      select.appendChild(option);
    });
    
    return select;
  }

  function createModal() {
    var overlay = createFormElement('div', { id: 'admission-form-overlay' }, 
      'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.75); z-index: 99999; display: flex; justify-content: center; align-items: center; padding: 20px; overflow-y: auto;'
    );

    var modal = createFormElement('div', null,
      'background: white; border-radius: 12px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); position: relative; margin: auto;'
    );

    // Header
    var header = createFormElement('div', null,
      'background: linear-gradient(135deg, #192f59 0%, #2d5aa0 100%); color: white; padding: 24px; border-radius: 12px 12px 0 0; position: relative;'
    );

    var title = createFormElement('h2', null, 'margin: 0 0 8px 0; font-size: 22px; font-weight: 600;');
    title.textContent = 'ISL Engineering College - Admission Form';

    var subtitle = createFormElement('p', null, 'margin: 0; font-size: 14px; opacity: 0.9;');
    subtitle.textContent = 'Please fill in your details to apply for admission';

    var closeBtn = createFormElement('button', { type: 'button' },
      'position: absolute; top: 16px; right: 16px; background: transparent; border: none; color: white; font-size: 32px; cursor: pointer; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; line-height: 1;'
    );
    closeBtn.innerHTML = '&times;';
    closeBtn.onmouseover = function() { this.style.background = 'rgba(255, 255, 255, 0.2)'; };
    closeBtn.onmouseout = function() { this.style.background = 'transparent'; };
    closeBtn.onclick = function() {
      markFormAsShown();
      document.body.removeChild(overlay);
    };

    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(closeBtn);

    // Form Container
    var formContainer = createFormElement('div', null, 'padding: 24px;');
    var form = createFormElement('form', { id: 'admission-form' });

    // Full Name
    var fullNameInput = createTextInput('fullName', true, 'Enter your full name');
    form.appendChild(createFormField('Full Name *', fullNameInput));

    // Mobile Number
    var mobileInput = createFormElement('input', {
      type: 'tel',
      name: 'mobile',
      required: 'required',
      pattern: '[0-9]{10}',
      placeholder: 'Enter 10-digit mobile number'
    }, 'width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; font-family: inherit;');
    form.appendChild(createFormField('Mobile Number *', mobileInput));

    // Email
    var emailInput = createFormElement('input', {
      type: 'email',
      name: 'email',
      required: 'required',
      placeholder: 'Enter your email address'
    }, 'width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; font-family: inherit;');
    form.appendChild(createFormField('Email Address *', emailInput));

    // Course Selection
    var courseSelect = createSelect('course', 'courseSelect', true, [
      { value: '', text: 'Select Course' },
      { value: 'B.E', text: 'B.E (Bachelor of Engineering)' },
      { value: 'PHARMACY', text: 'PHARMACY' },
      { value: 'MBA', text: 'MBA' },
      { value: 'M.TECH', text: 'M.TECH' }
    ]);
    form.appendChild(createFormField('Course Interested In *', courseSelect));

    // B.E Specialization (hidden initially)
    var beSpecSelect = createSelect('beSpecialization', 'beSpecialization', false, [
      { value: '', text: 'Select Specialization' },
      { value: 'Computer Science Engineering', text: 'Computer Science Engineering' },
      { value: 'Electronics and Communication Engineering', text: 'Electronics and Communication Engineering' },
      { value: 'Electrical and Electronics Engineering', text: 'Electrical and Electronics Engineering' },
      { value: 'Mechanical Engineering', text: 'Mechanical Engineering' },
      { value: 'Civil Engineering', text: 'Civil Engineering' }
    ]);
    var beSpecDiv = createFormField('B.E Specialization *', beSpecSelect);
    beSpecDiv.style.display = 'none';
    beSpecDiv.id = 'beSpecializationDiv';
    form.appendChild(beSpecDiv);

    // M.TECH Specialization (hidden initially)
    var mtechSpecSelect = createSelect('mtechSpecialization', 'mtechSpecialization', false, [
      { value: '', text: 'Select Specialization' },
      { value: 'Computer Science Engineering', text: 'Computer Science Engineering' },
      { value: 'VLSI', text: 'VLSI' },
      { value: 'Power Systems', text: 'Power Systems' },
      { value: 'Structural Engineering', text: 'Structural Engineering' }
    ]);
    var mtechSpecDiv = createFormField('M.TECH Specialization *', mtechSpecSelect);
    mtechSpecDiv.style.display = 'none';
    mtechSpecDiv.id = 'mtechSpecializationDiv';
    form.appendChild(mtechSpecDiv);

    // Intermediate Percentage (hidden initially)
    var interPercentInput = createTextInput('intermediatePercentage', false, 'e.g., 85%');
    var interPercentDiv = createFormField('Intermediate Percentage *', interPercentInput);
    interPercentDiv.style.display = 'none';
    interPercentDiv.id = 'intermediatePercentageDiv';
    form.appendChild(interPercentDiv);

    // Graduation Percentage (hidden initially)
    var gradPercentInput = createTextInput('graduationPercentage', false, 'e.g., 75%');
    var gradPercentDiv = createFormField('Graduation Percentage *', gradPercentInput);
    gradPercentDiv.style.display = 'none';
    gradPercentDiv.id = 'graduationPercentageDiv';
    form.appendChild(gradPercentDiv);

    // City
    var cityInput = createTextInput('city', true, 'Enter your city');
    form.appendChild(createFormField('City *', cityInput));

    // Message (Optional)
    var messageTextarea = createFormElement('textarea', {
      name: 'message',
      rows: '3',
      placeholder: 'Any additional information (optional)'
    }, 'width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; resize: vertical; font-family: inherit;');
    form.appendChild(createFormField('Message (Optional)', messageTextarea));

    // Submit Button
    var submitBtn = createFormElement('button', { type: 'submit' },
      'width: 100%; padding: 14px; background: linear-gradient(135deg, #192f59 0%, #2d5aa0 100%); color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-top: 8px;'
    );
    submitBtn.textContent = 'Submit Application';
    submitBtn.onmouseover = function() { this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 4px 12px rgba(25, 47, 89, 0.3)'; };
    submitBtn.onmouseout = function() { this.style.transform = 'translateY(0)'; this.style.boxShadow = 'none'; };
    form.appendChild(submitBtn);

    // Dynamic form behavior
    courseSelect.addEventListener('change', function() {
      var course = this.value;
      
      // Hide all conditional fields
      beSpecDiv.style.display = 'none';
      mtechSpecDiv.style.display = 'none';
      interPercentDiv.style.display = 'none';
      gradPercentDiv.style.display = 'none';
      
      // Remove required
      beSpecSelect.removeAttribute('required');
      mtechSpecSelect.removeAttribute('required');
      interPercentInput.removeAttribute('required');
      gradPercentInput.removeAttribute('required');
      
      // Clear values
      beSpecSelect.value = '';
      mtechSpecSelect.value = '';
      interPercentInput.value = '';
      gradPercentInput.value = '';

      // Show relevant fields
      if (course === 'B.E') {
        beSpecDiv.style.display = 'block';
        beSpecSelect.setAttribute('required', 'required');
        interPercentDiv.style.display = 'block';
        interPercentInput.setAttribute('required', 'required');
      } else if (course === 'PHARMACY') {
        interPercentDiv.style.display = 'block';
        interPercentInput.setAttribute('required', 'required');
      } else if (course === 'MBA') {
        gradPercentDiv.style.display = 'block';
        gradPercentInput.setAttribute('required', 'required');
      } else if (course === 'M.TECH') {
        mtechSpecDiv.style.display = 'block';
        mtechSpecSelect.setAttribute('required', 'required');
        gradPercentDiv.style.display = 'block';
        gradPercentInput.setAttribute('required', 'required');
      }
    });

    // Form submission
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

  function handleFormSubmit(form, overlay) {
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
    message += '*Email:* ' + data.email + '\n';
    message += '*Course:* ' + courseInfo + '\n';
    
    if (data.course === 'B.E' || data.course === 'PHARMACY') {
      message += '*Intermediate Percentage:* ' + data.intermediatePercentage + '\n';
    } else if (data.course === 'MBA' || data.course === 'M.TECH') {
      message += '*Graduation Percentage:* ' + data.graduationPercentage + '\n';
    }
    
    message += '*City:* ' + data.city + '\n';
    if (data.message) {
      message += '*Message:* ' + data.message + '\n';
    }
    message += '\n_Submitted via Website_';

    var whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);

    showSuccessMessage(overlay);
    markFormAsShown();

    setTimeout(function() {
      window.open(whatsappURL, '_blank');
      document.body.removeChild(overlay);
    }, 1500);
  }

  function showSuccessMessage(overlay) {
    var modal = overlay.querySelector('div');
    modal.innerHTML = '<div style="padding: 60px 40px; text-align: center;">' +
      '<div style="width: 80px; height: 80px; background: #4CAF50; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">' +
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
      '<polyline points="20 6 9 17 4 12"></polyline></svg></div>' +
      '<h2 style="color: #192f59; margin: 0 0 12px 0; font-size: 24px;">Thank You!</h2>' +
      '<p style="color: #666; margin: 0 0 8px 0; font-size: 16px;">Your application has been submitted successfully.</p>' +
      '<p style="color: #666; margin: 0; font-size: 14px;">Redirecting to WhatsApp...</p></div>';
  }

  function showAdmissionForm() {
    if (hasFormBeenShown()) {
      console.log('Admission form already shown');
      return;
    }
    var modal = createModal();
    document.body.appendChild(modal);
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(showAdmissionForm, 1000);
      });
    } else {
      setTimeout(showAdmissionForm, 1000);
    }
  }

  init();
})();
