/* OBTENER LA URI Y TOKEN */

uri = "http://workapp.somee.com/api/Employee/";
token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGdWxsbmFtZSI6Ikp1YW4gQ2FybG9zQ2h1cGFQaWphIiwiVXNlcm5hbWUiOiJhZG1pbiIsIlJvbCI6IkFkbWluIiwibmJmIjoxNjM1MjE1MDc2LCJleHAiOjE2MzU2NDcwNzYsImlhdCI6MTYzNTIxNTA3Nn0.L9x4NatiLZENbesqZHoqF1UYKxnym4_zF1zJ9UoYq_o";

/* OBTENER DEPARTAMENTOS Y PUESTOS */

$.ajax({
  url: "http://workapp.somee.com/api/Department/GetAll",
  method: "GET",
  headers: {
    "Authorization": token
  },
  cache: false,
  beforeSend: function () {
    //$('.ajax-loader').show();
  },
  complete: function () {
    //$('.ajax-loader').hide();
  },
  success: function (response) {
    for (var i = 0; i < response.data.length; i++) {
      $('#department').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
    }
  },
  error: function (response) {
    console.log("Reenviar al login");
  }
});

/* OBTENER EMPLEADOS */

$.ajax({
  url: uri,
  method: "GET",
  headers: {
    "Authorization": token
  },
  cache: false,
  beforeSend: function () {
    $('.ajax-loader').show();
  },
  complete: function () {
    $('.ajax-loader').hide();
  },
  success: function (response) {
    for (var i = 0; i < response.data.length; i++) {
      $('table tbody').append('<tr>' +
        '<td>' + response.data[i].id + '</td>' +
        '<td>' + response.data[i].name + '</td>' +
        '<td>' + response.data[i].lastName + '</td>' +
        '<td>' + response.data[i].position.department.name + '</td>' +
        '<td>' + response.data[i].position.name + '</td>' +
        '<td><button type="button" class="btn btn-primary viewEmployee" data-bs-toggle="viewModal" data-bs-target="#viewModal"><i class="fas fa-eye"></i> Ver</button>' +
        '<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal"><i class="fas fa-pen"></i> Modificar</button>' +
        '<button type="button" class="btn btn-danger deleteEmployee"></i> Eliminar</button><td>' +
        '</tr>');
    }

    /* PARA DELEGAR LA FUNCION ELIMINAR EMPLEADOS */
    $(".deleteEmployee").click(function () {
      deleteEmployee($(this));
    });

    /* PARA DELEGAR LA FUNCION VER EMPLEADOS */
    $(".viewEmployee").click(function () {
      viewEmployee($(this));
    });


  },
  error: function (response) {
    console.log("Reenviar al login");
    // if(response.status == 401) {
    //   window.location.replace("/login.html");
    // }
  }
});


/* AGREGAR EMPLEADOS */

$("#addEmployee").click(function () {
  /* No es la solucion mas elegante, podria iterarse sobre los campos del form (por hacer)*/
  if (!$("#name").val()
    || !$("#lastName").val()
    || !$("#name").val()
    || !$("#lastName").val()
    || !$("#birthDate").val()
    || !$("#dpi").val()
    || !$("#salary").val()
    || !$("#phoneNumber").val()
    || !$("#sex").val()
    || !$("#department").val()
    || !$("#position").val()) {
    console.log("empty!");
  } else {
    data = {
      name: $("#name").val(),
      lastName: $("#lastName").val(),
      Birthdate: new Date($("#birthDate").val()),
      phoneNumber: $("#phoneNumber").val(),
      sex: $("#sex").val(),
      idPosition: $("#position").val(),
      salary: $("#salary").val()
    }
    console.log(data);

    $.ajax({
      url: uri + 'add',
      method: "POST",
      data: data,
      headers: {
        "Authorization": token
      },
      cache: false,
      beforeSend: function () {
        $('.ajax-loader').show();
      },
      complete: function () {
        $('.ajax-loader').hide();
      },
      success: function (response) {
        alert("FANTASTICO!");
      },
      error: function (response) {
        console.log(response);
        // if(response.status == 401) {
        //   window.location.replace("/login.html");
        // }
      }
    });

  }
});


/* VER EMPLEADO */
function viewEmployee(employeeRow) {
  console.log(employeeRow);
}

/* ELIMINAR EMPLEADO */

function deleteEmployee(employeeRow) {
  console.log(employeeRow.closest('tr'));
  employeeRow.closest('tr').remove();
}