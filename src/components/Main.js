import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";
import Landing from "../pages/Landing";


function Main(props) {
    const [ subjects, setSubjects ] = useState(null)
    // const URL = "http://localhost:4000/subjects/"
    const URL = "https://learnlink-backend.onrender.com/subjects"


const getSubjects = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    const data = await response.json();
    if (Array.isArray(data)) { // Check if the data is an array
      setSubjects(data);
    } else {
      console.error("Invalid data format: " + data);
    }
  } catch (error) {
    console.error(error);
    // Handle the error, such as showing an error message to the user
  }
};

    const createSubjects = async (subject) => {
        await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subject),
        });
      };
    

    const updateSubjects = async (subject, id) => {
        await fetch(URL + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subject),
        });
      }
    
    const deleteSubjects = async id => {
        await fetch(URL + id, {
          method: "DELETE",
        })
      }


    useEffect(() => getSubjects(), []);

    return (
        <main>
        <Routes>

            <Route exact path="/" element={<Landing subjects={subjects} createSubjects={createSubjects}/>} />


            <Route exact path="/subjects" element={<Index subjects={subjects} createSubjects={createSubjects}/>} />

            <Route path="/subjects/:id" element={<Show subjects={subjects}
            updateSubjects={updateSubjects}
            deleteSubjects={deleteSubjects}
            />} />

        </Routes>
        </main>
    );
    }
export default Main;



