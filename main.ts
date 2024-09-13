declare const html2pdf: any;


document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById("toggleSkillsButton") as HTMLButtonElement;
  const skillsSection = document.getElementById("Skills") as HTMLElement;

  toggleButton?.addEventListener('click', () => {
      skillsSection.style.display = skillsSection.style.display === 'none' ? 'block' : 'none';
  });

  document.getElementById('profileImage')?.addEventListener('change', (e: Event) => {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0];
      const preview = document.getElementById('preview') as HTMLImageElement;
      if (file) {
          preview.src = URL.createObjectURL(file);
          preview.style.display = 'block'; 
          
      }
  });

  document.getElementById('generateResumeButton')?.addEventListener('click', () => {
      const form = document.getElementById('ResumeForm') as HTMLFormElement;
      if (form) {
          form.requestSubmit(); 
          
      }
  });

  document.getElementById("ResumeForm")?.addEventListener("submit", function (event: Event) {
      event.preventDefault();

      const nameElement = document.getElementById("Name") as HTMLInputElement;
      const EmailElement = document.getElementById("Email") as HTMLInputElement;
      const PhoneNumberElement = document.getElementById("PhoneNumber") as HTMLInputElement;
      const EducationElement = document.getElementById("Education") as HTMLTextAreaElement;
      const ExperienceElement = document.getElementById("Experience") as HTMLTextAreaElement;
      const SkillsElement = document.getElementById("Skills") as HTMLTextAreaElement;
      const previewImage = (document.getElementById('preview') as HTMLImageElement).src;
      const usernameElement = document.getElementById("username") as HTMLInputElement;

      if (nameElement && EmailElement && PhoneNumberElement && EducationElement && ExperienceElement && SkillsElement && usernameElement) {
          const name = nameElement.value; 
          const Email = EmailElement.value;
          const PhoneNumber = PhoneNumberElement.value;
          const Education = EducationElement.value;
          const Experience = ExperienceElement.value;
          const Skills = SkillsElement.value;
          const username = usernameElement.value;
          const uniquePath = `resume/${username.replace(/\s+/g, "_")}_cv.html`;

          const ResumeGenerator = `
              <h2>Dynamic Resume</h2>
              <img src="${previewImage}" alt="Profile Image" style="width: 150px; height: 150px; border-radius: 50%;"><br>
              <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
              <p><strong>Email:</strong> <span id="edit-Email" class="editable">${Email}</span></p>
              <p><strong>Number:</strong> <span id="edit-PhoneNumber" class="editable">${PhoneNumber}</span></p>
              <h3>Education</h3>
              <p id="edit-Education" class="editable">${Education}</p>
              <h3>Experience</h3>
              <p id="edit-Experience" class="editable">${Experience}</p>
              <h3>Skills</h3>
              <p id="edit-Skills" class="editable">${Skills}</p>`;

          const downloadLink = document.createElement("a");
          downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(ResumeGenerator);
          downloadLink.download = uniquePath;
          downloadLink.textContent = "Download Your Resume";

          const ResumeGeneratorElement = document.getElementById("ResumeGenerator");
          if (ResumeGeneratorElement) {
              ResumeGeneratorElement.innerHTML = ResumeGenerator;
              ResumeGeneratorElement.appendChild(downloadLink);
          } else {
              console.error("The Resume Generator Element is Missing");
          }

          document.getElementById('shareResumeButton')?.addEventListener('click', () => {
            const formElement = document.getElementById("ResumeForm") as HTMLFormElement;
            if (formElement) {
                const formData = new URLSearchParams(new FormData(formElement) as any);
                const shareableLink = `${window.location.origin}?${formData.toString()}`;
                alert(`Share this link: ${shareableLink}`);
            }
        });
        
        document.getElementById('downloadPDFButton')?.addEventListener('click', () => {
          const element = document.getElementById("ResumeGenerator") as HTMLElement;
          if (element) {
              html2pdf().from(element).save(`${username.replace(/\s+/g, "_")}_resume.pdf`);
          } else {
              console.error("The Resume Generator Element is Missing");
          }
      });
      

          makeEditable();
      }
  });

  function makeEditable() {
      const editableElements = document.querySelectorAll(".editable");
      editableElements.forEach(element => {
          const currentElement = element as HTMLElement;
          const currentValue = currentElement.textContent || "";

          const input = document.createElement("input");
          input.type = "text";
          input.value = currentValue;
          input.classList.add("editing-input");

          input.addEventListener("blur", function () {
              currentElement.textContent = input.value;
              currentElement.style.display = "inline";
              input.remove();
          });

          currentElement.style.display = "none";
          currentElement.parentNode?.insertBefore(input, currentElement);
          input.focus();
      });
  }
});
