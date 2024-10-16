import axios from "axios";

type Data = {
  name: string;
  count: 0 | 1 | 2;
};

export async function sendForm(data: Data) {
  const response = await axios.post("https://arnur-zhanerke.kz/api/toi_add", data);
  return response.data;
}
