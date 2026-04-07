import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./styles/App.css";
import InputForm from "./components/InputForm";
import CVPreview from "./components/CVPreview";

function App() {
  const [cvData, setCVData] = useState({
    name: "",
    phone: "",
    email: "",
    education: [],
    experience: [],
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEdit = () => {
    setIsPreviewMode(false);
  };

  const handleSubmit = () => {
    setIsPreviewMode(true);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {isWideScreen ? (
          <>
            <InputForm
              setCVData={setCVData}
              onSubmit={handleSubmit}
              initialData={cvData}
            />
            <CVPreview cvData={cvData} onEdit={handleEdit} />
          </>
        ) : (
          <>
            {!isPreviewMode && (
              <InputForm
                setCVData={setCVData}
                onSubmit={handleSubmit}
                initialData={cvData}
              />
            )}
            {isPreviewMode && <CVPreview cvData={cvData} onEdit={handleEdit} />}
          </>
        )}
      </main>
    </>
  );
}

export default App;
