import svgCaptcha from 'svg-captcha';
import { setValue } from '@/config/RedisConfig';

class PublicController {
  constructor () {}

  async getCaptcha (ctx) {
    const params = ctx.request.query

    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38
    });

    setValue(params.sid, newCaptcha.text, 10 * 60);
    // getValue(params.sid).then((res) => {
    //   console.log(res);
    // });
    ctx.body = {
      code: 200,
      data: newCaptcha.data,
      testcode: newCaptcha.text
    }
  }
}

export default new PublicController();
