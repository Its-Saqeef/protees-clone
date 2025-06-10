import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export async function generateImageEmbedding(imagePath) {
  const form = new FormData();
  form.append('image', imagePath);

  const res = await axios.post('http://127.0.0.1:5000/embed', form).then((res)=>res);
    console.log(res)
  return res.data.embedding
}
