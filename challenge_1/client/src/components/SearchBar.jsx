import React from 'react';

const searchBar = (props) => (
  <form className='form-inline' onSubmit={(e)=>{e.persist(); props.search(e)}}>
    <div className='input-group'>
      <input type="text" className='form-control' placeholder='Search term' />
      <div className='input-group-append'>
        <button type='submit' className='btn btn-secondary'>Search</button>
      </div>
    </div>
  </form>
);

export default searchBar;