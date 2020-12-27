import send from '../config/MailConfig';
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/index';
import { checkCode } from '../common/Utils';
import User from '@/model/User';

class LoginController {
  async forget (ctx) {
    const { body } = ctx.request;
    try {
      const result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'YongHew'
      });

      ctx.body = {
        code: 200,
        data: result,
        msg: '郵件發送成功'
      };
    } catch (err) {
      console.error(err);
    }
  }

  async login (ctx) {
    const { body } = ctx.request;
    const sid = body.sid;
    const verifyCode = body.verifyCode;
    const checkCodeResult = await checkCode(sid, verifyCode);

    if (checkCodeResult) {
      let checkUserPassword = false;
      // 驗證帳號密碼是否正確
      const user = await User.findOne({ username: body.username });
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        checkUserPassword = true;
      }

      if (checkUserPassword) {
        const token = jsonwebtoken.sign(
          // exp: Math.floor(Date.now() / 100) + 60 * 60 * 24
          { _id: 'yonghew' },
          config.JWT_SECRET,
          { expiresIn: '1d' }
        );

        ctx.body = {
          code: 200,
          token
        };
      } else {
        ctx.body = {
          code: 404,
          msg: '用戶名或密碼錯誤'
        };
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '验证码错误，請檢查！'
      };
    }
  }

  async register (ctx) {
    // 接收 user 數據
    const { body } = ctx.request;
    // valid 驗證碼
    const sid = body.sid;
    const verifyCode = body.verifyCode;
    const msg = {};
    const checkCodeResult = await checkCode(sid, verifyCode);
    let check = true;

    if (checkCodeResult) {
      // 查 db，查看 username 是否已註冊
      const userEmail = await User.findOne({ username: body.username });
      console.log(userEmail);

      if (userEmail) {
        msg.username = ['使用者郵箱已被註冊！，可以通過郵箱找回密碼'];
        check = false;
      }
      // 查 db，查看 name 是否已註冊
      const userNickname = await User.findOne({ name: body.name });
      if (userNickname) {
        msg.name = ['使用者昵称已被註冊！，請修改'];
        check = false;
      }
      // 寫入數據到 db
      if (check) {
        body.password = await bcrypt.hash(body.password, 5);
        const { username, name, password } = body;
        const user = new User({
          username,
          name,
          password,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        });

        const result = await user.save();
        ctx.body = {
          code: 200,
          data: result,
          msg: '註冊成功'
        };

        return;
      } else {
        ctx.body = {
          code: 404,
          msg: '不多說，失敗'
        };
      }
    } else {
      // 提供給 veelidate
      msg.code = ['驗證碼已失效，請重新獲取！'];
    }

    ctx.body = {
      code: 500,
      msg
    };
  }
}

export default new LoginController();
