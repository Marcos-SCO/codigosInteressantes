const router = require('express').Router();

const { check, validationResult } =
  require('express-validator');

const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const { users } = require('../db');

const envTokenSecret = 'secretIsARandomString';


function verifyIfThereAreErrors(req, res) {
  const errors = validationResult(req);
  const isThereErrors = !errors.isEmpty();

  if (!isThereErrors) return;

  res.status(400).json({
    errors: errors.array()
  });
}

function verifyIfUserExists(email) {
  // Validate if user already exists
  let user = users.find((user) => {
    return user.email === email
  });

  return user;
}

async function hashPassword(password) {
  let hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

async function verifyMatchPassword(password, userPassword) {
  const isPasswordMatch = await bcrypt.compare(password, userPassword);

  return isPasswordMatch;
}

function saveUserInDb(user) {
  users.push(user);
}


router.post('/signup', [
  check('email', 'Please input a valid email').isEmail(),
  check('password', 'Please input a password with a min length of 6').isLength({ min: 6 })

], async (req, res) => {
  const { password, email } = req.body;

  verifyIfThereAreErrors(req, res);

  const userExists = verifyIfUserExists(email);

  if (userExists) {
    return res.status(400).json({
      errors: {
        "msg": `${email} | this user already exists`
      }
    });
  }

  const hashedPassword = await hashPassword(password);

  // notice: Using email to jwt is not recommended
  const token = await JWT.sign({ email }, envTokenSecret, { expiresIn: 3600000 });

  saveUserInDb({ email, password: hashedPassword });

  res.json(token);

  // res.send(`Email: ${email} | Password: ${hashedPassword}`);

});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = verifyIfUserExists(email);

  if (!user) {
    res.status(422).json({ errors: [{ msg: "Invalid Credentials", }] });

    return;
  }

  const passwordMatch = await
    verifyMatchPassword(password, user.password);

  if (!passwordMatch) {
    return res.status(404).json({ errors: [{ msg: "Passwords didn't match..." }] });
  }

  // Send JSON WEB TOKEN
  const token = await JWT.sign({ email }, envTokenSecret, { expiresIn: 360000 })

  res.json({ "message": `User signup successfully`, token });

});


router.get('/', (req, res) => {
  res.send('Auth route working!!!');
});

router.get('/all', (req, res) => {
  res.json(users);
});


module.exports = router;