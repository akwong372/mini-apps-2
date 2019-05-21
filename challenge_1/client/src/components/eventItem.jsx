import React from 'react';

const eventItem = (props) => {
  const { date, description, category1, category2, granularity, lang } = props;
  return (
    <li className='list-group-item'>
      <h2>{date}</h2>
      <p>
        {description}
      </p>
      <div>
        Sorted type:
        <br />
        <div>{category1} &gt; {category2}</div>
      </div>
    </li>
  )
}

export default eventItem;