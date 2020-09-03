import { Context, Next } from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

const api = new Router();

// Image Upload
api.post('/uploads', async (ctx: Context, next: Next) => {
  if ('POST' != ctx.method) return await next();

  let uploadPath = '';

  if (ctx.request.files) {
    const file = ctx.request.files.upload;

    console.log(file);

    const reader = fs.createReadStream(file.path);
    const originalFilename = file.name;
    const newFilename = `${moment().format(
      'YYMMDD_HHmmdd'
    )}_${originalFilename}`;

    uploadPath = path.join(__dirname, './../uploads');

    !fs.existsSync(uploadPath) && fs.mkdirSync(uploadPath);

    const stream = fs.createWriteStream(path.join(uploadPath, newFilename));

    reader.pipe(stream);

    console.log(`Image ${stream.path}`);
    console.log(`UploadPath: ${uploadPath}`);
    console.log(`StreamPath: ${stream.path}`);

    ctx.body = {
      uploaded: true,
      url: `http://211.248.186.144:4000/${newFilename}`,
    };
  }
});

export default api;
