const express = require('express');
const auth_router = express.Router();
const { common } = require('../../controllers/auth/auth.controller');
auth_router.post('/auth', async (req, res) => {
    try {
        const payload = req.body;
        console.log("payload",payload);

        // console.log(common);

        if (!payload) {
            return res.status(400).json({
                msg: 'No payload',
                status: 1
            });
        }
        const se = payload?.se;
        // console.log("see",se);
        // console.log(typeof common[se]);
        if (!se) {
            return res.status(400).json({
                msg: 'Invalid service',
                status: 1
            });
        }
        console.log("service found", se);
        return await common[se](payload.data, res);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Server error',
                status: 2
        });
    }
});

module.exports = auth_router;