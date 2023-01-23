const { response } = require('express');
const Producto = require('../models/products');

const getProductos = async (req, res = response) => {

    const productos = await Producto.find()
        .populate('user', 'referencia');

    res.json({
        ok: true,
        productos
    });
}

const crearProducto = async (req, res = response) => {

    const { referencia } = req.body;

    try {
        let producto = await Producto.findOne({ referencia });

        if (producto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto ya existe'
            });
        }

        producto = new Producto(req.body);

        try {

            producto.user = req.uid;

            const productoGuardado = await producto.save();

            res.json({
                ok: true,
                producto: productoGuardado
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarProducto = async (req, res = response) => {

    const productoId = req.params.id;
    const uid = req.uid;

    try {

        const producto = await Producto.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe por ese id'
            });
        }

        // if (producto.user.toString() !== uid) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este Producto'
        //     });
        // }

        const nuevoProducto = {
            ...req.body,
            user: uid
        }

        const productoActualizado = await Producto.findByIdAndUpdate(productoId, nuevoProducto, { new: true });

        const productos = await Producto.find()
        .populate('user', 'referencia');

        res.json({
            ok: true,
            producto: productoActualizado,
            productos
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarProducto = async (req, res = response) => {

    const productoId = req.params.id;
    const uid = req.uid;

    try {

        const producto = await Producto.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe por ese id'
            });
        }

        if (producto.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este producto'
            });
        }


        await Producto.findByIdAndDelete(productoId);
        const productos = await Producto.find()
        .populate('user', 'name');

        res.json({ ok: true, productos });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}