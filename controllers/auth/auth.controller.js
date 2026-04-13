const jwt=require('jsonwebtoken');
const user=require('../../modules/database.connection');
const {randomid}=require('../../Assets/javascript/function')
const login = async (data,res)=>{
  try{
    const {email,password} = data;
    const resp = await user.query(
      'select * from users where user_email=$1 and user_password=$2',
      [email,password]
    );
    if(resp.rows.length > 0){
      console.log("========",resp?.rows[0]);
      
      const row_id=resp?.rows[0]?.row_id;
      console.log("========",row_id);
      const token = jwt.sign(
        {row_id},
        process.env.SECRET_KEY,
        {expiresIn:'10d'}
      );
      res.status(200).send({
        msg:'Login Successful',
        token:token,
        status:1
      });
    }
    else{
      res.status(401).send({
        msg:'Invalid Email/Password',
        status:0
      });
    }
  }
  catch(err){
    console.log("error at login",err);
    res.status(500).send({
      msg:'Something went wrong',
      status:0
    });
  }
}
const register = async (data,res)=>{
  try{
    const {name,email,password} = data;
    const checkUser = await user.query(
      'select * from users where user_email=$1',
      [email]
    );
    if(checkUser.rows.length > 0){
      return res.status(400).send({
        msg:'Email already exists',
        status:1
      });
    }
    const row_id=randomid();
    await user.query(
      'insert into users (row_id,user_name,user_email,user_password) values ($1,$2,$3,$4)',
      [row_id,name,email,password]
    );
    res.status(200).send({
      msg:'User registered successfully',
      status:0
    });
  }
  catch(err){
    console.log("error at register",err);
    res.status(500).send({
      msg:'Something went wrong',
      status:2
    });
  }
}
const common={
    lo_us:login,
    re_us:register
}
module.exports={
    common
}