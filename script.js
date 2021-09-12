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
        <td class="item">${list[i].iName}</td>
        <td>${list[i].qty}</td>
        <td>${list[i].unit}</td>
        <td>${list[i].dept}</td>
        <td>${list[i].note}</td>
        <td><input class="check" type="checkbox"></td>
        </tr>`;

        body.innerHTML += row;
      }

      var index = 11;
      for (var i = 0; i < localStorage.length; i++) {
        var sno = index.toString();
        var data = JSON.parse(localStorage.getItem(sno));
        var row = `<tr>
        <th scope="row">${index}</th>
        <td class="item">${data.iName}</td>
        <td>${data.qty}</td>
        <td>${data.unit}</td>
        <td>${data.dept}</td>
        <td>${data.note}</td>
        <td><input class="check" type="checkbox"></td>
        </tr>`;
        body.innerHTML += row;
        index++;
      }
    }
  };

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
    iName: input[length].value,
    qty: input[length + 1].value,
    unit: input[length + 2].value,
    dept: input[length + 3].value,
    note: input[length + 4].value,
  };

  if (data.iName == null || data.iName == "") {
    input[length].style.border = "solid red ";
    return;
  } else {
    input[length].style.border = "none";
  }

  localStorage.setItem(index, JSON.stringify(data));

  data = JSON.parse(localStorage.getItem(index));

  var row = `<tr>
        <th scope="row">${index}</th>
        <td class="item">${data.iName}</td>
        <td>${data.qty}</td>
        <td>${data.unit}</td>
        <td>${data.dept}</td>
        <td>${data.note}</td>
        <td><input class="check" type="checkbox"></td>
        </tr>`;
  body.innerHTML += row;

  console.log(data);
});

// ---------------------------------

var clear = document.getElementById("del");

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// ---------------------------------

function strike() {
  let length = 10 + localStorage.length;
  var item = Array.from(document.querySelectorAll(".item"));
  var check = Array.from(document.querySelectorAll(".check"));
  for (var i = 0; i < length; i++) {
    if (check[i].checked) {
      item[i].innerHTML = `<s>${item[i].textContent}</s>`;
    } else {
      item[i].innerHTML = `${item[i].textContent}`;
    }
  }
}
// ---------------------------------

window.addEventListener("load", ajax);

// window.addEventListener("load", (e) => {
//   [...document.querySelectorAll(".check")].forEach((element) => {
//     console.log(element);
//     element.addEventListener("click", strike);
//   });
// });

document.querySelector("table").addEventListener("click", strike);
