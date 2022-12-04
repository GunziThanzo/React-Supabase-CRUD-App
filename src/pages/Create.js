import { useState } from "react";
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !rating || !method) {
      setFormError("please set all the field correctly")
      return
    }

    console.log(title, rating, method)

    const { data, error } =  await supabase
      .from('smoothies')
      .insert([{title, method, rating}])
      .select()
      // .select() //version 2

    if (error) {
      setFormError("please set all the field correctly")
    }

    if (data) {
      setFormError(null)
      navigate("/")
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create