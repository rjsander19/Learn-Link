import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../Show.scss';

const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const subjects = props.subjects
  console.log(id);
  
  const subject = subjects ? subjects.find((p) => p._id === id ) : null

  const [ editForm, setEditForm ] = useState(subject)

  const [isEditing, setisEditing] = useState(false)

  useEffect( () => {
    if (subject) {
      setEditForm(subject)
    }
  }, [subject] )


  const handleChange = (e) => {
    setEditForm( {
      ...editForm,
     [e.target.name]: e.target.value 
    })
  }
  

  const handleUpdate = (e) => {
    e.preventDefault()
    props.updateSubjects(editForm, subject._id)
  }

  const handleEdit = () => {
    setisEditing(prevState => !prevState)
  }


  const handleDelete = () => {
    props.deleteSubjects(subject._id)
    navigate('/')
  }

  const loaded = () => {
    return (
      <>
      <div className="show-container">

      <div class="card2">
        <h1>{subject.name}</h1>
        <img 
          className="avatar-image" 
          src={subject.image} 
          alt={subject.name} 
        />
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>{ isEditing ? 'Cancel Edit' : 'Edit' }</button>
      </div>
      <div className="card1">
        <h3>Description: {subject.description}</h3>
      </div>
      </div>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="subject">
      { subject ? loaded() : loading() }

      { isEditing &&

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input type="submit" value="Update Subject" />
      </form>
      }
    </div>
  )
}

export default Show