const Togglable = (props) => {
  if(props.display){
    return (
      <div>
        {props.children}
      </div>
    )
  }
  else{
    return (
      <div></div>
    )
  }
}

export default Togglable