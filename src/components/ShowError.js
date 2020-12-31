import React,{useEffect} from 'react';

const ShowError = ({error,setError}) => {
  const {err,msg} = error

  useEffect(() => {
    const alert_off = setTimeout(() => {
      setError({err:false})
    },3000)
    return () => clearTimeout(alert_off)
  },[err]);

  return(
    <div>
      <h5 className="error-msg">{msg}</h5>
    </div>
  )
}

export default ShowError;