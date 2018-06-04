export const refreshState = (obj,label,data) => {
  obj.setState( prevState => {
    return{
      ...prevState,
      label: data
    };
  });
};
