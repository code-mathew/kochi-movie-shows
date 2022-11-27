fetch('./runningMovies.json')
.then(function(response){
  return response.json();
})
.then(function(response){
  //console.log(response);

  runningMovies(response); // calls a function with running movies json
});

// running movies fn
function runningMovies(response){

    let runningMovies = document.getElementById('app');
    

    // creates a wrapper class (parent)
    let div = document.createElement('div');
    runningMovies.appendChild(div);
    div.classList.add('wrapper');
    
    let movie = document.querySelector('.wrapper');
    let wrapper = document.createElement('div');
    movie.appendChild(wrapper);
    wrapper.classList.add('movie');

    let h1 = document.createElement("h1");
    let img = document.createElement("img");
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    
    
    // loops through the json data and prints the data on html

    for(var i=0; i<response.length; i++){

      // creates a movie class (which contains the list of movies)
    
    let movies = document.querySelector('.movie');

        
        let div = document.createElement('div');
        div.classList.add('card');
        let button = document.createElement('button');

      /// to check whether any missing data

    if(response[i].image == ""){
      img.innerText = '<img src ="./assets/image-not-found.jpg" alt="Title not found">';
          console.warn("Missing Poster");
    }else{
      img.innerText = '<img src ="' +response[i].image+'" alt="'+response[i].title+'">';
    }

    if(response[i].title == ""){
      h1.innerHTML = "<h1>Title Not Found</h1>";
      console.warn("Missing Title");
    }else{
      h1.innerHTML = "<h1>"+response[i].title+"</h1>";
    }

    if(response[i].cert == ""){
      h2.innerHTML = "<h2>Certificate Not Found</h2>";
          console.warn("Missing Certificate");
    }else{
      h2.innerHTML = "<h2>"+response[i].cert+"</h2>";
    }

    if(response[i].lang == ""){
      p.innerHTML = "<p>Language Not Found</p>";
          console.warn("Missing Language");
    }else{
      p.innerHTML = "<p>"+response[i].lang+"</p>";
    }
      
    button.innerText = '<a href="' +response[i].url+'"><button type ="submit" class ="btn">Book Tickets</button></a>';

    div.innerHTML = img.innerText + h1.innerHTML + h2.innerHTML + p.innerHTML + button.innerText;

    movies.appendChild(div);

    }

    
    

    
}
