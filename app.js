const express  = require('express')
const app = express()
const AppError = require('./error_handlers/appError')
const userRoutes = require('./user/userRoute')
const projectRoutes = require('./project/projectRoute')
const objectRoutes = require('./object/objectRoute')
const globalErrorHandler = require('./error_handlers/errorController')
const morgan = require('morgan')
// Parsing data in the urls
// This will limit the data to be sent through url to only 10kb
app.use(express.json({
    limit:'10kb'
}))
app.use(morgan('combined'));
app.use('',userRoutes);
app.use('/projects/',projectRoutes)
app.use('/objects/',objectRoutes)

// // Not found error handler
app.all('*',(req,res,next)=>{
    next(new AppError(`can't find ${req.originalUrl} on our server`,404));
})

// Global error handler
app.use(globalErrorHandler)

module.exports  = app;
