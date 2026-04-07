import { useState } from "react";

export default function InputForm({ setCVData, onSubmit, initialData }) {
  const [personalInfo, setPersonalInfo] = useState({
    name: initialData.name || "",
    phone: initialData.phone ||  "",
    email: initialData.email || "",
  });

  const [education, setEducation] = useState(initialData.education || []);

  const [educationInput, setEducationInput] = useState({
    school: "",
    startYear: "",
    endYear: "",
  });

  const [experience, setExperience] = useState(initialData.experience || []);

  const [experienceInput, setExperienceInput] = useState({
    job: "",
    startYear: "",
    endYear: "",
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const addEducation = () => {
    if (
      !educationInput.school ||
      !educationInput.startYear ||
      !educationInput.endYear
    ) {
      alert("Please fill in fields");
      return;
    }

    const newEducation = {
      id: Date.now(),
      school: educationInput.school,
      startYear: educationInput.startYear,
      endYear: educationInput.endYear,
    };

    setEducation([...education, newEducation]);

    setEducationInput({ school: "", startYear: "", endYear: "" });
  };

  const removeEducation = (id) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const addExperience = () => {
    if (
      !experienceInput.job ||
      !experienceInput.startYear ||
      !experienceInput.endYear
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newExperience = {
      id: Date.now(),
      job: experienceInput.job,
      startYear: experienceInput.startYear,
      endYear: experienceInput.endYear,
    };

    setExperience([...experience, newExperience]);

    setExperienceInput({ job: "", startYear: "", endYear: "" });
  };

  const removeExperience = (id) => {
    setExperience(experience.filter((exp) => exp.id !== id));
  };

  const handleSubmit = () => {
    setCVData({
      name: personalInfo.name,
      phone: personalInfo.phone,
      email: personalInfo.email,
      education: education,
      experience: experience,
    });
    onSubmit();
  };

  return (
    <form>
      <h2>Update CV</h2>
      <div className="personalInfo">
        <h3>Personal Information</h3>
        <label htmlFor="fullName">Full name:</label>
        <input
          type="text"
          id="fullName"
          name="name"
          autoComplete="name"
          value={personalInfo.name}
          onChange={handlePersonalChange}
        />
        <label htmlFor="mobileNum">Mobile number:</label>
        <input
          type="tel"
          id="mobileNum"
          name="phone"
          autoComplete="tel"
          value={personalInfo.phone}
          onChange={handlePersonalChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={personalInfo.email}
          onChange={handlePersonalChange}
        />
      </div>
      <fieldset>
        <legend>Education</legend>
        <ul>
          {education.map((edu) => (
            <li key={edu.id}>
              {edu.school} ({edu.startYear} - {edu.endYear})
              <button type="button" onClick={() => removeEducation(edu.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            name="school"
            placeholder="School name"
            value={educationInput.school}
            onChange={(e) =>
              setEducationInput({ ...educationInput, school: e.target.value })
            }
          />
          <input
            type="number"
            name="startYear"
            placeholder="Start year"
            value={educationInput.startYear}
            onChange={(e) =>
              setEducationInput({
                ...educationInput,
                startYear: e.target.value,
              })
            }
          />
          <input
            type="number"
            name="endYear"
            placeholder="End year"
            value={educationInput.endYear}
            onChange={(e) =>
              setEducationInput({ ...educationInput, endYear: e.target.value })
            }
          />
          <button type="button" onClick={addEducation}>
            Add
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Experience</legend>

        <ul>
          {experience.map((exp) => (
            <li key={exp.id}>
              {exp.job} ({exp.startYear} - {exp.endYear})
              <button type="button" onClick={() => removeExperience(exp.id)}>
                X
              </button>
            </li>
          ))}
        </ul>

        <div>
          <input
            type="text"
            name="job"
            placeholder="Job name"
            value={experienceInput.job}
            onChange={(e) =>
              setExperienceInput({ ...experienceInput, job: e.target.value })
            }
          />
          <input
            type="number"
            name="startYear"
            placeholder="Start year"
            value={experienceInput.startYear}
            onChange={(e) =>
              setExperienceInput({
                ...experienceInput,
                startYear: e.target.value,
              })
            }
          />
          <input
            type="number"
            name="endYear"
            placeholder="End year"
            value={experienceInput.endYear}
            onChange={(e) =>
              setExperienceInput({
                ...experienceInput,
                endYear: e.target.value,
              })
            }
          />
          <button type="button" onClick={addExperience}>
            Add
          </button>
        </div>
      </fieldset>

      <button type="button" onClick={handleSubmit}>
        Generate CV
      </button>
    </form>
  );
}
