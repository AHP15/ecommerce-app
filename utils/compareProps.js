
export function equalByValue(prevProps, nextProps){
    Object.keys(nextProps).forEach(key =>{
      if(nextProps[key] !== prevProps[key]){
        return false;
      }
    });
    return true;
}