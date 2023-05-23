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

  const [ editForm, setEditForm ] = useState({ post: ''})

  const [isEditing, setisEditing] = useState(false)

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (subject) {
      setEditForm(subject);
    }
  }, [subject]);

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);


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
    navigate('/subjects')
  }

//Comment section
  

const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (editForm.post.trim() !== '') {
      const newComment = {
        post: editForm.post.trim(),
        subjectId: subject._id,
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setEditForm((prevEditForm) => ({ ...prevEditForm, post: '' }));
      localStorage.setItem('comments', JSON.stringify(updatedComments));
    }
  };

  
  const loaded = () => {
    const subjectComments = comments.filter(
      (comment) => comment.subjectId === subject._id
    );
    return (
      <>
      <div className="show-container">
      <div className="card-row">
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
      <div className="card3">
            <h3>Comments</h3>
            <div className="comment-box">
            <div className="comment-list">
            {subjectComments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
            </div>
            </div>
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={editForm.post}
                name="post"
                placeholder="Add a comment"
                onChange={handleChange}
              />
              <input type="submit" value="Add Comment" />
            </form>
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
export default Show;