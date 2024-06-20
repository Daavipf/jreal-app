const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET
  );

  // return token
  //lembrar de tirar o token e o id da res antes de mandar para produção
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
    userRole: user.role
  });
};

module.exports = createUserToken;
