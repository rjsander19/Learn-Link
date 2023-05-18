import { Link } from "react-router-dom"
import React, {useState} from "react";

const Index = (props) => {
  const [newForm, setNewForm] = useState({
    name: "",
    image: '',
    title: ''
  })

  const handleChange = (event) => {
    setNewForm({...newForm, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createSubjects(newForm);
    setNewForm({
        name: "",
        image: '',
        title: ''
    })
  }

  const loaded = () => {
    return props.subjects.map((subject) => (
    <div className="grid-container">
      <div key={subject._id} className="subject">
        <Link to={`/subjects/${subject._id}`}><h1>{subject.name}</h1></Link>
        <img src={subject.image} alt={subject.name} />
        <h3>{subject.title}</h3>
      </div>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="NAME"
          className="formName"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="IMAGE URL"
          className="formImage"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="TITLE"
          className="formTitle"
          onChange={handleChange}
        />
        <input type="submit" value="Create Subject" />
      </form>
      {props.subjects ? loaded() : loading()}
    </section>
  )
}

export default Index;