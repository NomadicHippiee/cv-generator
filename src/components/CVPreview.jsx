import html2pdf from "html2pdf.js";

export default function CVPreview({ cvData, onEdit }) {
  const hasData =
    cvData.name ||
    cvData.phone ||
    cvData.email ||
    cvData.education.length > 0 ||
    cvData.experience > 0;
  const handleSaveAsPdf = () => {
    const element = document.getElementById("cv-preview");
    const buttons = element.querySelector(".cv-buttons");

    buttons.style.display = "none";
    const options = {
      margin: 10,
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };
    html2pdf().set(options).from(element).save().then(() =>{
    buttons.style.display = "flex";
    });


  };

  return (
    <div className="cv-preview-container">
      {!hasData ? (
        <div className="empty-state">
          <h2>No CV Generated Yet</h2>
          <p>
            Fill out the input form and press "Generate CV" to see your preview
            here.
          </p>
        </div>
      ) : (
        <>
          <div id="cv-preview" className="cv-preview">
            <header className="cv-header">
              <h1>{cvData.name}</h1>
            </header>
            <p>
              {cvData.email} | {cvData.phone}
            </p>

            {cvData.education.length > 0 && (
              <section className="cv-section">
                <h2>Education</h2>
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="cv-entry">
                    <h3>{edu.school}</h3>
                    <p>
                      {edu.startYear} - {edu.endYear}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {cvData.experience.length > 0 && (
              <section className="cv-section">
                <h2>Work Experience</h2>
                {cvData.experience.map((exp) => (
                  <div key={exp.id} className="cv-entry">
                    <h3>{exp.job}</h3>
                    <p>
                      {exp.startYear} - {exp.endYear}
                    </p>
                  </div>
                ))}
              </section>
            )}
            {hasData && (
            <div className="cv-buttons">
              <button className="pdf-button" onClick={handleSaveAsPdf}>
                Save as PDF
              </button>
              <button className="edit-button" onClick={onEdit}>
                Edit
              </button>
            </div>
          )}
          </div>
        </>
      )}
    </div>
  );
}
