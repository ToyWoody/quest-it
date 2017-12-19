/*
<nav class="navbar navbar-default">
  <div class="container-fluid">

    <div class="navbar-header">
      <a class="navbar-brand" href="#">Woody's Developer Blog</a>
    </div>

    <div id="navbar" class="collapse navbar-collapse" >
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">DiarySite</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->

  </div><!-- /.container-fluid -->
</nav>
*/

var nav = document.createElement('nav');
var navContainer = document.createElement('div');
var navHeader =  document.createElement('div');
var navbar = document.createElement('div');
var navList = document.createElement('ul');

navHeader.setAttribute("class", "navbar-header");
navHeader.innerHTML = "<a class='navbar-brand' href='#'>Woody's Developer Blog</a>";

navbar.setAttribute("class", "collapse navbar-collapse");

navList.setAttribute("class", "nav navbar-nav");
var navItem = {'Home' : '#', 'About' : '#', 'DiarySite' : '#'};
for (key in navItem){
    navList.innerHTML += "<li><a href='" + navItem[key] +"'>" + key + "</a></li>";
}
var active = navList.getElementsByTagName('li');
active[0].setAttribute("class", "active");

navbar.appendChild(navList);

navContainer.setAttribute("class", "container-fluid");
navContainer.appendChild(navHeader);
navContainer.appendChild(navbar);

nav.setAttribute("class", "navbar navbar-default");
nav.appendChild(navContainer);
$('.container').prepend(nav);
