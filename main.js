document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c;
    var toggleButton = document.getElementById("toggleSkillsButton");
    var skillsSection = document.getElementById("Skills");
    toggleButton === null || toggleButton === void 0 ? void 0 : toggleButton.addEventListener('click', function () {
        skillsSection.style.display = skillsSection.style.display === 'none' ? 'block' : 'none';
    });
    (_a = document.getElementById('profileImage')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (e) {
        var _a;
        var input = e.target;
        var file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        var preview = document.getElementById('preview');
        if (file) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
        }
    });
    (_b = document.getElementById('generateResumeButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        var form = document.getElementById('ResumeForm');
        if (form) {
            form.requestSubmit();
        }
    });
    (_c = document.getElementById("ResumeForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", function (event) {
        var _a, _b;
        event.preventDefault();
        var nameElement = document.getElementById("Name");
        var EmailElement = document.getElementById("Email");
        var PhoneNumberElement = document.getElementById("PhoneNumber");
        var EducationElement = document.getElementById("Education");
        var ExperienceElement = document.getElementById("Experience");
        var SkillsElement = document.getElementById("Skills");
        var previewImage = document.getElementById('preview').src;
        var usernameElement = document.getElementById("username");
        if (nameElement && EmailElement && PhoneNumberElement && EducationElement && ExperienceElement && SkillsElement && usernameElement) {
            var name_1 = nameElement.value;
            var Email = EmailElement.value;
            var PhoneNumber = PhoneNumberElement.value;
            var Education = EducationElement.value;
            var Experience = ExperienceElement.value;
            var Skills = SkillsElement.value;
            var username_1 = usernameElement.value;
            var uniquePath = "resume/".concat(username_1.replace(/\s+/g, "_"), "_cv.html");
            var ResumeGenerator = "\n              <h2>Dynamic Resume</h2>\n              <img src=\"".concat(previewImage, "\" alt=\"Profile Image\" style=\"width: 150px; height: 150px; border-radius: 50%;\"><br>\n              <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n              <p><strong>Email:</strong> <span id=\"edit-Email\" class=\"editable\">").concat(Email, "</span></p>\n              <p><strong>Number:</strong> <span id=\"edit-PhoneNumber\" class=\"editable\">").concat(PhoneNumber, "</span></p>\n              <h3>Education</h3>\n              <p id=\"edit-Education\" class=\"editable\">").concat(Education, "</p>\n              <h3>Experience</h3>\n              <p id=\"edit-Experience\" class=\"editable\">").concat(Experience, "</p>\n              <h3>Skills</h3>\n              <p id=\"edit-Skills\" class=\"editable\">").concat(Skills, "</p>");
            var downloadLink = document.createElement("a");
            downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(ResumeGenerator);
            downloadLink.download = uniquePath;
            downloadLink.textContent = "Download Your Resume";
            var ResumeGeneratorElement = document.getElementById("ResumeGenerator");
            if (ResumeGeneratorElement) {
                ResumeGeneratorElement.innerHTML = ResumeGenerator;
                ResumeGeneratorElement.appendChild(downloadLink);
            }
            else {
                console.error("The Resume Generator Element is Missing");
            }
            (_a = document.getElementById('shareResumeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                var formElement = document.getElementById("ResumeForm");
                if (formElement) {
                    var formData = new URLSearchParams(new FormData(formElement));
                    var shareableLink = "".concat(window.location.origin, "?").concat(formData.toString());
                    alert("Share this link: ".concat(shareableLink));
                }
            });
            (_b = document.getElementById('downloadPDFButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
                var element = document.getElementById("ResumeGenerator");
                if (element) {
                    html2pdf().from(element).save("".concat(username_1.replace(/\s+/g, "_"), "_resume.pdf"));
                }
                else {
                    console.error("The Resume Generator Element is Missing");
                }
            });
            makeEditable();
        }
    });
    function makeEditable() {
        var editableElements = document.querySelectorAll(".editable");
        editableElements.forEach(function (element) {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            var input = document.createElement("input");
            input.type = "text";
            input.value = currentValue;
            input.classList.add("editing-input");
            input.addEventListener("blur", function () {
                currentElement.textContent = input.value;
                currentElement.style.display = "inline";
                input.remove();
            });
            currentElement.style.display = "none";
            (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input, currentElement);
            input.focus();
        });
    }
});
