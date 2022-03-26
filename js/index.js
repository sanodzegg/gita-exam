const navbar = document.querySelector(".navbar li").children;

const variables = {
  destination: {
    header : document.getElementById("destHeader"),
    nav : document.getElementById("diNav"),
    description : document.getElementById("destDesc"),
    avg_distance : document.getElementById("avgValue"),
    avg_time : document.getElementById("avgTime"),
    img : document.getElementById("planetImg"),
  }, 
  crew : {
    name: document.getElementById("crewName"),
    nav : document.getElementById("cNav"),
    role : document.getElementById("crewRank"),
    bio : document.getElementById("crewAbout"),
    img : document.getElementById("crewImg"),
  },
  technology : {
    name : document.getElementById("techName"),
    nav : document.getElementById("tNav"),
    description : document.getElementById("techAbout"),
    img : document.getElementById("techImg"),
  }
}

const getData = (section) => {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      if(section == "destinations") {
        scroller([...variables.destination.nav.children], "destinations", variables.destination);
      } else if (section == "crew") {
        scroller([...variables.crew.nav.children], "crew", variables.crew);
      } else {
        scroller([...variables.technology.nav.children], "technology", variables.technology);
      }
    }
  };
  req.open("GET", "./assets/data.json", true);
  req.send();
}

let onPage = window.location.pathname.split("/").pop();

if(onPage == "destination.html") {
  getData("destinations");
} else if (onPage == "crew.html") {
  getData("crew");
} else if (onPage == "technology.html") {
  getData("technology");
}

const scroller = (arr, type, el) => {
  const navArr = [...arr]
  const obj = Object.values(el);
  el = Object.keys(el);
  navArr.forEach((e,indx) => {
    e.addEventListener("click", () => {
      for(let j = 0; j < navArr.length; j++) {
        navArr[j].classList.remove("active");
      }
      navArr[indx].classList.add("active");
      if(type == "destinations") {
        Object.values(data.destinations[indx]).map((i, e) => {
          if(typeof(i) != "object") {
            obj[e].innerText = i;
          } else {
            variables.destination.img.setAttribute("src", `${data.destinations[indx].images.png}`);
          }
        });
      } else if (type == "crew") {
        Object.values(data.crew[indx]).map((i, e) => {
          if(typeof(i) != "object") {
            obj[e].innerText = i;
          } else {
            variables.crew.img.setAttribute("src", `${data.crew[indx].images.png}`);
          }
        });
      } else {
        Object.values(data.technology[indx]).map((i,e) => {
          if(typeof(i) != "object") {
            obj[e].innerText = i;
          } else {
            variables.technology.img.setAttribute("src", `${data.technology[indx].images.landscape}`);
          }
        });
      }
    });
  });
}