const { response } = require('express');
const Ruta = require('../models/rutas');

const getRutas = async (req, res = response) => {

    const rutas = await Ruta.find()
        .populate('user');

    res.json({
        ok: true,
        rutas
    });
}

const crearRutas = async (req, res = response) => {

    const { ciudad } = req.body;

    try {
        let ruta = await Ruta.findOne({ ciudad });

        if (ruta) {
            return res.status(400).json({
                ok: false,
                msg: 'La ruta ya existe'
            });
        }

        ruta = new Ruta(req.body);

        try {

            ruta.user = req.uid;

            const rutaGuardado = await ruta.save();

            res.json({
                ok: true,
                ruta: rutaGuardado
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

const actualizarRutas = async (req, res = response) => {

    const rutaId = req.params.id;
    const uid = req.uid;

    try {

        const ruta = await Ruta.findById(rutaId);

        if (!ruta) {
            return res.status(404).json({
                ok: false,
                msg: 'Ruta no existe por ese id'
            });
        }

        if (ruta.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta ruta'
            });
        }

        const nuevaRuta = {
            ...req.body,
            user: uid
        }

        const rutaActualizada = await Ruta.findByIdAndUpdate(rutaId, nuevaRuta, { new: true });

        res.json({
            ok: true,
            ruta: rutaActualizada
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarRuta = async (req, res = response) => {

    const rutaId = req.params.id;
    const uid = req.uid;

    try {

        const ruta = await Ruta.findById(rutaId);

        if (!ruta) {
            return res.status(404).json({
                ok: false,
                msg: 'Ruta no existe por ese id'
            });
        }

        if (ruta.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar esta ruta'
            });
        }

        await Ruta.findByIdAndDelete(rutaId);
        const rutas = await Ruta.find()
        .populate('user');

        res.json({ ok: true, rutas });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getRutas,
    crearRutas,
    actualizarRutas,
    eliminarRuta
}