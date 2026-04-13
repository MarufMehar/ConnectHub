const express = require('express');
const module_router = express.Router();
const {billing} = require('../../controllers/modules/common.controller');
const {verifyjwt}=require('../../middlewares/jwt.middleware.js')
module_router.post('/module',verifyjwt, async (req, res) => {
    try {
        const payload = req.body;
        console.log("paylaod",payload);
        
        if (!payload) {
            return res.status(400).json({
                msg: 'No payload',
                status: 1
            });
        }
        const se = payload?.se;
        if (!se) {
            return res.status(400).json({
                msg: 'Invalid service',
                status: 1
            });
        }
        console.log("service found", se);
        return await billing[se](payload.data, res);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Server error',
                status: 2
        });
    }
});
module.exports = module_router;