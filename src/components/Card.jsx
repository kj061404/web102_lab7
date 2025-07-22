import { useState } from 'react'
import { supabase } from '../client'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const [count, setCount] = useState(props.betCount)
  
  const updateCount = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ betcount: count + 1})
        .eq('id', props.id)
        .select();

      if (error) {
        console.error('Error updating bet count:', error);
        alert('Error updating bet count: ' + error.message);
        return;
      }

      console.log('Bet count updated successfully:', data);
      setCount((count) => count + 1);
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Unexpected error: ' + err.message);
    }
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"by " + props.author}</h3>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card