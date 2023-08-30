export const ApiWebURL = "https://servicios.campus.pe/";
export const ApiWebURL1 = "https://servicios.campus.pe/pedidosdetalle.php?idpedido=";

// export const verDetallePedido = (item) => {
//     let pedido = [];
//     sessionStorage.clear();
//     if (sessionStorage.getItem("pedidodetalle")) {
//         pedido = JSON.parse(sessionStorage.getItem("pedidodetalle"));
//         let index = -1;
//         for (let i = 0; i < pedido.length; i++) {
//             if (item.idpedido === pedido[i].idpedido) {
//                 index = i;
//                 break;
//             }
//         }
//         if (index === -1) {
//             pedido.push(item);
//             sessionStorage.setItem("pedidodetalle", JSON.stringify(pedido));
//         }
//         else {
//             pedido[index].cantidad++
//             sessionStorage.setItem("pedidodetalle", JSON.stringify(pedido));
//         }
//     }
//     else {
//         pedido.push(item);
//         sessionStorage.setItem("pedidodetalle", JSON.stringify(pedido));
//     }

// }

export const verDetallePedido = (item) => {
    // Verificar si "pedidodetalle" existe en el sessionStorage
    const detalleEnSessionStorage = sessionStorage.getItem("pedidodetalle");

    if (detalleEnSessionStorage) {
        // Combinar el detalle existente con el objeto pasado como argumento
        const detalleActualizado = {
            ...item
        };

        // Almacenar el detalle actualizado en sessionStorage
        sessionStorage.setItem("pedidodetalle", JSON.stringify(detalleActualizado));

        return detalleActualizado;
    } else {
        // Si "pedidodetalle" no existe en sessionStorage, simplemente almacenar el objeto
        sessionStorage.setItem("pedidodetalle", JSON.stringify(item));

        return item;
    }
}