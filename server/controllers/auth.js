import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/user.js";
import { nanoid } from "nanoid";
import validator from "email-validator"

export const welcome = (req, res) => {
  res.json({
    data: "hello from nodejs api from routes yay",
  });
};

export const preRegister = async (req, res) => {
  // create jwt with email and password then email as clickable link
  // only when user click on that email link, registeration completes
  // name@gmail.com

  try {
    // console.log(req.body);
    const { email, password } = req.body;

    //validation
    if (!validator.validate(email)) {
      return res.json({ error: "A valid email is required" })
    }
    else if (!password) {
      return res.json({ error: "Password is required" })
    }
    else if (password && password?.length < 6) {
      return res.json({ error: "Password should be at least 6 characters" })
    }

    const user = await User.findOne({ email })
    if (user) {
      return res.json({ error: "Email is taken" })
    }


    const token = jwt.sign({ email, password }, config.JWT_SECRET, {
      expiresIn: "1d",
    });

    config.AWSSES.sendEmail(
      emailTemplate(
        email,
        `
      <p>Please click the link below to activate your account.</p>
      <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate my account</a>
      `,
        config.REPLY_TO,
        "Activate your acount"
      ),
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ ok: false });
        } else {
          console.log(data);
          return res.json({ ok: true });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.json({ error: `Something went wrong. Try again. Error: ${err}`});
  }
};

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: `Something went wrong. Try again. Error: ${err}` });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1 find user by email
    const user = await User.findOne({ email });
    // 2 compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // 3 create jwt tokens
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 4 send the response
    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: `Something went wrong. Try again. Error: ${err}` });
  }
};
