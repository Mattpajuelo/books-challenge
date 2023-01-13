module.exports=(req,res,next)=>{
    if (req.session.sessionuser) {
        if (req.session.sessionuser.rol=== 1 ) {
            next() 
             
         }else{return res.redirect('/')}
    } else{
        return res.redirect ('/users/login')
    }
   
        
    
}