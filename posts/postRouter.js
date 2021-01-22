const express = require('express');
const postDb = require('./postDb');

const router = express.Router();



router.get('/', async (req, res) => {
  // do your magic!
  const posts =  await postDb.get()
  if (posts) {
    res.status(200).json( {data: posts} );
  }
  
});

router.get('/:id', validatePostId(), async (req, res) => {
  // do your magic!
  res.status(200).json({ data: req.post })
});

router.delete('/:id', validatePostId(),   async(req, res) => {
  // do your magic!

await postDb.remove(req.post.id)
  
res.status(200).json({
    url: `/${req.post.id}`,
    operation: `DELETE post with id ${req.post.id}`
  })
});

router.put('/:id', validatePostId(), (req, res, next) => {
  // do your magic!
const text = req.body
const post = req.post.id

if( text && post) {
  postDb.update(post, text)
  .then( updated =>{
  res.status(200).json({text: updated})

  }).catch(next)  
}else{
  res.status(400).json({err: `ERR: Something went wrong.`});
}

});

// custom middleware

function validatePostId() {
  // do your magic!
return (req, res, next)=>{
  postDb.getById(req.params.id)
  .then( post =>{
    if(post) {
      req.post = post
      next();
    }else{
      res.status(400).json({message: `$ERR: ${req.params.id} post id was not found`})
    }
  })
  .catch(next)
}

}

module.exports = router;
