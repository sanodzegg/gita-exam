var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText);
    console.log(data);
  }
};
xhttp.open("GET", "./assets/planets.json", true);
xhttp.send();