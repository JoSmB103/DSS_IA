const id_cliente = document.getElementById("id_cliente");
const btn_agregar = document.getElementById("btn_agregar");
const btn_cancelar = document.getElementById("btn_cancelar");
const btn_guardar = document.getElementById("btn_guardar");

let tabla_clientes = "";
const url = "http://127.0.0.1:8000/api";

document.addEventListener("DOMContentLoaded", async () => {
  await obtenerClientes();
});

btn_agregar.addEventListener("click", () => {
  abrirModal(0);
});

btn_cancelar.addEventListener("click", () => {
  limpiarFormulario();
  $("#modalCliente").modal("hide");
});

btn_guardar.addEventListener("click", async () => {
  await guardarCliente();
});

const alerta = (title, text, icon) => {
  return Swal.fire({
    title,
    text,
    icon,
    showConfirmButton: false,
    timer: 2000,
    allowOutsideClick: false,
    heightAuto: false,
  });
};

const alertaHtml = (title, html, icon) => {
  return Swal.fire({
    title,
    html,
    icon,
    showConfirmButton: false,
    timer: 2000,
    allowOutsideClick: false,
    heightAuto: false,
  });
};

const obtenerClientes = async () => {
  tabla_clientes = await $("#tabla_clientes").DataTable({
    destroy: true,
    autoWidth: false,
    responsive: true,
    ajax: {
      method: "GET",
      url: `${url}/clientes`,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      dataSrc: "clientes",
    },
    columns: [
      { data: "nombre" },
      { data: "apellidos" },
      { data: "edad" },
      {
        data: "sueldo",
        render: function (data) {
          return parseFloat(data).toLocaleString("en", {
            style: "currency",
            currency: "USD",
          });
        },
      },
      {
        data: "id",
        orderable: false,
        searchable: false,
        render: function (data) {
          return `
            <button title="Editar" class="btn btn-primary btn-sm" onclick="abrirModal(${data})"><i class="fas fa-edit"></i></button>
            <button title="Eliminar" class="btn btn-danger btn-sm" onclick="eliminarCliente(${data})"><i class="fas fa-trash-alt"></i></button>
          `;
        },
      },
    ],
    lengthMenu: [
      [5, 10, 15, 20, -1],
      [5, 10, 15, 20, "Todos"],
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
    },
  });
};

const limpiarFormulario = () => {
  $("#id_cliente").val("");
  $("#nombre").val("");
  $("#apellidos").val("");
  $("#edad").val("");
  $("#sueldo").val("");
};

const abrirModal = async (id) => {
  $("#modalCliente").modal("show");
  const { cliente } = await fetch(`${url}/clientes/${id}`).then((res) =>
    res.json()
  );
  if (cliente) {
    $("#id_cliente").val(cliente.id);
    $("#nombre").val(cliente.nombre);
    $("#apellidos").val(cliente.apellidos);
    $("#edad").val(cliente.edad);
    $("#sueldo").val(cliente.sueldo);
  } else {
    limpiarFormulario();
  }
};

const guardarCliente = async () => {
  let erroresMsj = "";

  const accion = !id_cliente.value
    ? `${url}/clientes`
    : `${url}/clientes/${id_cliente.value}`;

  const method = !id_cliente.value ? "POST" : "PUT";

  const cliente = {
    nombre: $("#nombre").val(),
    apellidos: $("#apellidos").val(),
    edad: $("#edad").val(),
    sueldo: $("#sueldo").val(),
  };

  const { ok, mensaje, errores } = await fetch(accion, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  }).then((res) => res.json());

  if (ok) {
    $("#modalCliente").modal("hide");
    return alerta("¡Éxito!", mensaje, "success").then(() => {
      limpiarFormulario();
      tabla_clientes.ajax.reload();
    });
  } else {
    $("#modalCliente").modal("hide");
    for (const key in errores) {
      erroresMsj += `<b>${key}: </b>${errores[key][0]}</br>`;
    }
    return alertaHtml("¡Error!", erroresMsj, "error").then(() => {
      $("#modalCliente").modal("show");
    });
  }
};

const eliminarCliente = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: "¿Seguro/a desea eliminar el registro?",
    text: "¡No podrá revertir la eliminación!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: false,
    heightAuto: false,
  });

  if (isConfirmed) {
    const { ok, mensaje } = await fetch(`${url}/clientes/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (ok) {
      return alerta("¡Éxito!", mensaje, "success").then(() => {
        limpiarFormulario();
        tabla_clientes.ajax.reload();
      });
    }
  }
};
