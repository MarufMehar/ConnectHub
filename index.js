const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
require('./modules/database.connection');
const authRouter = require('./routes/auth/auth.route');
const moduleRouter = require('./routes/modules/module.route');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
app.use('/', authRouter);
app.use('/', moduleRouter);
app.use((req, res) => {
    res.status(404).json({
        msg: 'Route Not Found',
        status: 1
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        msg: 'Something Went Wrong',
        status: 1
    });
});
const port = process.env.SERVER_PORT || 5001;
app.listen(port, () => console.log(`Server is running on ${port}`));