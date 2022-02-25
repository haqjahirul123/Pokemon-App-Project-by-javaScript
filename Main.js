//testfil
import getData from './api'

function changeOffset(){

    imgAdd.innerHTML=""
    
      offset = offset + 10;
      offsetval.value=offset
      offsetval.innerHTML=offset
      console.log(offset)
      console.log(offsetval)
    getData()
    }