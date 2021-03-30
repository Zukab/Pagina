function get(numero) {
    fetch("http://127.0.0.1:3001/table/" + numero).then(data => {
        window.location.replace("Precios.html")
    });
}


async function readTable() {
    await fetch("http://127.0.0.1:3001/table")
        .then(response => response.json())
        .then(data => {
            var text = '';
            console.log(data)
            for (item in data) {
                text = text + data[item] + '<br/>'

            }
            console.log(text)
            document.getElementById('formulario').innerHTML = text;
        });

}

function data() {
    console.log("XD")//prueba
    var numero = document.getElementById('numero').value;
    if (numero > 0) {
        get(numero);
    } else {
        alert('el numero debe ser mayor o igual a 1');
    }
}