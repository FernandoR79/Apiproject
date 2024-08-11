const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/User')

router.post('/register', async(req, res) =>{
    const {username, email, password} = req.body;

    try{
        let user = await User.findOne({where: {email}});
        if(user){
            return res.status(400).json({msg: 'Usuario ya existe'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashespassword = await bcrypt.hash(password, salt)

        user = await User.create({
            username,
            email,
            password: hashespassword
        })

        const payload ={
            user:{
                id: user.id
        }

        }
            jwt.sign(payload, 'secret', {expiresIn: 360000}, (err, token) =>{
                if (err) throw err;
                res.json({token})

            })
        }catch (err){
            console.error(err.message);
            res.status(500).send('Error al registrar usuario')
        }
    });

    router.post('/login', async(req, res) =>{
        const {email, password} = req.body;

        try{
            let user = await User.findOne({where: {email}});
            if(!user){
                return res.status(400).json({msg: 'Usuario no encontrado'})
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg: 'Contraseña incorrecta'})
            }

            const payload ={
                user:{
                    id: user.id
            }

            }
            jwt.sign(payload, 'secret', {expiresIn: 360000}, (err, token) =>{
                if (err) throw err;
                res.json({token})

            })
        }catch (err){
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        }


});

module.exports = router;