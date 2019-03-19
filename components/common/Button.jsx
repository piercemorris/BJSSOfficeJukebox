import React from 'react';

const Button = ({text, onDelete, song}) => {
  return ( 
    <button onClick={() => onDelete(song._id)} className="btn btn-remove">
      {text}
    </button>
   );
}
 
export default Button;