document.addEventListener('mousedown', handleDown);

function handleDown(event){
  if(!event.target.classList.contains('draggable')) return;
  console.log("down")
  event.target.style.position = 'absolute';
  document.body.append(event.target);
  const target = event.target;
  setPosition(event.pageX, event.pageY)
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleUp);

  function handleMove(e){
    e.preventDefault();
    setPosition(e.pageX, e.pageY)
  }

  function handleUp(e){
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleUp);
    console.log("up")
  }

  function setPosition(pageX, pageY){
    let left = pageX - target.offsetWidth / 2;
    let top = pageY - target.offsetHeight / 2;
    const relativePos = target.getBoundingClientRect();
    if(relativePos.top < 0){
      const scrollBy = relativePos.top
      window.scrollBy(0, scrollBy);
    }else if(relativePos.top + target.offsetHeight > window.innerHeight){
      console.log("scroll")
      const scrollBy = relativePos.top + target.offsetHeight - window.innerHeight
      window.scrollBy(0, scrollBy);
    }

    if(left < 0) left = 0;
    else if(left > document.body.clientWidth - target.offsetWidth){
      left = document.body.clientWidth - target.offsetWidth;
    }
    if(top < 0) top = 0;
    else if(top > document.body.clientHeight - target.offsetHeight/2){
      top = document.body.clientHeight - target.offsetHeight/2;
    }
    target.style.left = left + 'px';
    target.style.top = top + 'px';
  }  
}