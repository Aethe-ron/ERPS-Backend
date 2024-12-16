import express from "express"
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();


//Setting Route
import authRoutes from './routes/auth.route.js'
import  schoolRoutes  from './routes/school.route.js'
import  userRoutes    from './routes/users.route.js'
import attendanceRoutes from  './routes/attendance.route.js'
import  incidenceRoute  from  './routes/incidence.route.js'
import signoutRoute from './routes/signout.route.js'
import deportRoute from './routes/depot.route.js'
import officerRoute from  './routes/officer.route.js'
import paySheetRoute from  './routes/paysheet.route.js'
import rulesRoute from './routes/rules.route.js'
import malPracticeRoute from './routes/malpractice.route.js'
import invigilatorRoute from './routes/invigilators.route.js'
import noteRoute from './routes/note.route.js'
import secNote from './routes/securityNote.route.js'
import monitoringRoute from './routes/monitoring.route.js'

// Middleware
app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

// Apply CORS for cross-domain communication
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','), // Define allowed origins in .env
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));

// Add request logging
app.use(morgan('combined'));

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//My Routes
 app.use('/api/auth', authRoutes);
 app.use('/api/school/',schoolRoutes);
 app.use('/api/user/', userRoutes);
 app.use('/api/attendance/', attendanceRoutes);
 app.use('/api/incidence/', incidenceRoute );
 app.use('/api/signout/', signoutRoute);
 app.use('/api/depot/', deportRoute );
 app.use('/api/officer/',officerRoute);
 app.use('/api/paysheet/',paySheetRoute );
 app.use('/api/rules/',rulesRoute );
 app.use('/api/malpractice/',malPracticeRoute );
 app.use('/api/invigilator/',invigilatorRoute );
 app.use('/api/note/',noteRoute );
 app.use('/api/securityNote/',secNote );
 app.use('/api/monitoring/',monitoringRoute);


//Using define error function
 app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});

