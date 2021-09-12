function ajax() {
  let length = 10 + localStorage.length;
  var list = [];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status) {
      list = JSON.parse(this.responseText);
      var body = document.getElementById("tBody");

      for (var i = 0; i < list.length; i++) {
        var row = `<tr>
        <th scope="row">${list[i].sNo}</th>
        <td>${list[i].iName}</td>
        <td>${list[i].qty}</td>
        <td>${list[i].unit}</td>
        <td>${list[i].dept}</td>
        <td>${list[i].note}</td>
        </tr>`;

        body.innerHTML += row;
      }

      var index = 11;
      for (var i = 0; i < localStorage.length; i++) {
        var sno = index.toString();
        var data = JSON.parse(localStorage.getItem(sno));
        var row = `<tr>
        <th scope="row">${index}</th>
        <td>${data.iName}</td>
        <td>${data.qty}</td>
        <td>${data.unit}</td>
        <td>${data.dept}</td>
        <td>${data.note}</td>
        </tr>`;
        body.innerHTML += row;
        index++;
      }
    }
  };

  console.log(list);
  xhttp.open("GET", "./list.json", true);
  xhttp.send();
}

// ---------------------------------

var add = document.getElementById("add");

add.addEventListener("click", () => {
  let length = 10 + localStorage.length;
  var body = document.getElementById("tBody");
  var input = document.querySelectorAll("input");
  var index = length + 1;

  var data = {
    iName: input[0].value,
    qty: input[1].value,
    unit: input[2].value,
    dept: input[3].value,
    note: input[4].value,
  };

  if (data.iName == null || data.iName == "") {
    input[0].style.border = "thick solid red";
    return;
  } else {
    input[0].style.border = "none";
  }

  localStorage.setItem(index, JSON.stringify(data));

  data = JSON.parse(localStorage.getItem(index));

  var row = `<tr>
        <th scope="row">${index}</th>
        <td>${data.iName}</td>
        <td>${data.qty}</td>
        <td>${data.unit}</td>
        <td>${data.dept}</td>
        <td>${data.note}</td>
        </tr>`;
  body.innerHTML += row;

  console.log(data);
});

// ---------------------------------

window.addEventListener("load", ajax);
