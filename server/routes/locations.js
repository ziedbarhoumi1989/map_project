import mongoose, { Schema, Types } from 'mongoose';
let multer = require('multer'),
import { LocationModel} from '../models/Location';
const DIR = '../public/';
 
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, DIR);
},
filename: (req, file, cb) => {
const fileName = file.originalname.toLowerCase().split(' ').join('-');
cb(null, uuidv4() + '-' + fileName)
}
});
 
var upload = multer({
storage: storage,
fileFilter: (req, file, cb) => {
if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
cb(null, true);
} else {
cb(null, false);
return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
}
}
});

export default (app) => {

    app.get('/v1/locations/:id', async (req, res) => {
        const location_id = req.params.id;
        
        if(!location_id) {
            res.status(500).end();
            return;
        }
        
        const locations = await LocationModel.find({ post_id: Types.ObjectId(`${post_id}`) } ) || [];
        
        res.send(locations);
    });

    app.post('/v1/locations', upload.single('image'),async (req, res) => {
        if(req.user && req.user.data && (req.user.data.role === 'admin' )) {
            const url = req.protocol + '://' + req.get('host')
            const loc = new Location({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            address:req.body.address,
            latitude:req.body.latitude,
            sector:req.body.sector,
            image: url + '/public/' + req.file.filename
            });
            loc.save().then(result => {
                res.status(201).json({
                message: "location registered successfully!",
                addedLocation: {
                _id: result._id,
                image: result.image
                }
                })
                }).catch(err => {
                console.log(err),
                res.status(500).json({
                error: err
                });
                })
        }
        res.status(401).end();
    });

    app.put('/v1/locations/:id',  upload.single('image'),async (req, res) => {
        if(req.user && req.user.data && req.user.data.role==="admin") {
            const location = await LocationModel.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
             
                    if(!location) {
                        res.status(500).end();
                    } else {
                        res.send(comment);
                    }
                
        
        } else {
            res.status(401).end();
        }
        
    });

    app.delete('/v1/locations/:id', (req, res) => {
        //req.user && req.user.data && req.user.data.role === 'admin'
        if(req.user && req.user.data  && req.user.data.role === 'admin') {
            
            LocationModel.findByIdAndDelete(req.params.id, 
                (error) => {
                    if(error) {
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
        }
        else {
            res.status(401).end();
        }
        
    });

}
