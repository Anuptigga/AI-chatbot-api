export const requireAdmin= (req,res,next)=>{
    if(!req.currentUser || !req.currentUser.isAdmin){
        return res.status(403).json({message:"Admin access requrired"})
    }
    next();
} 