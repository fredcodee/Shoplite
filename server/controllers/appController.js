
const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}


const login =async(req, res)=>{
    return res.json('login')
}

const loginWithGoogle = async(req,res) =>{
    return res.json('login')
}
module.exports={health, login, loginWithGoogle}