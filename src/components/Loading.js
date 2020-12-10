import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const Loading = () => {
  return (
   <div className="Loader">
      <CircularProgress color="secondary" />
       <span>Made with <span className="heart">&#10084;</span>  by <span className="Fancy-text">Lovish Wadhera</span> </span>
   </div>
  )
}

export default Loading;