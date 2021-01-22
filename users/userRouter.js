const express = require('express');
const userDb = require('./userDb');
const router = express.Router();

router.post('/', async (req, res, next ) => {
  // do your magic!
  try{
    const postUser = await userDb.insert(req.body);
    if (postUser) {
      res.status(201).json({data: postUser});
    }else{
      
    } 
  }catch (err){
    res.status(400).json({err: `Could not add new user. Name could already be taken.`})
  }
});

router.post('/:id/posts', async (req, res) => {
  // do your magic!
 await userDb.insert(req.body)
 .then( res =>{res.status(200).json({data:req.body}) })
 .catch(rej =>{res.status(400).json({err: `could not add new post.`})})
});

router.get('/', async(req, res) => {
  // do your magic!
  const users = await userDb.get()
  .then( users =>{
    res.status(200).json({users: users})
  }).catch(err=>{
    res.status(500).json({err: `ERR: ${err}`})
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json({user: req.user})
});

router.get('/:id/posts', validateUserId(), async (req, res) => {
  // do your magic!
  const userPosts = await userDb.getUserPosts(req.user.id)

  res.status(200).json({message: userPosts})

});

router.delete('/:id',validateUserId(), async (req, res, next) => {
  // do your magic!tch(next)
  await userDb.remove(req.user.id)
  .then(resolve=>{
    res.status(200).json({message: `User ${req.user.id} has been deleted`})
  })
  .catch(reject=>{
    res.status(400).json({message: `User ${req.user.id} could not be deleted`})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) =>{
   userDb.getById(req.params.id)
   .then( user =>{
     if(user) {
       req.user = user
       next()
     }else{
       res.status(400).json({message: `User not found!`})
     }
   })
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
